import { PrivateUser } from "@/app/types/types";
import RouterBack from "@/app/utils/components/RouterBack";
import CardWithName from "@/app/utils/components/CardWithName";
import { timestampToDateString } from "@/app/utils/refactorFunc";
import Image from "next/image";
import Link from "next/link";
type ProfileParams = {
  user: PrivateUser;
  imageLink: string;
};

export default function Profile({ imageLink, user }: ProfileParams) {
  return (
    <CardWithName nameToDisplay={user.displayName}>
      <div className="flex flex-col justify-center 2xl:mb-8">
        <div className="grid grid-cols-3 mb-4 2xl:mb-8">
          <div>
            <RouterBack />
          </div>
          <div className="flex justify-center col-start-2 items-center">
            <div className="h-20 w-20 relative">
              <Image
                className="rounded-sm"
                src={imageLink}
                sizes="100vw"
                alt="pfp"
                fill
                priority
              />
            </div>
          </div>
        </div>
        <div className="text-text flex flex-col gap-1">
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <p>
            <strong>Score: </strong>
            {user.scoreRank! > 500
              ? "Poza rankingiem"
              : `${user.totalScore} (Rank: ${user.scoreRank})`}
          </p>
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <p>
            <strong>Punkty: </strong>
            {user.achievementsRank! > 500
              ? "Poza rankingiem"
              : `${user.totalPoints} (Rank: ${user.achievementsRank})`}
          </p>
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <p>
            <strong>1CC: </strong> {user.CC! >= 1 ? user.CC : "Brak"}
          </p>
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <p>
            <strong>Ulubiona gra: </strong>{" "}
            {user.favoriteGame! !== "-" ? user.favoriteGame : "Brak"}
          </p>
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <p>
            <strong>Data dołączenia: </strong>
            {timestampToDateString(user.joindate!)}
          </p>
          <div className="flex-grow border-t-2 border-gray-400"></div>
          <p>
            <strong>Discord: </strong>
            {user.discord!?.length > 3 ? `${user.discord}` : "Nie podano"}
          </p>
          <div className="flex-grow border-t-2 border-gray-400"></div>
          {user.twitter!?.length > 3 ? (
            <div>
              <Link href={user.twitter!} target="_blank">
                <strong>Twitter: </strong> Click!
              </Link>
            </div>
          ) : (
            <p>
              <strong>Twitter: </strong> Nie podano
            </p>
          )}
          <div className="flex-grow border-t-2 border-gray-400"></div>
          {user.youtube!?.length > 3 ? (
            <div>
              <Link href={user.youtube!} target="_blank">
                <strong>Youtube: </strong>Click!
              </Link>
            </div>
          ) : (
            <p>
              <strong>Youtube: </strong>Nie podano
            </p>
          )}
          <div className="flex-grow border-t-2 border-gray-400"></div>
        </div>
      </div>
    </CardWithName>
  );
}
