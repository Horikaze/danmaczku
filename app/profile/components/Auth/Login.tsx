"use client";
import CardWithoutName from "@/app/utils/components/CardWithoutName";
import { initAuth } from "@/firebase/clientApp";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormEvent } from "react";
import { toast } from "react-hot-toast";
export default function Login() {
  const auth = initAuth();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const nickname = formData.get("nickname") as string;
      const password = formData.get("password") as string;
      signInWithEmailAndPassword(
        auth,
        nickname.replace(/\s/g, "_") + "@danmaczku.pl",
        password
      ).catch(function (e) {
        switch (e.code) {
          case "auth/invalid-email":
            toast.error(e.code);
            break;
          case "auth/wrong-password":
            toast.error(e.code);
            break;
          case "auth/user-not-found":
            toast.error(e.code);
            break;
          case "auth/missing-password":
            toast.error(e.code);
            break;
          case "auth/user-disabled":
            toast.error(e.code);
            break;
        }
      });
    } catch (e: any) {
      toast.error(`${e}`);
    }
  };
  return (
    <CardWithoutName>
        
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 justify-center text-text items-center py-4 px-10"
        >
        <input
          type="text"
          name="nickname"
          placeholder="Nickname"
          className="p-2 rounded-sm focus:outline-none  w-4/5 bg-content text-sm outline-gray-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          className="p-2 rounded-sm focus:outline-none 2xl:mb-11  w-4/5 bg-content text-sm outline-gray-400"
        />
        <div className="grid grid-cols-3 w-full">
          <div className="col-start-2 flex justify-center">
            <button
              type="submit"
              className="bg-orange-400 text-white hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
            >
              Zaloguj
            </button>
          </div>
          {/* <div className="flex justify-end items-end">
            <p
              className="text-xs cursor-pointer text-text col-start-3 text-end mr-2"
              onClick={() => {
                toast.success(
                  "Stwórz nowe konto i napisz do horikaze(discord), aby przeniósł stare dane do nowego konta :>",
                  { duration: 5000 }
                );
              }}
            >
              Oddaj hasło pls!
            </p>
          </div> */}
        </div>
      </form>
    </CardWithoutName>
  );
}
