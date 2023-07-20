import { UserPointRanking } from "@/app/types/types";
import Link from "next/link";

const games = [
  "EoSD",
  "PCB",
  "IN",
  "PoFV",
  "MoF",
  "SA",
  "UFO",
  "GFW",
  "TD",
  "DDC",
  "LoLK",
  "HSiFS",
  "WBaWC",
  "UM",
];
const difficulty = ["easy", "normal", "hard", "lunatic", "extra", "phantasm"];
type SurvivalTableProps = {
  data: UserPointRanking;
};
export default function SurvivalTable({ data }: SurvivalTableProps) {
  return (
    <div className="flex flex-col text-xs md:text-base text-text">
      <table>
        <thead>
          <tr>
            <th>Gra</th>
            <th>Easy</th>
            <th>Normal</th>
            <th>Hard</th>
            <th>Lunatic</th>
            <th>Extra</th>
            <th>Phantasm</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            if (!data) {
              return;
            }
            const easy = data![game.toLocaleLowerCase() + "Easy"];
            const normal = data![game.toLocaleLowerCase() + "Normal"];
            const hard = data![game.toLocaleLowerCase() + "Hard"];
            const lunatic = data![game.toLocaleLowerCase() + "Lunatic"];
            const extra = data![game.toLocaleLowerCase() + "Extra"];
            const phantasm = data![game.toLocaleLowerCase() + "Phantasm"];
            return (
              <tr key={game} className="text-center border-2 border-text">
                <td>{game}</td>
                {difficulty.map((diff) => {
                  const cellValue =
                    diff === "easy"
                      ? easy
                      : diff === "normal"
                      ? normal
                      : diff === "hard"
                      ? hard
                      : diff === "lunatic"
                      ? lunatic
                      : diff === "extra"
                      ? extra
                      : phantasm;
                  const cellClassName =
                    cellValue === 1
                      ? "bg-orange-400"
                      : cellValue === 2
                      ? "bg-gray-400"
                      : cellValue === 3
                      ? "bg-purple-400"
                      : cellValue === 4
                      ? "bg-pink-400"
                      : cellValue === 5
                      ? "bg-pink-400"
                      : "bg-content";

                  const rpyData = data[
                    game.toLocaleLowerCase() +
                      diff.charAt(0).toUpperCase() +
                      diff.slice(1) +
                      "Checksum"
                  ] as string;
                  const [checksum, userNickname, character, shottype, date] =
                    rpyData ? rpyData.split("+") : ["", "", "", "", ""];
                  return (
                    <td
                      key={diff}
                      className={`border-2 border-text ${cellClassName} ${
                        cellValue && "cursor-pointer hover:brightness-110"
                      }`}
                    >
                      <Link
                        href={`/replay/${checksum}`}
                        className="text-white"
                        prefetch={false}
                      >
                        <div>
                          <p>{character ? character + " " + shottype : ""}</p>
                        </div>
                      </Link>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row mt-4 text-white justify-around">
        <p className="bg-orange-400 px-5 rounded-sm py-1">1cc</p>
        <p className="bg-gray-400 px-5 rounded-sm py-1">1NN</p>
        <p className="bg-purple-400 px-5 rounded-sm py-1">2NN</p>
        <p className="bg-pink-400 px-5 rounded-sm py-1">3NN+</p>
      </div>
    </div>
  );
}
