import { RpyReq } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const db = initDb();
  const replays: RpyReq[] = [];
  const res = await request.json();
  const game = res.game;
  const rank = res.rank;
  const col = collection(db, "replay");
  const q = query(
    col,
    where("game", "==", Number(game)),
    where("rank", "==", `${rank}`),
    orderBy("stage_score", "desc"),
    limit(4)
  );
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    replays.push(element.data() as RpyReq);
  });

  return NextResponse.json(replays);
}
