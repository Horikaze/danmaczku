import { PrivateUserImageLink } from "@/app/types/types";

type GenerateProfileImageProps = {
  user:PrivateUserImageLink
}
export default function GenerateProfileImage({user}:GenerateProfileImageProps) {
  const generateImage = async () => {
    let bodyContent = JSON.stringify({
      uid: user.publicUser.uid,
    });
    const res = await fetch("/api/generate", {
      method: "POST",
      body: bodyContent,
    });
    const date = Date.now()
    const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const data = await res.json();
    const link = document.createElement("a");
    link.href = data.imageBase64;
    link.download = `Horikaze-${formattedDate}.png`;
    link.click();
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
