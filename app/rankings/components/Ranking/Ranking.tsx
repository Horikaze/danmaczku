import { PrivateUserImageLink, UserPointRanking } from "@/app/types/types";
import RankItem from "../RankItem";
import { getUserWithImage } from "@/app/utils/publicUser";
import CardWithName from "@/app/utils/components/CardWithName";
type RankingProps = {
  rankType: string;
  dbTarget: string;
  toShow: string;
};
export default async function Ranking({
  dbTarget,
  rankType,
  toShow,
}: RankingProps) {
  let bodyContent = JSON.stringify({
    dbTarget: dbTarget,
  });

  const getRankingPoints = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_RANKAPI as string, {
      method: "POST",
      body: bodyContent,
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data as PrivateUserImageLink[];
  };
  const data = await getRankingPoints();
  return (
    <CardWithName nameToDisplay={rankType}>
      <div className="flex flex-col gap-2 max-h-[38rem] min-h-[38rem] overflow-y-auto pr-2">
        {data!.map((e, index) => {
          return (
            <RankItem
              index={index}
              user={e}
              key={index}
              toShow={toShow}
              unit="pkt."
            />
          );
        })}
      </div>
    </CardWithName>
  );
}
