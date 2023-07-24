import { RpyReq } from "@/app/types/types";
import { initDb, initStorage } from "@/firebase/clientApp";
import { useQueryClient } from "@tanstack/react-query";
import { Timestamp, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import Link from "next/link";
import { toast } from "react-hot-toast";

type ReqItemProps = {
  rpyReq: RpyReq;
  cancelReq: (rpy: RpyReq) => void;
};
const storage = initStorage();
const db = initDb();
export default function MyReqItem({ rpyReq, cancelReq }: ReqItemProps) {
  const download = async () => {
    const storageRef = ref(storage, `${rpyReq.filePath}`);
    const rpyLink = await getDownloadURL(storageRef);
    window.location.href = rpyLink;
  };
  return (
    <div className="bg-content text-sm md:text-base text-text rounded-lg px-5 py-1 grid grid-cols-2">
      <div className="flex flex-col">
        <h1 className="text-center font-bold">{rpyReq.rpy_name}</h1>
        <p>
          <strong>Nickname on rpy: </strong>
          {rpyReq.player}
        </p>
        <p>
          <strong>Touhou: </strong> {rpyReq.game}
        </p>
        <p>
          <strong>Rank: </strong>
          {rpyReq.rank}
        </p>
        <p>
          <strong>Character: </strong>
          {rpyReq.character}
        </p>
        <p>
          <strong>Shottype: </strong>
          {rpyReq.shottype}
        </p>
        <p>
          <strong>Stage: </strong>
          {rpyReq.stage}
        </p>
        <p>
          <strong>Score: </strong>
          {rpyReq.stage_score}
        </p>
        <p>
          <strong>Replay date: </strong>
          {rpyReq.date_on_file}
        </p>
        <p>
          <strong>NNN: </strong>
          {rpyReq.nnn && rpyReq.nnn.join(", ")}
        </p>
        <p>
          <strong>1CC: </strong>
          {rpyReq.cc ? "Yes" : "No"}
        </p>
        <p>
          <strong>Rank points: </strong>
          {rpyReq.points}
        </p>
        <p>
          <strong>Score points: </strong>
          {rpyReq.scorePoints}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h1 className="text-center font-bold"></h1>
          <Link
            className="underline"
            href={`/user/${rpyReq.uid}`}
            target="_blank"
          >
            <strong>Sended by: </strong>
            {rpyReq.userNickname}
            <p className="break-words">
              <strong>UserID: </strong>
              {rpyReq.uid}
            </p>
          </Link>
          <p>
            <strong>Comment: </strong>
            {rpyReq.comment}
          </p>
        </div>
        <div className="flex flex-row text-white justify-evenly mb-2">
          <button
            onClick={() => {
              cancelReq(rpyReq);
            }}
            className="bg-red-400 hover:bg-red-500 px-3 rounded-sm py-1"
          >
            Anuluj X
          </button>
          <button
            onClick={() => {
              download();
            }}
            className="bg-gray-400 hover:bg-gray-500 px-3 rounded-sm py-1"
          >
            Pobierz
          </button>
        </div>
      </div>
    </div>
  );
}
