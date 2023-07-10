import axios from "axios";
import { Threp, initialThrep } from "../types/types";
import toast from "react-hot-toast";
import { MD5 } from "crypto-js";

export const checkRpy = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("replay", file);
    const response = await axios.post("/api/threp", formData);
    const data: Threp = await response.data;
    return data as Threp;
  } catch (e) {
    toast.error(`${e}`);
    return initialThrep;
  }
};
const toastId = "1";

export interface UpdateRpyResult {
  data: Threp;
  file: File;
}

export const updateRpy = async (
  e: HTMLInputElement
): Promise<UpdateRpyResult | undefined> => {
  try {
    toast.loading("Sprawdzanie...", { id: toastId });
    if (e.files && e.files.length > 0) {
      if (e.files[0].name.endsWith(".rpy") && e.files[0].size < 153600) {
        const file = e.files[0];
        const info = await checkRpy(file);
        const game = parseInt(file.name.split("_")[0].substring(2));

        const fileChecksum = await new Promise<string>((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = function (event) {
            const fileContent = event.target!.result;
            const checksum = MD5(fileContent as string).toString();
            resolve(checksum);
          };
          fileReader.onerror = function (event) {
            reject(event.target!.error);
          };
          fileReader.readAsText(file);
        });

        const joinDate = new Date(file.lastModified);
        const formattedDate = joinDate.toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        const data: Threp = {
          ...info,
          game: game,
          date_on_file: formattedDate,
          checksum: fileChecksum,
        };
        toast.success("Replay sprawdzony", { id: toastId });
        const dataAndRpy: UpdateRpyResult = {
          data: data,
          file: file,
        };
        return dataAndRpy;
      } else {
        toast.error("Invalid file format or size", { id: toastId });
        throw new Error("sussy");
      }
    }
  } catch (e) {
    toast.error(`Error: ${e as string}`, { id: toastId });
  }
};
