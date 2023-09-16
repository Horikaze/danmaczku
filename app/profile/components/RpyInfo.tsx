"use client";
import { useEffect, useState } from "react";
import {
  PrivateUser,
  RequestReplay,
  Threp,
  initialThrep,
} from "../../types/types";
import { updateRpy } from "../../utils/threp";
import { toast } from "react-hot-toast";
import { initDb, initStorage } from "@/firebase/clientApp";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useQueryClient } from "@tanstack/react-query";
import CardWithName from "@/app/utils/components/CardWithName";
import {
  calculateScorePoints,
  calculateSurvivalPoints,
  calculateSurvivalPoints2,
} from "@/app/utils/scoreSystem";
interface RpyInfoProps {
  user: PrivateUser;
}
const db = initDb();
const storage = initStorage();
const toastID = "czemu ten komponent jest taki duzy xD";
export default function RpyInfo({ user }: RpyInfoProps) {
  const [rpyInfo, setRpyInfo] = useState<Threp>(initialThrep);
  const [nnnCount, setNnnCount] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [scorePoints, setScorePoints] = useState<number>(0);
  const [isCC, setisCC] = useState<boolean>(true);
  const [file, setFile] = useState<File>();
  const queryClient = useQueryClient();
  const resetRpy = () => {
    setRpyInfo(initialThrep);
    setisCC(true);
    setNnnCount([]);
    setAdditionalInfo("");
    setFile(undefined);
    setPoints(0);
  };

  const rpyInfoCheck = async (e: HTMLInputElement) => {
    setNnnCount([]);
    if (e.files! && e.files!?.length > 0) {
      const data = await updateRpy(e);
      setRpyInfo(data!.data);
      setFile(data?.file);
    }
  };
  const calculateScore = () => {
    if (rpyInfo.game >= 6 && rpyInfo.game <= 9) {
      if (isCC == false) {
        setPoints(1);
        return;
      }
    } else if (rpyInfo.game >= 10) {
      if (
        rpyInfo.base_info.stage === "All" ||
        rpyInfo.base_info.stage === "Extra"
      ) {
        setisCC(true);
      } else {
        setisCC(false);
        setPoints(1);
        return;
      }
    }
    setPoints(
      calculateSurvivalPoints2(rpyInfo.base_info.rank, nnnCount.length)
    );
    // const finalPoints = calculateSurvivalPoints(
    //   rpyInfo.game,
    //   rpyInfo.base_info.shottype,
    //   rpyInfo.game === 9
    //     ? rpyInfo.base_info.character[0].split(" ")[0]
    //     : (rpyInfo.base_info.character as unknown as string),
    //   rpyInfo.base_info.rank,
    //   rpyInfo.game === 8 ? rpyInfo.base_info.stage : undefined
    // );
    // setPoints(finalPoints);
    const scoreRank = calculateScorePoints(
      rpyInfo.game,
      rpyInfo.stage_score[rpyInfo.stage_score.length - 1],
      rpyInfo.base_info.rank
    );
    setScorePoints(scoreRank);
  };

  useEffect(() => {
    calculateScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rpyInfo, nnnCount, isCC]);
  const checkReplayExisting = async () => {
    toast.loading("Sprawdzanie...", { id: toastID });
    if (!file || rpyInfo === initialThrep) {
      toast.error("Nie ustawiono rpy", { id: toastID });
      return;
    }
    const dupliceteRef1 = doc(db, "replay", `${rpyInfo.checksum}`);
    const dupliceteRef2 = doc(db, "rpyReq", `${rpyInfo.checksum}`);
    const snap1 = await getDoc(dupliceteRef1);
    const snap2 = await getDoc(dupliceteRef2);
    if (snap1.exists() || snap2.exists()) {
      toast.error("Replay już isnieje w bazie danych", { id: toastID });
    } else {
      toast.success("Replay nie isnieje w bazie danych", { id: toastID });
    }
  };
  const handleCheckboxChange = (value: string) => {
    if (nnnCount.includes(value)) {
      setNnnCount(nnnCount.filter((item) => item !== value));
    } else {
      setNnnCount([...nnnCount, value]);
    }
  };
  const sendReplay = async () => {
    try {
      if (!file || rpyInfo === initialThrep) {
        throw new Error("Nie ustawiono rpy");
      }
      toast.loading("Sprawdzanie...", { id: toastID });
      const dupliceteRef1 = doc(db, "replay", `${rpyInfo.checksum}`);
      const dupliceteRef2 = doc(db, "rpyReq", `${rpyInfo.checksum}`);
      if (!isCC) {
        throw new Error("Replay nie jest 1cc");
      }
      const snap1 = await getDoc(dupliceteRef1);
      const snap2 = await getDoc(dupliceteRef2);
      if (snap1.exists() || snap2.exists()) {
        toast.error("Replay już isnieje w bazie danych", { id: toastID });
        return;
      }
      toast.loading("Wysyłanie...", { id: toastID });
      const data: RequestReplay = {
        replay: rpyInfo,
        additionalInfo: {
          comment: additionalInfo,
          nnn: nnnCount,
          CC: isCC,
        },
        user: user,
      };
      await setDoc(doc(db, "rpyReq", rpyInfo.checksum), {
        character:
          data.replay.game === 9
            ? data.replay.base_info.character[0].split(" ")[0]
            : data.replay.base_info.character,
        rank: data.replay.base_info.rank,
        shottype: data.replay.base_info.shottype,
        stage: data.replay.base_info.stage,
        player: data.replay.player,
        slow_rate: data.replay.slow_rate,
        game: data.replay.game,
        stage_score:
          data.replay.stage_score[data.replay.stage_score.length - 1],
        frame_count: data.replay.frame_count,
        date: data.replay.date,
        date_on_file: data.replay.date_on_file,
        z_keys: data.replay.z_keys,
        x_keys: data.replay.x_keys,
        c_keys: data.replay.c_keys,
        shift: data.replay.shift,
        checksum: data.replay.checksum,
        rpy_name: data.replay.rpy_name,
        nnn: data.additionalInfo.nnn,
        comment: data.additionalInfo.comment,
        cc: data.additionalInfo.CC,
        uid: user.uid,
        userNickname: user.displayName,
        filePath: `/users/${user?.uid}/rpyReq/${data.replay.checksum}/${data.replay.rpy_name}`,
        reqDate: Timestamp.now(),
        points: points,
        scorePoints: scorePoints,
      });
      const storageRef = ref(
        storage,
        `/users/${user?.uid}/rpyReq/${data.replay.checksum}/${data.replay.rpy_name}`
      );
      uploadBytesResumable(storageRef, file!);
      toast.success("Wysyłano", { id: toastID });
      if (user.admin == true) {
        queryClient.invalidateQueries(["req"]);
      }
      queryClient.invalidateQueries(["myReq"]);
    } catch (e) {
      toast.error(`${e}`, { id: toastID });
    }
    resetRpy();
  };
  return (
    <>
      <CardWithName nameToDisplay={rpyInfo.rpy_name}>
        <ul className="flex flex-col gap-2 text-text">
          <li>
            <strong>Player: </strong>
            {rpyInfo.player}
          </li>
          <li className="flex-grow border-t border-gray-400"></li>
          <li>
            <strong>Character: </strong>
            {rpyInfo.game == 9
              ? rpyInfo.base_info.character[0].split(" ")[0]
              : rpyInfo.base_info.character}
          </li>
          <li className="flex-grow border-t border-gray-400"></li>
          <li>
            <strong>Shot type: </strong>
            {rpyInfo.base_info.shottype}
          </li>
          <li className="flex-grow border-t border-gray-400"></li>
          <li>
            <strong>Rank: </strong>
            {rpyInfo.base_info.rank}
          </li>
          <li className="flex-grow border-t border-gray-400"></li>
          <li>
            <strong>Stage: </strong>
            {rpyInfo.base_info.stage}
          </li>
          <li className="flex-grow border-t border-gray-400"></li>
          <li>
            <strong>Slow Rate: </strong>
            {rpyInfo.slow_rate}
          </li>
          <li className="flex-grow border-t border-gray-400"></li>
          <li>
            <strong>Date: </strong>
            {rpyInfo.date_on_file}
          </li>
          <li className="flex-grow border-t border-gray-400"></li>
          <li>
            <strong>Score: </strong>
            {rpyInfo.stage_score[rpyInfo.stage_score.length - 1]}
          </li>
          <label
            htmlFor="rpyFile"
            className="bg-orange-400 text-white text-center cursor-pointer hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
          >
            <input
              type="file"
              accept=".rpy"
              id="rpyFile"
              onChange={(e) => {
                rpyInfoCheck(e.target);
              }}
              className="hidden"
            />
            Wybierz plik .rpy
          </label>
        </ul>
      </CardWithName>
      <CardWithName nameToDisplay={"Wybrano: " + rpyInfo.rpy_name}>
        <div className="text-text flex flex-row justify-between">
          <div>
            <button
              className="bg-orange-400 text-white hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
              onClick={() => checkReplayExisting()}
            >
              Sprawdź czy replay już istnieje
            </button>
          </div>
          <div>
            <p>
              <strong>Punkty: </strong>
              {points}
            </p>
            <p>
              <strong>Punkty score: </strong>
              {rpyInfo !== initialThrep
                ? `${
                    rpyInfo.stage_score[rpyInfo.stage_score.length - 1]
                  } * ${calculateScorePoints(
                    rpyInfo.game,
                    rpyInfo.stage_score[rpyInfo.stage_score.length - 1],
                    rpyInfo.base_info.rank,
                    true
                  )} = ${scorePoints}`
                : "0"}
            </p>
          </div>
        </div>
        <div className="2xl:mt-16 2xl:mb-12">
          <div className="flex flex-row justify-between py-4">
            <div className="grid grid-flow-col items-center grid-rows-3 text-text">
              <div>
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 cursor-pointer accent-orange-400"
                  id="1cc"
                  checked={isCC}
                  onChange={() => setisCC(!isCC)}
                />
                <label htmlFor="1cc" className="cursor-pointer">
                  1cc
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  className="w-4 h-4 mr-2 cursor-pointer accent-orange-400"
                  id="noMiss"
                  onChange={() => handleCheckboxChange("noMiss")}
                  checked={nnnCount.includes("noMiss") ? true : false}
                />
                <label htmlFor="noMiss" className="cursor-pointer">
                  No miss
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={nnnCount.includes("noBomb") ? true : false}
                  className="w-4 h-4 mr-2 cursor-pointer accent-orange-400"
                  id="noBomb"
                  onChange={() => handleCheckboxChange("noBomb")}
                />
                <label htmlFor="noBomb" className="cursor-pointer">
                  No bomb
                </label>
              </div>
              {rpyInfo.game === 7 ||
              rpyInfo.game === 12 ||
              rpyInfo.game === 13 ||
              rpyInfo.game === 16 ||
              rpyInfo.game === 17 ||
              rpyInfo.game === 18 ? (
                <div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2 cursor-pointer accent-orange-400"
                    id="noThirdCondition"
                    checked={
                      nnnCount.includes("noThirdCondition") ? true : false
                    }
                    onChange={() => handleCheckboxChange("noThirdCondition")}
                  />
                  <label htmlFor="noThirdCondition" className="cursor-pointer">
                    {rpyInfo.game === 7 && "No border break"}
                    {rpyInfo.game === 12 && "No ufo summons"}
                    {rpyInfo.game === 13 && "No trance"}
                    {rpyInfo.game === 16 && "No relase"}
                    {rpyInfo.game === 17 && "No hyper or No roar breaks"}
                    {rpyInfo.game === 18 && "No card"}
                  </label>
                </div>
              ) : (
                ""
              )}
              {rpyInfo.game === 17 ? (
                <div>
                  <input
                    type="checkbox"
                    checked={nnnCount.includes("wbawc") ? true : false}
                    className="w-4 h-4 mr-2 cursor-pointer accent-orange-400"
                    id="wbawc"
                    onChange={() => handleCheckboxChange("wbawc")}
                  />
                  <label htmlFor="wbawc" className="cursor-pointer">
                    Additional No Hyper or/and No Roar Breaks
                  </label>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="w-64 h-32">
              <textarea
                maxLength={200}
                value={additionalInfo}
                placeholder="Dodaj dodatkowe info. Takie jak np. czy replay jest uszkodzony, ma desync, replay potrzebuję narzędzi, aby mógł zostać poprawnie otworzony (max. 200 znaków)."
                className={`rounded-sm w-full bg-content p-2 h-full text-sm resize-none outline-none ${
                  additionalInfo.length > 190 ? "text-red-600" : "text-text"
                }`}
                onChange={(e) => {
                  setAdditionalInfo(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-orange-400 text-white hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
            onClick={() => sendReplay()}
          >
            Wyślij
          </button>
        </div>
      </CardWithName>
    </>
  );
}
