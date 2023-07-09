import { PrivateUser, PrivateUserImageLink } from "../types/types";
import { doc, getDoc } from "firebase/firestore";
import { initDb, initStorage } from "@/firebase/clientApp";
import { getDownloadURL, getMetadata, ref } from "firebase/storage";
const db = initDb();
const storage = initStorage();
export const getUser = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  const user = snapshot.data() as PrivateUser;
  return user;
};
export const getUserWithImage = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);
  const user = snapshot.data() as PrivateUser;
  console.log(user);
  let imageLink;
  console.log(user);

  // if (user.image) {
  //   const storagepfp = ref(storage, `/users/${uid}/pfp/${user.image}`);
  //   await getDownloadURL(storagepfp)
  //     .then((e) => {
  //       imageLink = e;
  //     })
  //     .catch((e) => {
        imageLink = `https://ui-avatars.com/api/?name=${user.displayName}`;
  //     });
  // } else {
  //   imageLink = `https://ui-avatars.com/api/?name=${user.displayName}`;
  // }
  const userWithImage: PrivateUserImageLink = {
    publicUser: user,
    imageLink: imageLink!,
  };

  return userWithImage;
};
