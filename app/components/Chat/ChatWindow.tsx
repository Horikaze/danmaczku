"use client";
import { initAuth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Logged from "./Logged";

export default function ChatWindow() {
  const auth = initAuth();
  const [user, loading] = useAuthState(auth);
  return (
    <div
      className="flex flex-col 2xl:w-1/2 w-5/6 rounded-sm px-5 py-3 gap-3 bg-gray-200 text-black border border-gray-300
            drop-shadow-md h-80"
    >
      <div className="text-center bg-gray-300 py-1 rounded-md border border-gray-400">
        <h1>Czat</h1>
      </div>
      {loading && <h1 className="text-center">Ładownie danych o profilu</h1>}
      {user && <Logged useruid={user.uid} />}
      {!user && <h1 className="text-center">Najpierw się zaloguj</h1>}
    </div>
  );
}
