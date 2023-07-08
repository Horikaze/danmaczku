import Link from "next/link";
import Image from "next/image";
import { PrivateUserImageLink } from "@/app/types/types";
import { timestampToDateString } from "@/app/utils/refactorFunc";
type UserListItemProps = {
  user: PrivateUserImageLink;
  index: number;
};
export default async function UserListItem({ user, index }: UserListItemProps) {
  return (
    <Link href={`/user/${user.publicUser.uid}`}>
      <div className="bg-content hover:brightness-125 cursor-pointer transition-all duration-300 flex flex-row text-text justify-between rounded-sm p-3 text-sm">
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
            {user.publicUser.displayName}
            <span className="text-yellow-200"> 
            {user.publicUser.admin && " ⚙"}
            </span>
          </strong>
        </div>
      </div>
    </Link>
  );
}
