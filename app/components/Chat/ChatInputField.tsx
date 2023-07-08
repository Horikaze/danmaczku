"use client";

import { PrivateUserImageLink } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
const db = initDb();
type ChatInputFieldProps = {
  user: PrivateUserImageLink;
};
export default function ChatInputField({ user }: ChatInputFieldProps) {
  const [message, setMessage] = useState("");
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.length < 1) {
      return toast.error("Za krótka wadomość");
    }
    await addDoc(collection(db, "messages"), {
      text: message,
      uid: user.publicUser.uid,
      createdAt: Timestamp.now(),
      nickname: user.publicUser.displayName,
      image: user.imageLink,
    });
    setMessage("");
  };
  return (
    <form onSubmit={sendMessage} className="flex flex-row gap-1">
      <textarea
        value={message}
        maxLength={300}
        className={`rounded-lg px-2 ${message.length > 290 && "text-red-600"} p-1 w-full focus:outline-none resize-none overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}
        placeholder="Napisz coś"
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="items-center flex justify-center">
        {" "}
        <button
          type="submit"
          className="text-xs bg-gray-300 hover:bg-gray-400 px-2 h-full transition-colors rounded-lg"
        >
          Wyślij
        </button>
      </div>
    </form>
  );
}
