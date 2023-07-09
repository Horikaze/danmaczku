import { Timestamp } from "firebase/firestore";
type stamp = {
  seconds: number;
  nanoseconds: number;
};
export const timestampToDateString = (timestamp: Timestamp): string => {
  const stamp = timestamp as unknown as stamp;
  let joinDate;
  if (stamp.seconds == undefined) {
    joinDate = new Date(timestamp as unknown as number);
  } else {
    joinDate = new Timestamp(stamp.seconds, stamp.nanoseconds).toDate();
  }

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
