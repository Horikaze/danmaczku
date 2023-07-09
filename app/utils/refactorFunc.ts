import { Timestamp } from "firebase/firestore";
type stamp = {
  seconds:number
  nanoseconds:number
}
export const timestampToDateString = (timestamp: Timestamp): string => {
  const stamp = timestamp as unknown as stamp;
  const joinDate = new Timestamp(stamp.seconds, stamp.nanoseconds).toDate();
  const formattedDate = joinDate.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(formattedDate);
  
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
