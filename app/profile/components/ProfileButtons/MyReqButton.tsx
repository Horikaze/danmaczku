"use client";

import { useState } from "react";
import { initDb, initStorage } from "@/firebase/clientApp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { PrivateUserImageLink, RpyReq } from "@/app/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MyReqItem from "./components/MyReqItem";
import Modal from "@/app/utils/components/Modal";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";
interface myReqProps {
  user: PrivateUserImageLink;
}

export default function MyReqButton({ user }: myReqProps) {
  const queryClient = useQueryClient();
  const storage = initStorage();
  const db = initDb();
  const myReq = async () => {
    const replays: RpyReq[] = [];
    const col = collection(db, "rpyReq");
    const q = query(col, where("uid", "==", `${user.publicUser.uid}`));
    const snapshot = await getDocs(q);
    const snapData = snapshot.docs;
    snapData.forEach((element) => {
      replays.push(element.data() as RpyReq);
    });
    return replays;
  };
  const cancelReq = async (rpyReq: RpyReq) => {
    await deleteDoc(doc(db, "rpyReq", `${rpyReq.checksum}`));
    const deleteRpyRef = ref(storage, rpyReq.filePath);
    deleteObject(deleteRpyRef);
    toast.success("Anulowano wysyłnie replay'u");
    queryClient.invalidateQueries(["myReq"]);
  };
  const [myRequests, setMyRequests] = useState(false);
  const { data } = useQuery<RpyReq[]>({
    queryFn: myReq,
    queryKey: ["myReq"],
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
  return (
    <>
      <button
        onClick={() => {
          setMyRequests(!myRequests);
        }}
        className="bg-orange-400 text-white text-sm hover:bg-orange-500 drop-shadow-sm rounded-sm px-2 py-1"
      >
        Wysłane rpy ({data?.length})
      </button>
      {myRequests && (
        <Modal title="Wysłane" setMyRequests={setMyRequests}>
          <div className="flex flex-col my-2 h-[20rem] gap-2 overflow-y-scroll pr-2">
            {data!.map((rpy) => {
              return (
                <MyReqItem
                  cancelReq={cancelReq}
                  rpyReq={rpy}
                  key={rpy.checksum}
                />
              );
            })}
          </div>
        </Modal>
      )}
    </>
  );
}
