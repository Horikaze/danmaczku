import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest, response: NextResponse) {
  const body: FormData | Promise<FormData> = await request.formData();
  const replayFile: File = body.get("replay") as File;
  const formData = new FormData();
  formData.append("file", replayFile);
  const res = await fetch(process.env.NEXT_PUBLIC_APITHREP as string, {
    method: "POST",
    body: formData,
  });
  const replay = await res.json();
  return new NextResponse(JSON.stringify(replay));
}
