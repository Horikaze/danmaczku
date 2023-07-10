import { initDb } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { RpyReq, UserPointRanking } from "../types/types";

const db = initDb();

export const updateAll = async (rpy: RpyReq) => {
  await updateRankingPoint(rpy);
  await updateRankingScore(rpy);
  await updateRankingTable(rpy);
  await updateProfileRank(rpy.uid, "rankingPoints");
  await updateProfileRank(rpy.uid, "rankingScore");
};

export const updateProfileRank = async (uid: string, dbTarget: string) => {
  const data: UserPointRanking[] = [];
  const col = collection(db, dbTarget);
  const q = query(col, orderBy("total", "desc"));
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    data.push(element.data() as UserPointRanking);
  });
  let myScore: UserPointRanking;
  data.forEach((element) => {
    if (element.uid === uid) {
      myScore = element;
    }
  });
  const rank = data.indexOf(myScore!);
  const toUpdate =
    dbTarget === "rankingPoints" ? "achievementsRank" : "scoreRank";
  const docRef = doc(db, `users/${uid}`);
  await updateDoc(docRef, {
    [toUpdate]: rank + 1,
  });
};

const updateRankingPoint = async (rpy: RpyReq) => {
  const toUpdate = getGameNameFromCode(rpy.game) + rpy.rank;
  const docRefCheck = doc(db, `rankingPoints/${rpy.uid}`);
  const docSnapCheck = await getDoc(docRefCheck);
  if (!docSnapCheck.exists()) {
    await createRankProfile(rpy.uid, "rankingPoints");
  }
  const docRef = doc(db, `rankingPoints/${rpy.uid}`);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const fieldToUpdate = data![toUpdate] as number;
  if (fieldToUpdate <= rpy.points) {
    await updateDoc(docRef, {
      [toUpdate]: rpy.points,
      [toUpdate + "Checksum"]:
        rpy.checksum +
        "+" +
        rpy.userNickname +
        "+" +
        rpy.character +
        "+" +
        rpy.shottype +
        "+" +
        rpy.date,
    });

    let sum = 0;
    let sumCC = 0;
    const docRefu = doc(db, `rankingPoints/${rpy.uid}`);
    const docSnapu = await getDoc(docRefu);

    const data = docSnapu.data();
    for (const key in data) {
      if (key !== "total" && typeof data[key] === "number") {
        sum += data[key] as number;
        if (data[key] > 0) {
          sumCC += 1;
        }
      }
    }
    await updateTotalvalue(rpy.uid, "rankingPoints", sum);
    await updateDoc(doc(db, "users", rpy.uid), {
      totalPoints: sum,
      CC: sumCC,
    });
  }
};

const updateRankingScore = async (rpy: RpyReq) => {
  const toUpdate = getGameNameFromCode(rpy.game) + rpy.rank;
  const docRefCheck = doc(db, `rankingScore/${rpy.uid}`);
  const docSnapCheck = await getDoc(docRefCheck);
  if (!docSnapCheck.exists()) {
    await createRankProfile(rpy.uid, "rankingScore");
  }
  const docRef = doc(db, `rankingScore/${rpy.uid}`);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const fieldToUpdate = data![toUpdate] as number;
  if (fieldToUpdate <= rpy.stage_score) {
    await updateDoc(docRef, {
      [toUpdate]: rpy.stage_score,
      [toUpdate + "Checksum"]:
        rpy.checksum +
        "+" +
        rpy.userNickname +
        "+" +
        rpy.character +
        "+" +
        rpy.shottype +
        "+" +
        rpy.date,
    });
  }
  let sum = 0;
  const docRefu = doc(db, `rankingScore/${rpy.uid}`);
  const docSnapu = await getDoc(docRefu);
  const datau = docSnapu.data();
  for (const key in datau) {
    if (key !== "total" && typeof datau[key] === "number") {
      sum += datau[key] as number;
    }
  }
  await updateTotalvalue(rpy.uid, "rankingScore", sum);
  await updateDoc(doc(db, "users", rpy.uid), {
    totalScore: sum,
  });
};

export const updateRankingTable = async (rpy: RpyReq) => {
  const toUpdate = getGameNameFromCode(rpy.game) + rpy.rank;
  const docRefCheck = doc(db, `table/${rpy.uid}`);
  const docSnapCheck = await getDoc(docRefCheck);
  if (!docSnapCheck.exists()) {
    await createRankProfile(rpy.uid, "table");
  }
  const docRef = doc(db, `table/${rpy.uid}`);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const fieldToUpdate = data![toUpdate] as number;
  const value = 1 + rpy.nnn.length;
  if (fieldToUpdate <= value) {
    await updateDoc(docRef, {
      [toUpdate]: value,
      [toUpdate + "Checksum"]:
        rpy.checksum +
        "+" +
        rpy.userNickname +
        "+" +
        rpy.character +
        "+" +
        rpy.shottype +
        "+" +
        rpy.date,
    });
  }
  let sum = 0;
  const docRefu = doc(db, `table/${rpy.uid}`);
  const docSnapu = await getDoc(docRefu);

  const datau = docSnapu.data();
  for (const key in datau) {
    if (key !== "total" && typeof datau[key] === "number") {
      if (datau[key] > 0) {
        sum += 1;
      }
    }
  }
  await updateTotalvalue(rpy.uid, "table", sum);
};

const updateTotalvalue = async (
  uid: string,
  rankType: string,
  total: number
) => {
  await updateDoc(doc(db, rankType, uid), {
    total: total,
  });
};

