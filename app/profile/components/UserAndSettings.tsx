import { PrivateUserImageLink } from "@/app/types/types";
import CardWithName from "@/app/utils/components/CardWithName";
import { timestampToDateString } from "@/app/utils/refactorFunc";
import Link from "next/link";
import ProfileImageAndSettings from "./ProfileImageAndSettings";

type UserAndSettingsProps = {
  user: PrivateUserImageLink;
};
export default function UserAndSettings({ user }: UserAndSettingsProps) {
  return (
    <CardWithName nameToDisplay={user.publicUser.displayName}>
      <ProfileImageAndSettings user={user} />
      <div className="text-text flex flex-col gap-1">
        <div className="flex-grow border-t-2 border-gray-400"></div>
        <p>
          <strong>Score: </strong>
          {user.publicUser.scoreRank! > 500
            ? "Poza rankingiem"
            : `${user.publicUser.totalScore} (Rank: ${user.publicUser.scoreRank})`}
        </p>
        <div className="flex-grow border-t-2 border-gray-400"></div>
        <p>
          <strong>Punkty: </strong>
          {user.publicUser.achievementsRank! > 500
            ? "Poza rankingiem"
            : `${user.publicUser.totalPoints} (Rank: ${user.publicUser.achievementsRank})`}
        </p>
        <div className="flex-grow border-t-2 border-gray-400"></div>
        <p>
          <strong>1CC: </strong>{" "}
          {user.publicUser.CC! >= 1 ? user.publicUser.CC : "Brak"}
        </p>
        <div className="flex-grow border-t-2 border-gray-400"></div>
        <p>
          <strong>Ulubiona gra: </strong>{" "}
          {user.publicUser.favoriteGame! !== "-"
            ? user.publicUser.favoriteGame
            : "Brak"}
        </p>
        <div className="flex-grow border-t-2 border-gray-400"></div>
        <p>
          <strong>Data dołączenia: </strong>
          {timestampToDateString(user.publicUser.joindate)}
        </p>
        <div className="flex-grow border-t-2 border-gray-400"></div>
        <p>
          <strong>Discord: </strong>
          {user.publicUser.discord!?.length > 3
            ? `${user.publicUser.discord}`
            : "Nie podano"}
        </p>
        <div className="flex-grow border-t-2 border-gray-400"></div>
        {user.publicUser.twitter!?.length > 3 ? (
          <div>
            <Link href={user.publicUser.twitter!} target="_blank">
              <strong>Twitter: </strong> Click!
            </Link>
          </div>
        ) : (
          <p>
            <strong>Twitter: </strong> Nie podano
          </p>
        )}
        <div className="flex-grow border-t-2 border-gray-400"></div>
        {user.publicUser.youtube!?.length > 3 ? (
          <div>
            <Link href={user.publicUser.youtube!} target="_blank">
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
    </CardWithName>
  );
}
