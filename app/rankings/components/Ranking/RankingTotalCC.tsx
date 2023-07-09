import { PrivateUser } from "@/app/types/types";
import RankItem from "../RankItem";
import { getUserWithImage } from "@/app/utils/publicUser";
import CardWithName from "@/app/utils/components/CardWithName";
export default async function RankingTotalCC({}) {
  const getData = async () => {
    const res = await fetch("http://localhost:3000/api/totalcc", {
      cache: "no-store",
    });
    const data = await res.json();
    return data as PrivateUser[];
  };
  const data = await getData();
  return (
    <CardWithName nameToDisplay={"Ranking ilości 1cc"}>
      <div className="flex flex-col gap-2 max-h-[38rem] min-h-[38rem] overflow-y-auto pr-2">
        {data!.map(async (e, index) => {
          const user = await getUserWithImage(e.uid);
          return (
            <RankItem
              index={index}
              user={user}
              key={index}
              toShow={"CC"}
              unit="CC"
            />
          );
        })}
      </div>
    </CardWithName>
  );
}
