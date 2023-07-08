import { RpyReq } from "@/app/types/types";
import { initDb } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  const db = await initDb();
  const req = await request.json();
  const checksum = req.checksum;
  const docRef = await doc(db, "replay", checksum);
  const docSnap = (await getDoc(docRef)).data();
  return new NextResponse(JSON.stringify(docSnap));
}
