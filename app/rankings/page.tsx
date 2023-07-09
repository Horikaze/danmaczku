import Ranking from "./components/Ranking/Ranking";
import RankingTotalCC from "./components/Ranking/RankingTotalCC";
export default async function Rankings() {
  return (
    <div className="flex mt-5 flex-col place-items-center 2xl:grid 2xl:grid-cols-2 gap-5 justify-center drop-shadow-md">
      <RankingTotalCC />
      <Ranking
        dbTarget={"rankingPoints"}
        rankType="Ranking Punktowy"
        toShow="totalPoints"
      />
      <Ranking
        dbTarget={"rankingScore"}
        rankType="Ranking Score"
        toShow="totalScore"
      />
    </div>
  );
}
