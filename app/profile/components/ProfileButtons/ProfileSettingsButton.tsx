"use client";
import { FormEvent, useState } from "react";
import Modal from "@/app/utils/components/Modal";
import { doc, updateDoc } from "firebase/firestore";
import { initDb } from "@/firebase/clientApp";
import toast from "react-hot-toast";

type RequestsButtonProps = {
  uid: string;
};
const db = initDb();
const games = [
  "HRtP",
  "SoEW",
  "PoDD",
  "LLS",
  "MS",
  "EoSD",
  "PCB",
  "IN",
  "PoFV",
  "MoF",
  "SA",
  "UFO",
  "GFW",
  "TD",
  "DDC",
  "LoLK",
  "HSiFS",
  "WBaWC",
  "UM",
];
export default function ProfileSettingsButton({ uid }: RequestsButtonProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const displayName = formData.get("nickname") as string;
    const discord = formData.get("discord") as string;
    const twitter = formData.get("twitter") as string;
    const youtube = formData.get("youtube") as string;
    const favoriteGame = formData.get("favoriteGame") as string;
    const toChange = [displayName, discord, favoriteGame, twitter, youtube];
    toChange.forEach(async (element) => {
      if (element === undefined || element === "" || element.length < 3) {
        return;
      } else {
        switch (toChange.indexOf(element)) {
          case 0:
            await changeProfile("displayName", element);
            break;
          case 1:
            await changeProfile("discord", element);
            break;
          case 2:
            await changeProfile("favoriteGame", element);
            break;
          case 3:
            await changeProfile("twitter", element);
            break;
          case 4:
            await changeProfile("youtube", element);
            break;
          default:
            return;
        }
      }
    });
  };
  const changeProfile = async (option: string, value: string) => {
    await updateDoc(doc(db, "users", uid), {
      [option]: value,
    });
    let info;
    switch (option) {
      case "twitter":
        info = "Twitter";
        break;
      case "favoriteGame":
        info = "ulubioną grę";
        break;
      case "youtube":
        info = "YouTube";
        break;
      case "discord":
        info = "Discord";
        break;
      case "displayName":
        info = "nazwę użytkownika";
        break;
      default:
        break;
    }
    toast.success(
      `Zaktualizowano ${info}, zrób reload strony, aby zobaczyć zmiany`
    );
  };
  const [profileSettings, setProfileSettings] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setProfileSettings(!profileSettings);
        }}
        className="bg-orange-400 text-white text-sm hover:bg-orange-500 drop-shadow-sm rounded-sm px-2 py-1"
      >
        Ustawienia
      </button>
      {profileSettings && (
        <Modal title="Ustawienia" setMyRequests={setProfileSettings}>
          <div className="flex flex-col after:my-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-2"
            >
              <p>Nickname</p>
              <input
                type="text"
                name="nickname"
                className="p-2 rounded-sm focus:outline-none  w-4/5 bg-content text-sm outline-gray-400"
                placeholder="Nickname"
              />
              <p>Discord</p>
              <input
                type="text"
                name="discord"
                className="p-2 rounded-sm focus:outline-none  w-4/5 bg-content text-sm outline-gray-400"
                placeholder="Discord"
              />
              <p>Ulubiona gra</p>
              <select
                name="favoriteGame"
                id="favoriteGame"
                className="p-2 rounded-sm focus:outline-none w-4/5 bg-content text-sm outline-gray-400"
              >
                {games.map((e) => {
                  return (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  );
                })}
              </select>
              <p>Twitter</p>
              <input
                type="text"
                name="twitter"
                className="p-2 rounded-sm focus:outline-none  w-4/5 bg-content text-sm outline-gray-400"
                placeholder="Twitter"
              />
              <p>YouTube</p>
              <input
                type="text"
                name="youtube"
                className="p-2 rounded-sm focus:outline-none  w-4/5 bg-content text-sm outline-gray-400"
                placeholder="YouTube"
              />
              <button
                type="submit"
                className="bg-orange-400 text-white hover:bg-orange-500 drop-shadow-sm rounded-sm px-4 py-2"
              >
                Zaktualizuj
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
}
