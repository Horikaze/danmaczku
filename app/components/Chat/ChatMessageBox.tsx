import {
  CollectionReference,
  Timestamp,
  collection,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { initDb } from "@/firebase/clientApp";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from "react";
import { PrivateUserImageLink } from "@/app/types/types";
const db = initDb();
export type ChatMessage = {
  text: string;
  uid: string;
  createdAt: Timestamp;
  nickname: string;
  image: string;
};

type ChatMessageBoxProps = {
  user: PrivateUserImageLink;
};
export default function ChatMessageBox({ user }: ChatMessageBoxProps) {
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    orderBy("createdAt", "desc"),
    limit(30)
  ) as CollectionReference<ChatMessage>;
  const [messages] = useCollectionData(q);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reversedMessages = messages ? [...messages].reverse() : [];
  const dummy = useRef<HTMLDivElement>(null);
  useEffect(() => {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  }, [reversedMessages]);
  return (
    <div className="flex flex-col gap-2 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      {reversedMessages &&
        reversedMessages.map((e) => {
          return (
            <ChatMessage
              myMes={user.publicUser.uid == e.uid ? true : false}
              message={e}
              key={e.uid + e.createdAt}
            />
          );
        })}
      <div ref={dummy}></div>
    </div>
  );
}
