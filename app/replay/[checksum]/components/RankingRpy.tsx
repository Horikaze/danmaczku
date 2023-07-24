import RecentItem from "@/app/components/Recent/RecentItem";
import { RpyReq } from "@/app/types/types";
import CardWithName from "@/app/utils/components/CardWithName";

type RankingRpyProps = {
  rpy: RpyReq;
};
export default async function RankingRpy({ rpy }: RankingRpyProps) {
  let bodyContent = JSON.stringify({
    game: rpy.game,
    rank: rpy.rank,
  });

  let response = await fetch(process.env.NEXT_PUBLIC_RANKRPY as string, {
    method: "POST",
    body: bodyContent,
  });
  const data: RpyReq[] = await response.json();

  return (
    <CardWithName nameToDisplay={`Ranking TH: ${rpy.game} ${rpy.rank}`}>
      <div className="flex flex-col gap-2 min-h-[525px]">
        {data.length >= 1 ? (
          data.map((rpy) => {
            return <RecentItem rpy={rpy} key={rpy.checksum} />;
          })
        ) : (
          <div className="text-text text-center text-3xl opacity-25">
            <p>BRAK WYNIKÓW</p>
          </div>
        )}
      </div>
    </CardWithName>
  );
}
