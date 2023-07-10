import { PrivateUser, PrivateUserImageLink } from "@/app/types/types";
import RankItem from "../RankItem";
import { getUserWithImage } from "@/app/utils/publicUser";
import CardWithName from "@/app/utils/components/CardWithName";
export default async function RankingTotalCC({}) {
  const getData = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_TOTALCC as string, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data as PrivateUserImageLink[];
  };
  const data = await getData();
  return (
    <CardWithName nameToDisplay={"Ranking ilości 1cc"}>
      <div className="flex flex-col gap-2 max-h-[38rem] min-h-[38rem] overflow-y-auto pr-2">
        {data!.map((e, index) => {
          return (
            <RankItem
              index={index}
              user={e}
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
