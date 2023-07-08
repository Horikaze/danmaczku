"use client";
import { useState } from "react";
import { initDb, initStorage } from "@/firebase/clientApp";
import {
  Timestamp,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { PrivateUserImageLink, RpyReq } from "@/app/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateAll } from "@/app/utils/updateRankings";
import toast from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";
import ReqItem from "./components/ReqItem";
import Modal from "@/app/utils/components/Modal";
const db = initDb();

const checkReq = async () => {
  const replays: RpyReq[] = [];
  const col = collection(db, "rpyReq");
  const q = query(col, orderBy("reqDate"));
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    replays.push(element.data() as RpyReq);
  });

  return replays;
};

type RequestsButtonProps = {
  user: PrivateUserImageLink;
};

export default function RequestsButton({ user }: RequestsButtonProps) {
  const { data, refetch } = useQuery<RpyReq[]>({
    queryFn: checkReq,
    queryKey: ["req"],
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
  const storage = initStorage();
  const toastID = "123";
  const reqAction = async (rpyReq: RpyReq, action: boolean) => {
    try {
      if (action === true) {
        toast.loading("Wysyłanie...", { id: toastID });
        await setDoc(doc(db, "replay", rpyReq.checksum), {
          character:
            rpyReq.game === 9
              ? rpyReq.character[0].split(" ")[0]
              : rpyReq.character,
          rank: rpyReq.rank,
          shottype: rpyReq.shottype,
          stage: rpyReq.stage,
          player: rpyReq.player,
          slow_rate: rpyReq.slow_rate,
          game: rpyReq.game,
          stage_score: rpyReq.stage_score,
          frame_count: rpyReq.frame_count,
          date: rpyReq.date,
          date_on_file: rpyReq.date_on_file,
          z_keys: rpyReq.z_keys,
          x_keys: rpyReq.x_keys,
          c_keys: rpyReq.c_keys,
          shift: rpyReq.shift,
          checksum: rpyReq.checksum,
          rpy_name: rpyReq.rpy_name,
          nnn: rpyReq.nnn,
          comment: rpyReq.comment,
          cc: rpyReq.cc,
          uid: rpyReq.uid,
          userNickname: rpyReq.userNickname,
          filePath: `/users/${rpyReq?.uid}/rpyReq/${rpyReq.checksum}/${rpyReq.rpy_name}`,
          addDate: Timestamp.now(),
          points: rpyReq.points,
          acceptedBy: user.publicUser.displayName,
        });
        await deleteDoc(doc(db, "rpyReq", `${rpyReq.checksum}`));
        await updateAll(rpyReq);
        toast.success("Przyjęto replay", { id: toastID });
      } else if (action === false) {
        await deleteDoc(doc(db, "rpyReq", `${rpyReq.checksum}`));
        const deleteRpyRef = ref(storage, rpyReq.filePath);
        deleteObject(deleteRpyRef);
        toast.success("Odrzucono replay", { id: toastID });
      }
      refetch();
    } catch (e) {
      toast.error(`${e}`);
    }
  };
  const [requests, setRequests] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setRequests(!requests);
        }}
        className="bg-orange-400 text-white text-sm hover:bg-orange-500 drop-shadow-sm rounded-sm px-2 py-1"
      >
        Do zatwierdzenia ({data?.length})
      </button>
      {requests && (
        <Modal title="Oczekujące" setMyRequests={setRequests}>
          <div className="flex flex-col my-2 h-80 gap-2 overflow-y-scroll pr-2">
            {data!.map((rpy) => {
              return (
                <ReqItem reqAcc={reqAction} rpyReq={rpy} key={rpy.checksum} />
              );
            })}
          </div>
        </Modal>
      )}
    </>
  );
}
