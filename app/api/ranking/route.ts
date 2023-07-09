import { PrivateUserImageLink, UserPointRanking } from "@/app/types/types";
import { getUserWithImage } from "@/app/utils/publicUser";
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
  let usersImage: PrivateUserImageLink[] = [];
  for (const user of ranking) {
    const userWithImage = await getUserWithImage(user.uid);
    usersImage.push(userWithImage);
  }

  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return new NextResponse(JSON.stringify(usersImage));
}
