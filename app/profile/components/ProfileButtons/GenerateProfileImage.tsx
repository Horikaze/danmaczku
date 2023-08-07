import { PrivateUserImageLink } from "@/app/types/types";
import background from "../../../../public/images/bg.png";
import { Rubik } from "next/font/google";
const rubik = Rubik({ subsets: ["latin"] });
type GenerateProfileImageProps = {
  user: PrivateUserImageLink;
};
export default function GenerateProfileImage({
  user,
}: GenerateProfileImageProps) {
  const generateImage = async () => {
    const canvas = document.createElement("canvas");
    canvas.height = 200;
    canvas.width = 600;
    const ctx = canvas.getContext("2d");
    const avatar = new Image();
    const image = new Image();
    image.src = background.src;
    avatar.setAttribute("crossorigin", "anonymous");
    avatar.src = user.imageLink;
    avatar.onload = () => {
      if (!ctx) {
        return;
      }

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const circle = {
        x: 10,
        y: 10,
        radius: 50,
      };
      circle.x = circle.x + circle.radius;
      circle.y = circle.y + circle.radius;
      const aspect = avatar.height / avatar.width;
      const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
      const hsy = circle.radius * Math.max(aspect, 1.0);

      ctx.save();
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;
      ctx.shadowBlur = 4;
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.clip();
      ctx.drawImage(avatar, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);
      ctx.restore();

      ctx.font = `30px ${rubik.className}`;
      ctx.fillStyle = "blue";
      ctx.textAlign = "center";
      ctx.fillText(
        `${user.publicUser.displayName}`,
        canvas.width / 2,
        canvas.height / 2
      );
      ctx.restore();
      const date = Date.now();
      const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = `${user.publicUser.displayName}-${formattedDate}.png`;
      link.click();
    };
  };
  return (
    <button
      onClick={() => {
        generateImage();
      }}
      className="bg-orange-400 text-white text-sm hover:bg-orange-500 drop-shadow-sm rounded-sm px-2 py-1"
    >
      Wygeneruj obrazek
    </button>
  );
}
