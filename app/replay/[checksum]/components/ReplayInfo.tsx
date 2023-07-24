import { RpyReq } from "@/app/types/types";
import CardWithName from "@/app/utils/components/CardWithName";
import RouterBack from "@/app/utils/components/RouterBack";
import { timestampToDateStringnoFixed } from "@/app/utils/refactorFunc";
import Link from "next/link";
type ReplayInfoProps = {
  rpy: RpyReq;
  rpyLink: string;
};
export default function ReplayInfo({ rpy, rpyLink }: ReplayInfoProps) {
  return (
    <CardWithName nameToDisplay={rpy.rpy_name}>
      <div className="flex flex-row mb-4 justify-between">
        <RouterBack />
        <Link
          href={rpyLink}
          target="_blank"
          className="bg-orange-400 hover:bg-orange-500 text-white drop-shadow-sm rounded-sm px-4 py-2"
        >
          Pobierz rpy
        </Link>
      </div>
      <p>
        <strong>Gracz: </strong>
        {rpy.userNickname}
      </p>
      <p>
        <strong>Nickname na rpy: </strong>
        {rpy.player}
      </p>
      <p>
        <strong>Touhou: </strong>
        {rpy.game}
      </p>
      <p>
        <strong>Difficulty: </strong>
        {rpy.rank}
      </p>
      <p>
        <strong>Shottype: </strong>
        {rpy.character} {rpy.shottype}
      </p>
      <p>
        <strong>1cc: </strong>
        {rpy.cc ? "Tak" : "Nie"}
      </p>
      <p>
        <strong>Score: </strong>
        {rpy.stage_score}
      </p>
      <p>
        <strong>Punkty rankingowe: </strong>
        {rpy.points}
      </p>
      <p>
        <strong>Punkty score: </strong>
        {rpy.scorePoints}
      </p>
      <p>
        <strong>Slow Rate: </strong>
        {rpy.slow_rate}
      </p>
      <p>
        <strong>Data na rpy: </strong>
        {rpy.date}
      </p>
      <p>
        <strong>Data na pliku: </strong>
        {rpy.date_on_file}
      </p>
      <p>
        <strong>Data akceptacji: </strong>
        {timestampToDateStringnoFixed(rpy.addDate!)}
      </p>
      <p>
        <strong>NNN: </strong>
        {rpy.nnn.length > 0 ? rpy.nnn.join(", ") : "brak"}
      </p>
      <p>
        <strong>Ilość klatek: </strong>
        {rpy.frame_count}
      </p>
      <p>
        <strong>Ilość Shift: </strong>
        {rpy.shift}
      </p>
      <p>
        <strong>Ilość Z: </strong>
        {rpy.z_keys}
      </p>
      <p>
        <strong>Ilość X: </strong>
        {rpy.x_keys}
      </p>
      <p>
        <strong>Ilość C: </strong>
        {rpy.c_keys}
      </p>
      <p className="text-end text-xs">Zaakceptowano przez: {rpy.acceptedBy}</p>
    </CardWithName>
  );
}
