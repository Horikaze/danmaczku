import { UserPointRanking } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import RankItem from "../RankItem";
import { getUserWithImage } from "@/app/utils/publicUser";
import CardWithName from "@/app/utils/components/CardWithName";
const db = initDb();
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
  const getRankingPoints = async () => {
    const ranking: UserPointRanking[] = [];
    const col = collection(db, dbTarget);
    const q = query(col, orderBy("total", "desc"), limit(20));
    const snapshot = await getDocs(q);
    const snapData = snapshot.docs;
    snapData.forEach((element) => {
      ranking.push(element.data() as UserPointRanking);
    });
    return ranking;
  };
  const data = await getRankingPoints();

  return (
    <CardWithName nameToDisplay={rankType}>
      <div className="flex flex-col gap-2 max-h-[38rem] overflow-y-auto pr-2">
        {data.map(async (e, index) => {
          const user = await getUserWithImage(e.uid);
          return (
            <RankItem index={index} user={user} key={index} toShow={toShow} unit="pkt." />
          );
        })}
      </div>
    </CardWithName>
  );
}
