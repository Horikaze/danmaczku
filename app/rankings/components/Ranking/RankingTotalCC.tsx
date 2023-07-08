import { PrivateUser } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import RankItem from "../RankItem";
import { getUserWithImage } from "@/app/utils/publicUser";
import CardWithName from "@/app/utils/components/CardWithName";
const db = initDb();
export default async function RankingTotalCC({
}) {
  const getRankingTotalCC = async () => {
    const ranking: PrivateUser[] = [];
    const col = collection(db, "users");
    const q = query(col, orderBy("CC", "desc"), limit(20));
    const snapshot = await getDocs(q);
    const snapData = snapshot.docs;
    snapData.forEach((element) => {
      ranking.push(element.data() as PrivateUser);
    });
    return ranking;
  };
  const data = await getRankingTotalCC();
  return (
    <CardWithName nameToDisplay={"Ranking ilości 1cc"}>
      <div className="flex flex-col gap-2 max-h-[38rem] min-h-[38rem] overflow-y-auto pr-2">
        {data.map(async (e, index) => {
          const user = await getUserWithImage(e.uid);
          return (
            <RankItem index={index} user={user} key={index} toShow={"CC"} unit="CC" />
          );
        })}
      </div>
    </CardWithName>
  );
}
