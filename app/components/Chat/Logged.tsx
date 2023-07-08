import { PrivateUserImageLink } from "@/app/types/types";
import ChatInputField from "./ChatInputField";
import { getUserWithImage } from "@/app/utils/publicUser";
import { useQuery } from "@tanstack/react-query";
import ChatMessageBox from "./ChatMessageBox";

type LoggedProps = {
  useruid: string;
};

export default function Logged({ useruid }: LoggedProps) {
  const { data, isLoading, refetch } = useQuery<PrivateUserImageLink>({
    queryFn: () => getUserWithImage(useruid),
    queryKey: ["myProfile"],
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      {isLoading && <h1 className="text-center">Ładowanie profilu</h1>}
      {data && <ChatMessageBox user={data} />}
      {data && <ChatInputField user={data} />}
    </div>
  );
}
