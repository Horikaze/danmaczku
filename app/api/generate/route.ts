import { getUserWithImage } from "@/app/utils/publicUser";
import { NextRequest, NextResponse } from "next/server";
import * as PImage from "pureimage"

export async function POST(request: NextRequest) {
  // const req = await request.json();
  // const user = await getUserWithImage(req.uid);

  
  // const canvas = PImage.make(600, 200,{});
  // const ctx = canvas.getContext("2d");


  // Zwracanie danych base64 w odpowiedzi JSON
  return NextResponse.json({ "123":"13" });
}
