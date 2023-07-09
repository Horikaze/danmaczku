import { RpyReq } from "../../types/types";
import RecentItem from "./RecentItem";
import CardWithName from "@/app/utils/components/CardWithName";
export default async function RecetReplays() {
  const getData = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_RECENT as string, {
      cache: "no-store",
      method: "GET",
    });
    const data = await res.json();
    return data as RpyReq[];
  };
  const data = await getData();
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
