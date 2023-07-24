import { difficulty, games } from "@/app/utils/components/SurvivalTable";
import { scoreWR } from "@/app/utils/scoreSystem";
import Link from "next/link";

const gamesNumber = [
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "128",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
];
export default function WRTable() {
  return (
    <>
      <h2 className="font-bold text-xl">1. Jak działa system punktacji score?</h2>
      <div className="pl-5 py-3">
        <p>
          Maksymalnie możemy dostać 100 pkt za runa z każdej gry z każdego
          poziomu trudności. Do różnych gier i trudności jest inny mnożnik, jak
          widać w tabelce poniżej, aby punkty były bardziej zbalansowane. Działa
          to następująco:
        </p>
        <p className="text-white text-sm font-bold">
          Mnożnik = 1 000 000 000 / WR
        </p>
        <p className="text-white text-sm font-bold">
          Finalne punkty = Mnożnik * nasz score
        </p>
      </div>
      <table>
        <thead>
          <tr className="border-2 border-text">
            <th className="border-2 border-text">Shot</th>
            <th className="border-2 border-text">Easy</th>
            <th className="border-2 border-text">Normal</th>
            <th className="border-2 border-text">Hard</th>
            <th className="border-2 border-text">Lunatic</th>
            <th className="border-2 border-text">Extra</th>
            <th className="border-2 border-text">Phantasm</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => {
            const gameNumber = games.indexOf(game);
            return (
              <tr className="text-center border-2 border-text" key={game}>
                <td>{game}</td>
                {difficulty.map((diff) => {
                  let WR: number;
                  if (diff === "phantasm") {
                    WR = scoreWR[gamesNumber[gameNumber]][diff];
                  } else {
                    WR =
                      scoreWR[gamesNumber[gameNumber]][
                        diff[0].toUpperCase() + diff.slice(1)
                      ];
                  }
                  const multiplier = (1000000000 / WR).toFixed(4);
                  return (
                    <td className="border-2 border-text" key={diff}>
                      {WR ? (
                        <div className="flex flex-col items-start pl-1">
                          <p>WR: {WR.toLocaleString()}</p>
                          <p>
                            Mnożnik: <strong>{multiplier}</strong>
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="place-self-end py-1 underline text-blue-300">
        <Link href={"https://maribelhearn.com/wr#wrs"} target="_blank">
          WR Source
        </Link>
      </div>
    </>
  );
}
