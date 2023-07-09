import { UserPointRanking } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
const db = initDb();
export async function POST(request: NextRequest, response: NextResponse) {
  const ranking: UserPointRanking[] = [];
  const res = await request.json();
  const dbTarget = res.dbTarget;
  const col = collection(db, dbTarget);
  const q = query(col, orderBy("total", "desc"), limit(20));
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    ranking.push(element.data() as UserPointRanking);
  });
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return new NextResponse(JSON.stringify(ranking));
}
