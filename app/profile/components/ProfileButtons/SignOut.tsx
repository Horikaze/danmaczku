import { initAuth } from "@/firebase/clientApp";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
const auth = initAuth();
export default function SignOut() {
  const query = useQueryClient();
  return (
    <button
      onClick={() => {
        signOut(auth);
        query.removeQueries([`${auth.currentUser?.uid}`]);
      }}
      className="bg-orange-400 text-white text-sm hover:bg-orange-500 drop-shadow-sm rounded-sm px-2 py-1"
    >
      Wyloguj
    </button>
  );
}
