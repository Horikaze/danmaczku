import { RpyReq } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
const db = initDb();
export async function GET(request: NextRequest, response: NextResponse) {
  const replays: RpyReq[] = [];
  const col = collection(db, "replay");
  const q = query(col, orderBy("addDate", "desc"), limit(4));
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    replays.push(element.data() as RpyReq);
  });
  return new NextResponse(JSON.stringify(replays));
}
