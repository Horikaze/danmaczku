"use client";
import { calculateSurvivalPoints2 } from "@/app/utils/scoreSystem";
import { useState, useEffect } from "react";
const diff = ["Easy", "Normal", "Hard", "Lunatic", "Extra", "Phantasm"];
export default function SRTablev2() {
  const [calcScore, setCalcScore] = useState(0);
  const [calcLNN, setCalcLNN] = useState(0);
  const [calcRank, setCalcRank] = useState("");
  useEffect(() => {
    setCalcScore(calculateSurvivalPoints2(calcRank, calcLNN));
  }, [calcLNN, calcRank]);
  return (
    <>
      <h2 className="font-bold text-xl">
        2. Jak działa system punktacji za 1CC?
      </h2>
      <div className="pl-5 py-3">
        <p>TODO</p>
        <p className="text-white text-sm font-bold">
          DiffScore = dane z tabelki
        </p>
        <p className="text-white text-sm font-bold">
          LnnPoints = Jeżeli DiffScore jest większe bądz równe 3 to 2, inaczej 1
        </p>
        <p className="text-white text-sm font-bold">
          Finalny score = Ilość LNN * LnnPoints + DiffScore
        </p>
      </div>
      <div className="flex gap-3 pl-5">
        <div className="flex flex-col items-center">
          <p>Difficulty</p>
          <select
            className="p-2 rounded-sm focus:outline-none my-1 bg-content text-sm outline-gray-400"
            onChange={(e) => {
              setCalcRank(e.target.value);
            }}
          >
            {diff.map((d) => {
              return (
                <option key={d} value={d}>
                  {d}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col items-center">
          <p>Liczba LNN</p>
          <select
            className="p-2 rounded-sm focus:outline-none my-1 bg-content text-sm outline-gray-400"
            defaultValue={"0"}
            onChange={(e) => {
              setCalcLNN(Number(e.target.value));
            }}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p className="text-center">Punkty</p>
          <div className="flex h-full items-center justify-center">
            <p className="font-bold text-lg">{calcScore}</p>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr className="border-2 border-text">
            {diff.map((d) => {
              return (
                <th key={d} className="border-2 border-text">
                  {d}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="text-center border-2 border-text">
            <td className="text-center border-2 border-text">1</td>
            <td className="text-center border-2 border-text">2</td>
            <td className="text-center border-2 border-text">3</td>
            <td className="text-center border-2 border-text">4</td>
            <td className="text-center border-2 border-text">2</td>
            <td className="text-center border-2 border-text">2</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
