import { timestampToDateStringnoFixed } from "@/app/utils/refactorFunc";
import { ChatMessage } from "./ChatMessageBox";
type ChatMessageProps = {
  message: ChatMessage;
  myMes: boolean;
};
export default function ChatMessage({ message, myMes }: ChatMessageProps) {
  return (
    <div className="flex flex-row px-3 rounded-sm">
      <div
        className="flex w-full px-2 py-1 flex-col hyphens-auto bg-gray-300 rounded-md border border-gray-400
        "
      >
        <div className="grid grid-cols-3 grid-rows-1">
          {!myMes && (
            <p
              className="text-xs font-bold
                text-start col-start-1
              "
            >
              {message.nickname}
            </p>
          )}
          <p className="text-xs font-bold col-start-2 text-center">
            {message.createdAt.toDate().toLocaleString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {myMes && (
            <p className="text-xs font-bold text-end col-start-3">
              {message.nickname}
            </p>
          )}
        </div>
        <p className={`${myMes ? "text-end": "text-start"} text-clip text-xs`}>{message.text}</p>
      </div>
    </div>
  );
}
