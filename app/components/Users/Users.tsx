import { PrivateUser } from "@/app/types/types";
import CardWithName from "@/app/utils/components/CardWithName";
import { getUserWithImage } from "@/app/utils/publicUser";
import UserListItem from "./UserListItem";

export default async function Users() {
  const getData = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_USERS as string, {
      next: {
        revalidate: 1,
      },
    });
    const data = await res.json();
    return data as PrivateUser[];
  };
  const data = await getData();
  data.sort((a, b) =>
    a.displayName.localeCompare(b.displayName, "en", { sensitivity: "base" })
  );
  return (
    <CardWithName nameToDisplay={"Gracze"}>
      <div className="flex flex-col gap-2 max-h-[38rem] min-h-[38rem] overflow-y-auto pr-2">
        {data.map(async (e, index) => {
          const user = await getUserWithImage(e.uid);
          return <UserListItem index={index} user={user} key={index} />;
        })}
      </div>
    </CardWithName>
  );
}
