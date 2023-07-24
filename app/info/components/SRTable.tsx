"use client";
import { difficulty, games } from "@/app/utils/components/SurvivalTable";
import { survivalSystem } from "@/app/utils/scoreSystem";
import Link from "next/link";
import { useEffect, useState } from "react";

export const gameINfixed = [
  "EoSD",
  "PCB",
  "IN-A",
  "IN-B",
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

export const getGameNumber = (gameCode: string) => {
  switch (gameCode) {
    case "EoSD":
      return 6;
    case "PCB":
      return 7;
    case "IN-A":
      return 80;
    case "IN-B":
      return 81;
    case "PoFV":
      return 9;
    case "MoF":
      return 10;
    case "SA":
      return 11;
    case "UFO":
      return 12;
    case "GFW":
      return 128;
    case "TD":
      return 13;
    case "DDC":
      return 14;
    case "LoLK":
      return 15;
    case "HSiFS":
      return 16;
    case "WBaWC":
      return 17;
    case "UM":
      return 18;
    default:
      return 6;
  }
};

type CharacterScore = {
  character: string;
  score: number;
};
export default function SRTable() {
  const [gameSelected, setGameSelected] = useState(6);
  const [char, setChar] = useState<CharacterScore[]>();

  useEffect(() => {
    const toDisplay = survivalSystem[gameSelected];
    const transformedData: CharacterScore[] = [];
    for (const character in toDisplay) {
      const score = toDisplay[character];
      transformedData.push({ character: character, score: score });
    }
    setChar(transformedData);
  }, [gameSelected]);
  return (
    <>
      <h2 className="font-bold text-xl">
        2. Jak działa system punktacji za 1CC?
      </h2>
      <div className="pl-5 py-3">
        <p>TODO</p>
        <p>TODO</p>
      </div>
      <select
        name="game"
        id="game"
        className="p-2 rounded-sm focus:outline-none my-1 bg-content text-sm outline-gray-400"
        onChange={(e) => {
          setGameSelected(getGameNumber(e.target.value));
        }}
      >
        {gameINfixed.map((game) => {
          return (
            <option key={game} value={game}>
              {game}
            </option>
          );
        })}
      </select>
      <div className="flex flex-col min-h-[30rem] border-2 border-text">
        <table>
          <thead>
            <tr className="border-2 border-text">
              <th className="border-2 border-text">Shot</th>
              <th className="border-2 border-text">Easy</th>
              <th className="border-2 border-text">Normal</th>
              <th className="border-2 border-text">Hard</th>
              <th className="border-2 border-text">Lunatic</th>
              <th className="border-2 border-text">Extra</th>
            </tr>
          </thead>
          <tbody>
            {char?.map((e) => {
              const easy = e.score;
              const normal = e.score;
              const hard = e.score;
              const lunatic = e.score;
              const extra = e.score;
              return (
                <tr
                  className="text-center border-2 border-text"
                  key={e.character}
                >
                  <div className="w-10">
                    <td>{e.character}</td>
                  </div>
                  <td className="border-2 border-text">{0}</td>
                  <td className="border-2 border-text">{normal}</td>
                  <td className="border-2 border-text">{0}</td>
                  <td className="border-2 border-text">{0}</td>
                  <td>{0}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="place-self-end py-1 underline text-blue-300">
        <Link
          href={
            "https://docs.google.com/spreadsheets/d/e/2PACX-1vS97uPEhPc7Ys2LU9QZ2C5NBDTrcqOkCR9mixhs3yDt3zUSxIfNDAXENp8QzEsrFaLZI8wEt35nfLox/pubhtml?gid=161008384&amp;single=true&amp;widget=true&amp;headers=false"
          }
          target="_blank"
        >
          Scoring Source
        </Link>
      </div>
    </>
  );
}
