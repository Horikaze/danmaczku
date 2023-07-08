"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
export default function Nav() {
  const url = usePathname();

  return (
    <>
      <nav className="py-1 md:py-3 sticky top-0 z-10 flex text-sm md:text-base flex-row justify-evenly bg-navbar text-center items-center text-text rounded-sm">
        <Link
          href={"/"}
          className={`px-5 py-2 border-b-2 transition-colors duration-300 hover:border-orange-400 ${
            url === "/" ? "border-orange-400" : "border-transparent"
          }`}
        >
          Home
        </Link>
        <Link
          href={"/rankings"}
          className={`px-5 py-2 border-b-2 transition-colors duration-300 hover:border-orange-400 ${
            url === "/rankings" ? "border-orange-400" : "border-transparent"
          }`}
        >
          Rankingi
        </Link>
        <p
          onClick={() => {
            toast.error("Jeszcze nie zaimplementowano", { duration: 1500 });
          }}
          // href={"/search"}
          className={`px-5 py-2 border-b-2 transition-colors duration-300 hover:border-orange-400 cursor-pointer ${
            url === "/search" ? "border-orange-400" : "border-transparent"
          }`}
        >
          Szukaj
        </p>
        <p
          onClick={() => {
            toast.error("Jeszcze nie zaimplementowano", { duration: 1500 });
          }}
          // href={"/search"}
          className={`px-5 py-2 border-b-2 transition-colors duration-300 hover:border-orange-400 cursor-pointer ${
            url === "/info" ? "border-orange-400" : "border-transparent"
          }`}
        >
          Info
        </p>

        <Link
          href={"profile"}
          className={`px-5 py-2 border-b-2 transition-colors duration-300 hover:border-orange-400 ${
            url === "/profile" ? "border-orange-400" : "border-transparent"
          }`}
        >
          Profil
        </Link>
      </nav>
    </>
  );
}
