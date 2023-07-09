import { PrivateUserImageLink } from "@/app/types/types";
import CardWithName from "@/app/utils/components/CardWithName";
import UserListItem from "./UserListItem";

export default async function Users() {
  const getData = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_USERS as string, {
      cache: "no-store",
      method: "GET",
    });
    const data = await res.json();
    return data as PrivateUserImageLink[];
  };
  const data = await getData();
  data.sort((a, b) =>
    a.publicUser.displayName.localeCompare(b.publicUser.displayName, "en", {
      sensitivity: "base",
    })
  );
  return (
    <CardWithName nameToDisplay={"Gracze"}>
      <div className="flex flex-col gap-2 max-h-[38rem] min-h-[38rem] overflow-y-auto pr-2">
        {data.map((e, index) => {
          return <UserListItem index={index} user={e} key={index} />;
        })}
      </div>
    </CardWithName>
  );
}