export const getGameNameFromCode = (gameCode: number) => {
  switch (gameCode) {
    case 6:
      return "eosd";
    case 7:
      return "pcb";
    case 8:
      return "in";
    case 9:
      return "pofv";
    case 10:
      return "mof";
    case 11:
      return "sa";
    case 12:
      return "ufo";
    case 128:
      return "gfw";
    case 13:
      return "td";
    case 14:
      return "ddc";
    case 15:
      return "lolk";
    case 16:
      return "hsifs";
    case 17:
      return "wbawc";
    case 18:
      return "um";
    default:
      return "";
  }
};

export const createRankProfile = async (uid: string, rankType: string) => {
  const docRef = doc(db, `${rankType}/${uid}`);
  await setDoc(docRef, {
    total: 0,
    uid: uid,
    eosdEasy: 0,
    eosdNormal: 0,
    eosdHard: 0,
    eosdLunatic: 0,
    eosdExtra: 0,
    eosdEasyChecksum: "a",
    eosdNormalChecksum: "a",
    eosdHardChecksum: "a",
    eosdHardLunatic: "a",
    eosdExtraChecksum: "a",
    pcbEasy: 0,
    pcbNormal: 0,
    pcbHard: 0,
    pcbLunatic: 0,
    pcbExtra: 0,
    pcbPhantasm: 0,
    pcbEasyChecksum: "a",
    pcbNormalChecksum: "a",
    pcbHardChecksum: "a",
    pcbLunaticChecksum: "a",
    pcbExtraChecksum: "a",
    pcbPhantasmChecksum: "a",
    inEasy: 0,
    inNormal: 0,
    inHard: 0,
    inLunatic: 0,
    inExtra: 0,
    inEasyChecksum: "a",
    inNormalChecksum: "a",
    inHardChecksum: "a",
    inLunaticChecksum: "a",
    inExtraChecksum: "a",
    pofvEasy: 0,
    pofvNormal: 0,
    pofvHard: 0,
    pofvLunatic: 0,
    pofvExtra: 0,
    pofvEasyChecksum: "a",
    pofvNormalChecksum: "a",
    pofvHardChecksum: "a",
    pofvLunaticChecksum: "a",
    pofvExtraChecksum: "a",
    mofEasy: 0,
    mofNormal: 0,
    mofHard: 0,
    mofLunatic: 0,
    mofExtra: 0,
    mofEasyChecksum: "a",
    mofNormalChecksum: "a",
    mofHardChecksum: "a",
    mofLunaticChecksum: "a",
    mofExtraChecksum: "a",
    saEasy: 0,
    saNormal: 0,
    saHard: 0,
    saLunatic: 0,
    saExtra: 0,
    saEasyChecksum: "a",
    saNormalChecksum: "a",
    saHardChecksum: "a",
    saLunaticChecksum: "a",
    saExtraChecksum: "a",
    ufoEasy: 0,
    ufoNormal: 0,
    ufoHard: 0,
    ufoLunatic: 0,
    ufoExtra: 0,
    ufoEasyChecksum: "a",
    ufoNormalChecksum: "a",
    ufoHardChecksum: "a",
    ufoLunaticChecksum: "a",
    ufoExtraChecksum: "a",
    gfwEasy: 0,
    gfwNormal: 0,
    gfwHard: 0,
    gfwLunatic: 0,
    gfwExtra: 0,
    gfwEasyChecksum: "a",
    gfwNormalChecksum: "a",
    gfwHardChecksum: "a",
    gfwLunaticChecksum: "a",
    gfwExtraChecksum: "a",
    tdEasy: 0,
    tdNormal: 0,
    tdHard: 0,
    tdLunatic: 0,
    tdExtra: 0,
    tdEasyChecksum: "a",
    tdNormalChecksum: "a",
    tdHardChecksum: "a",
    tdLunaticChecksum: "a",
    tdExtraChecksum: "a",
    ddcEasy: 0,
    ddcNormal: 0,
    ddcHard: 0,
    ddcLunatic: 0,
    ddcExtra: 0,
    ddcEasyChecksum: "a",
    ddcNormalChecksum: "a",
    ddcHardChecksum: "a",
    ddcLunaticChecksum: "a",
    ddcExtraChecksum: "a",
    lolkEasy: 0,
    lolkNormal: 0,
    lolkHard: 0,
    lolkLunatic: 0,
    lolkExtra: 0,
    lolkEasyChecksum: "a",
    lolkNormalChecksum: "a",
    lolkHardChecksum: "a",
    lolkLunaticChecksum: "a",
    lolkExtraChecksum: "a",
    hsifsEasy: 0,
    hsifsNormal: 0,
    hsifsHard: 0,
    hsifsLunatic: 0,
    hsifsExtra: 0,
    hsifsEasyChecksum: "a",
    hsifsNormalChecksum: "a",
    hsifsHardChecksum: "a",
    hsifsLunaticChecksum: "a",
    hsifsExtraChecksum: "a",
    wbawcEasy: 0,
    wbawcNormal: 0,
    wbawcHard: 0,
    wbawcLunatic: 0,
    wbawcExtra: 0,
    wbawcEasyChecksum: "a",
    wbawcNormalChecksum: "a",
    wbawcHardChecksum: "a",
    wbawcLunaticChecksum: "a",
    wbawcExtraChecksum: "a",
    umEasy: 0,
    umNormal: 0,
    umHard: 0,
    umLunatic: 0,
    umExtra: 0,
    umEasyChecksum: "a",
    umNormalChecksum: "a",
    umHardChecksum: "a",
    umLunaticChecksum: "a",
    umExtraChecksum: "a",
  });
};
