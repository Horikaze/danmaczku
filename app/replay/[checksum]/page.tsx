import { RpyReq } from "@/app/types/types";
import RouterBack from "@/app/utils/components/RouterBack";
import CardWithName from "@/app/utils/components/CardWithName";
import { timestampToDateStringnoFixed } from "@/app/utils/refactorFunc";
import { initDb, initStorage } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Metadata } from "next";
import Link from "next/link";
import ReplayInfo from "./components/ReplayInfo";
type ReplayInfoParams = {
  params: { checksum: string };
};
const db = initDb();
const storage = initStorage();
export async function generateMetadata({
  params,
}: ReplayInfoParams): Promise<Metadata> {
  const docRef = doc(db, "replay", params.checksum);
  const rpy = (await getDoc(docRef)).data() as RpyReq;
  return {
    title: `Th:${rpy.game} ${rpy.userNickname} ${rpy.character} ${rpy.shottype} ${rpy.rank}`,
  };
}
export default async function Page({ params }: ReplayInfoParams) {
  const docRef = doc(db, "replay", params.checksum);
  const rpy = (await getDoc(docRef)).data() as RpyReq;
  const storageRef = ref(storage, `${rpy.filePath}`);
  const rpyLink = await getDownloadURL(storageRef);

  return (
    <div className="flex mt-5 flex-col place-items-center text-text 2xl:grid 2xl:grid-cols-2 gap-5 justify-center drop-shadow-md">
      <ReplayInfo rpy={rpy} rpyLink={rpyLink} />
      <CardWithName nameToDisplay={`Ranking Touhou ${rpy.game} ${rpy.rank}`}>
        <div className="text-center text-3xl text-text">
          <h1>TODO</h1>
        </div>
      </CardWithName>
    </div>
  );
}
