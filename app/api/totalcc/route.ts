import { PrivateUser, PrivateUserImageLink } from "@/app/types/types";
import { getUserWithImage } from "@/app/utils/publicUser";
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
  let usersImage: PrivateUserImageLink[] = [];
  for (const user of ranking) {
    const userWithImage = await getUserWithImage(user.uid);
    usersImage.push(userWithImage);
  }
  return new NextResponse(JSON.stringify(usersImage));
}
