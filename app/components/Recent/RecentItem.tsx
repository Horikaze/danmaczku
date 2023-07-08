import { timestampToDateStringnoFixed } from "@/app/utils/refactorFunc";
import { RpyReq } from "../../types/types";
import Link from "next/link";

type RecentReplayProps = {
  rpy: RpyReq;
};

export default function RecentItem({ rpy }: RecentReplayProps) {
  return (
    <div className="bg-content rounded-sm p-3 text-sm">
      <div className="justify-between flex flex-row">
        <div className="flex justify-start text-text flex-col">
          <p>
            <strong>Data dodania: </strong>
            {timestampToDateStringnoFixed(rpy.addDate!)}
          </p>
          <p>
            <strong>Gracz: </strong> {rpy.userNickname}
          </p>
          <p>
            <strong>Score: </strong>
            {rpy.stage_score}
          </p>
          <p>
            <strong>Touhou: </strong>
            {rpy.game} {rpy.rank}
          </p>
          <p>
            <strong> Shottype: </strong>
            {rpy.character} {rpy.shottype}
          </p>
          <p>
            <strong>Punkty: </strong>
            {rpy.points}
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-col justify-between gap-2 items-end">
            <Link
              href={`/replay/${rpy.checksum}`}
              className="bg-orange-400 hover:bg-orange-500 text-white drop-shadow-sm transition-colors px-2 py-1 rounded-sm m-1"
            >
              Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
