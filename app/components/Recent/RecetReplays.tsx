import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { RpyReq } from "../../types/types";
import RecentItem from "./RecentItem";
import CardWithName from "@/app/utils/components/CardWithName";
const db = initDb();
export default async function RecetReplays() {
  const recentRpy = async () => {
    const replays: RpyReq[] = [];
    const col = collection(db, "replay");
    const q = query(col, orderBy("addDate", "desc"), limit(4));
    const snapshot = await getDocs(q);
    const snapData = snapshot.docs;
    snapData.forEach((element) => {
      replays.push(element.data() as RpyReq);
    });
    return replays;
  };
  const data = await recentRpy();
  return (
    <CardWithName nameToDisplay="Ostatnio dodane">
      <div className="flex flex-col gap-2 2xl:my-1">
        {data!.map((rpy) => {
          return <RecentItem rpy={rpy} key={rpy.checksum} />;
        })}
      </div>
    </CardWithName>
  );
}
