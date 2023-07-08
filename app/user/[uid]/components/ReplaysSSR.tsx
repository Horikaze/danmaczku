import RecentItem from "@/app/components/Recent/RecentItem";
import { PrivateUser, RpyReq } from "@/app/types/types";
import CardWithName from "@/app/utils/components/CardWithName";
import { initDb } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const db = initDb();
type ReplaysSSRParams = {
  user: PrivateUser;
  bestToSearch: string;
  toShow: string;
};
export default async function ReplaysSSR({
  user,
  bestToSearch,
  toShow,
}: ReplaysSSRParams) {
  const recentRpy = async () => {
    const replays: RpyReq[] = [];
    const col = collection(db, "replay");
    const q = query(
      col,
      orderBy(bestToSearch, "desc"),
      limit(4),
      where("uid", "==", user.uid)
    );
    const snapshot = await getDocs(q);
    const snapData = snapshot.docs;
    snapData.forEach((element) => {
      replays.push(element.data() as RpyReq);
    });
    return replays;
  };
  const data = await recentRpy();
  return (
    <CardWithName nameToDisplay={`${toShow}`}>
      <div className="flex flex-col gap-2">
        {data!.map((rpy) => {
          return <RecentItem rpy={rpy} key={rpy.checksum} />;
        })}
      </div>
    </CardWithName>
  );
}
