import RecetReplays from "./components/Recent/RecetReplays";
import Users from "./components/Users/Users";
export default async function Home() {
  return (
    <div className="flex mt-5 flex-col place-items-center 2xl:grid 2xl:grid-cols-2 gap-5 justify-center drop-shadow-md">
      <RecetReplays />
      <Users />
    </div>
  );
}
