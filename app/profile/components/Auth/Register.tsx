import CardWithoutName from "@/app/utils/components/CardWithoutName";
import { initAuth, initDb } from "@/firebase/clientApp";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FormEvent } from "react";
import { toast } from "react-hot-toast";
const auth = initAuth();
const db = initDb();
export default function Register() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const nickname = formData.get("nickname") as string;
      const password = formData.get("password") as string;
      if (nickname == "" || password == "") {
        throw new Error("Wpisz dane baka!");
      }
      if (
        nickname.length < 2 ||
        password.length < 5 ||
        nickname.length > 20 ||
        password.length > 20
      ) {
        throw new Error("Hasło < 6, Nickname < 2, Max 20 znków");
      }
      const result = await createUserWithEmailAndPassword(
        auth,
        nickname.replace(/\s/g, "_") + "@danmaczku.pl",
        password
      );
      await updateProfile(auth.currentUser!, {
        displayName: nickname,
      });
      await setDoc(doc(db, "users", result.user.uid), {
        displayName: nickname,
        uid: result.user.uid,
        scoreRank: 999,
        achievementsRank: 999,
        CC: 0,
        admin: false,
        supporter: false,
        joindate: Date.now(),
        discord: "-",
        youtube: "-",
        twitter: "-",
        bio: "-",
        favoriteGame: "-",
        totalPoints: 0,
        totalScore: 0,
      });
      toast.success("Stworzono konto");
    } catch (e) {
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
          className="p-2 rounded-sm focus:outline-none  w-4/5 bg-content text-sm outline-gray-400"
        />
        <button
          type="submit"
          className="bg-orange-400 text-white hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
        >
          Zarejestruj
        </button>
      </form>
    </CardWithoutName>
  );
}
