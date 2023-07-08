import { Metadata } from "next";
import Profile from "./components/Profile";
import TableSSR from "./components/TableSSR";
import ReplaysSSR from "./components/ReplaysSSR";
import { getUserWithImage } from "@/app/utils/publicUser";

type UserInfoParams = {
  params: { uid: string };
};
export async function generateMetadata({
  params,
}: UserInfoParams): Promise<Metadata> {
  const user = await getUserWithImage(params.uid);
  return {
    title: `${user.publicUser.displayName} PR: ${user.publicUser.achievementsRank} SR: ${user.publicUser.scoreRank}`,
  };
}
export default async function Page({ params }: UserInfoParams) {
  const user = await getUserWithImage(params.uid);  
  return (
    <div className="flex mt-5 flex-col place-items-center 2xl:grid 2xl:grid-cols-2 gap-5 justify-center drop-shadow-md">
      <Profile imageLink={user.imageLink} user={user.publicUser} />
      <TableSSR uid={params.uid} />
      <ReplaysSSR
        user={user.publicUser}
        bestToSearch="addDate"
        toShow="Ostatnie wyniki"
      />
      <ReplaysSSR
        user={user.publicUser}
        bestToSearch="points"
        toShow="Najlepsze wyniki punktowe"
      />
      <ReplaysSSR
        user={user.publicUser}
        bestToSearch="stage_score"
        toShow="Najlepsze wyniki score"
      />
    </div>
  );
}
