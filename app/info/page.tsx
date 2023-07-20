import CardWithoutName from "../utils/components/CardWithoutName";
import { difficulty, games } from "../utils/components/SurvivalTable";
import { scoreWR } from "../utils/scoreSystem";

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
export default function Info() {
  return (
    <div className="flex mt-5 flex-col place-items-center gap-5 justify-center drop-shadow-md">
      <CardWithoutName>
        <div className="bg-content break-words text-text p-4">
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
                  const gameAsNumber = games.indexOf(game);
                  return (
                    <tr className="text-center border-2 border-text" key={game}>
                      <td>{game}</td>
                      {difficulty.map((diff) => {
                        let WR: number;
                        if (diff === "phantasm") {
                          WR = scoreWR[gamesNumber[gameAsNumber]][diff];
                        } else {
                          WR =
                            scoreWR[gamesNumber[gameAsNumber]][
                              diff[0].toUpperCase() + diff.slice(1)
                            ];
                        }
                        const multiplier = (1000000000 / WR).toFixed(3);
                        return (
                          <td className="border-2 border-text" key={diff}>
                            {WR ? (
                              <div className="flex flex-col items-start pl-1">
                                <p>WR: {WR.toLocaleString()}</p>
                                <p>Mnożnik: {multiplier}</p>
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
          </div>
        </div>
      </CardWithoutName>
    </div>
  );
}
