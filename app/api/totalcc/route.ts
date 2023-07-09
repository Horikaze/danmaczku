import { PrivateUser } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
const db = initDb();
export async function GET(request: NextRequest, response: NextResponse) {
  const ranking: PrivateUser[] = [];
  const col = collection(db, "users");
  const q = query(col, orderBy("CC", "desc"), limit(20));
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    ranking.push(element.data() as PrivateUser);
  });
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return new NextResponse(JSON.stringify(ranking));
}
