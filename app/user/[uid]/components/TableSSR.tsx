import { InitialUserPointRanking, UserPointRanking } from "@/app/types/types";
import CardWithoutName from "@/app/utils/components/CardWithoutName";
import SurvivalTable from "@/app/utils/components/SurvivalTable";
import { initDb } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
const db = initDb();
type SurvivalTableProps = {
  uid: string;
};
export default async function TableSSR({ uid }: SurvivalTableProps) {
  const getTableData = async () => {
    const docRef = doc(db, `table/${uid}`);
    const data = (await getDoc(docRef)).data() as UserPointRanking;
    if (data === undefined) {
      return InitialUserPointRanking;
    }
    return data;
  };
  const data = await getTableData();
  return (
    <CardWithoutName>
      <SurvivalTable data={data} />
    </CardWithoutName>
  );
}
