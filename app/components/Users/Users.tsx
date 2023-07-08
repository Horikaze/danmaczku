import { PrivateUser } from "@/app/types/types";
import CardWithName from "@/app/utils/components/CardWithName";
import { getUserWithImage } from "@/app/utils/publicUser";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import UserListItem from "./UserListItem";

export default async function Users() {
  const db = initDb();
  const getAllUsers = async () => {
    let users: PrivateUser[] = [];
    const col = collection(db, "users");
    const q = query(col);
    const snapshot = await getDocs(q);
    const snapData = snapshot.docs;
    snapData.forEach((element) => {
      users.push(element.data() as PrivateUser);
    });
    return users;
  };
  const data = await getAllUsers();
  data.sort((a, b) => a.displayName.localeCompare(b.displayName, 'en', { sensitivity: 'base' }));

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
