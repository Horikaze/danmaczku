import { Timestamp } from "firebase/firestore";

export const timestampToDateString = (timestamp: Timestamp): string => {
  const stamp = timestamp as unknown as number;
  const joinDate = new Date(stamp);
  const formattedDate = joinDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedDate;
};
export const timestampToDateStringnoFixed = (timestamp: Timestamp): string => {
    const date = timestamp.toDate();
    const dateString = date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return dateString;
};