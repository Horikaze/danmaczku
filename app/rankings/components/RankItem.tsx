import Link from "next/link";
import Image from "next/image";
import { PrivateUserImageLink } from "@/app/types/types";
type RankItemProps = {
  user: PrivateUserImageLink;
  toShow: string;
  index: number;
  unit: string;
};
export default async function RankItem({
  user,
  index,
  toShow,
  unit,
}: RankItemProps) {
  return (
    <Link href={`/user/${user.publicUser.uid}`} prefetch={false}>
      <div
        className={`bg-content hover:brightness-125 cursor-pointer transition-all duration-300 flex flex-row ${
          index === 0
            ? "text-yellow-500"
            : index === 1
            ? "text-white"
            : index === 2
            ? "text-stone-800"
            : "text-text"
        } justify-between rounded-sm p-3 text-sm`}
      >
        <div className="flex-row flex items-center">
          <div className="w-5">
            <h1>
              <strong>{index + 1 + "."}</strong>
            </h1>
          </div>
          <div className="mx-2 h-10 w-10 relative">
            <Image
              src={user.imageLink}
              alt="pfp"
              className="rounded-sm"
              style={{ objectFit: "cover" }}
              sizes="100vw"
              fill
              priority
            />
          </div>
          <strong>
            {user.publicUser.displayName}{" "}
            <span className="text-yellow-200">
              {user.publicUser.admin && "⚙"}
            </span>
          </strong>
        </div>
        <div className="flex flex-row text-text justify-center items-center">
          <h1>
            <strong>
              {user.publicUser[toShow]} {unit}
            </strong>
          </h1>
        </div>
      </div>
    </Link>
  );
}
