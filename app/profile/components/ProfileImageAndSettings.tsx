import { initDb, initStorage } from "@/firebase/clientApp";
import { doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { toast } from "react-hot-toast";
import RequestsButton from "./ProfileButtons/RequestsButton";
import { PrivateUserImageLink } from "@/app/types/types";
import MyReqButton from "./ProfileButtons/MyReqButton";
import ProfileSettingsButton from "./ProfileButtons/ProfileSettingsButton";
import SignOut from "./ProfileButtons/SignOut";
const storage = initStorage();
const db = initDb();
interface ProfileImageProps {
  user: PrivateUserImageLink;
}

export default function ProfileImageAndSettings({ user }: ProfileImageProps) {
  const changeImage = async (e: HTMLInputElement) => {
    try {
      if (e.files! && e.files!?.length > 0) {
        const pfp = e.files[0];
        if (pfp.size > 1048576) {
          throw new Error("Maksymalnie 1 MB >:c");
        }
        const deleteStorageRef = ref(
          storage,
          `/users/${user?.publicUser.uid}/pfp/${user.publicUser.image}`
        );
        const storageRef = ref(
          storage,
          `/users/${user?.publicUser.uid}/pfp/${pfp.name}`
        );
        uploadBytesResumable(storageRef, pfp);
        await updateDoc(doc(db, `users/${user?.publicUser.uid}`), {
          image: pfp.name,
        });
        await deleteObject(deleteStorageRef)
          .then(() => {})
          .catch((error) => {
            if (error.code == "storage/object-not-found") {
              console.log("Object not found!");
            }
          });
        toast.success(
          "Zaktualizowano pfp, załaduj ponownie stronę aby zobaczyć zmiany"
        );
      }
    } catch (e) {
      toast.error(`${e}`);
    }
  };
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col col-start-1 text-text text-center justify-center bg-content h-32 my-2 rounded-sm">
        <h1>TODO Achievements list</h1>
      </div>
      <div className="col-start-2 justify-center flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <label
            htmlFor="changePfp"
            className="h-20 w-20 cursor-pointer hover:brightness-110 relative"
          >
            <Image
              className="rounded-sm"
              src={user.imageLink}
              sizes="100vw"
              alt="pfp"
              fill
              priority
            />
            <input
              type="file"
              accept=".png, .gif, .jpg"
              id="changePfp"
              onChange={(e) => {
                changeImage(e.target);
              }}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <div className="col-start-3 flex flex-col py-2 justify-center h-32 items-end gap-2">
        <ProfileSettingsButton uid={user.publicUser.uid} />
        {user.publicUser.admin === true && <RequestsButton user={user} />}
        <MyReqButton user={user} />
        <SignOut />
      </div>
    </div>
  );
}
