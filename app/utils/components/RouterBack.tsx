"use client";
import { useRouter } from "next/navigation";
export default function RouterBack() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="bg-orange-400 text-white hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
    >
      Cofnij
    </button>
  );
}
