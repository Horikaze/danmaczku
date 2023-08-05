import { getUserWithImage } from "@/app/utils/publicUser";
import { NextRequest, NextResponse } from "next/server";
import { createCanvas, loadImage } from "canvas";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const user = await getUserWithImage(req.uid);
  const canvas = createCanvas(600, 200);
  const ctx = canvas.getContext("2d");

  // Okrąg, w którym umieścimy obraz
  const circle = {
    x: 60,
    y: 60,
    radius: 50,
  };

  // Ładowanie obrazu awatara
  const avatar = await loadImage(user.imageLink);
  // Compute aspect ratio
  const aspect = avatar.height / avatar.width;
  // Math.max is used to have a cover effect, use Math.min for contain
  const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
  const hsy = circle.radius * Math.max(aspect, 1.0);

  // Clipping - ograniczenie do kształtu okręgu
  ctx.save();
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
  ctx.closePath();
  // Dodanie efektu cienia do okręgu
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.shadowBlur = 4;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

  // // Wypełnienie okręgu kolorem
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.clip();

  // Rysowanie obrazu awatara na płótnie wewnątrz okręgu
  ctx.drawImage(avatar, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);

  // Usunięcie clippingu
  ctx.restore();

  // Tworzenie obrazu na płótnie
  ctx.font = "30px Impact";
  ctx.fillStyle = "red";
  ctx.fillText(`User ${user.publicUser.displayName}`, 200, 40);

  ctx.fillStyle = "blue";
  ctx.fillText(`Punkty: ${user.publicUser.totalPoints}`, 200, 80);

  const imageBase64 = canvas.toDataURL();

  // Zwracanie danych base64 w odpowiedzi JSON
  return NextResponse.json({ imageBase64 });
}
