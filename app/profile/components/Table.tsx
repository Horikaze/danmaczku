import { InitialUserPointRanking, UserPointRanking } from "@/app/types/types";
import CardWithoutName from "@/app/utils/components/CardWithoutName";
import SurvivalTable from "@/app/utils/components/SurvivalTable";
import { initDb } from "@/firebase/clientApp";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
const db = initDb();
type SurvivalTableProps = {
  uid: string;
};
export default function Table({ uid }: SurvivalTableProps) {
  const getTableData = async () => {
    const docRef = doc(db, `table/${uid}`);
    const data = (await getDoc(docRef)).data() as UserPointRanking;
    if (data === undefined) {
      return InitialUserPointRanking;
    }
    return data;
  };
  const { data, isLoading, refetch } = useQuery<UserPointRanking>({
    queryFn: () => getTableData(),
    queryKey: [`${uid}Table`],
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
  return (
    <CardWithoutName>
      {isLoading ? (
        <SurvivalTable data={InitialUserPointRanking} />
      ) : (
        <SurvivalTable data={data!} />
      )}
    </CardWithoutName>
  );
}
