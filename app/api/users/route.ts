import { PrivateUser } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
const db = initDb();
export async function GET(request: NextRequest, response: NextResponse) {
  let users: PrivateUser[] = [];
  const col = collection(db, "users");
  const q = query(col);
  const snapshot = await getDocs(q);
  const snapData = snapshot.docs;
  snapData.forEach((element) => {
    users.push(element.data() as PrivateUser);
  });
  return new NextResponse(JSON.stringify(users));
}
