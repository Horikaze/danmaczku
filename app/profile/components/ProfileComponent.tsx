import { User } from "firebase/auth";
import { PrivateUserImageLink } from "@/app/types/types";
import { useQuery } from "@tanstack/react-query";
import { getUserWithImage } from "@/app/utils/publicUser";
import RpyInfo from "./RpyInfo";
import Table from "./Table";
import Loading from "@/app/rankings/loading";
import UserAndSettings from "./UserAndSettings";
interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  const { data, isLoading, refetch } = useQuery<PrivateUserImageLink>({
    queryFn: () => getUserWithImage(user.uid),
    queryKey: [`${user.uid}`],
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    <Loading />;
  }

  if (data) {
    return (
      <div className="flex mt-5 flex-col place-items-center 2xl:grid 2xl:grid-cols-2 gap-5 justify-center drop-shadow-md">
        <UserAndSettings user={data} />
        <Table uid={data.publicUser.uid} />
        <RpyInfo user={data.publicUser} />
      </div>
    );
  }
}
