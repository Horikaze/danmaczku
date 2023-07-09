import { PrivateUser } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
const db = initDb();
export const revalidate = 1;
export async function GET(request: NextRequest, response: NextResponse) {
  let users: PrivateUser[] = [];
  const col = collection(db, "users");
  const q = query(col);
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    users.push(element.data() as PrivateUser);
  });
  const path = request.nextUrl.searchParams.get("path") || "/";
  revalidatePath(path);
  return new NextResponse(JSON.stringify(users));
}
