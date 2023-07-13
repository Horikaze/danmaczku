import CardWithName from "@/app/utils/components/CardWithName";
import CardWithoutName from "../utils/components/CardWithoutName";

export default function Loading() {
  return (
    <div className="flex mt-5 flex-col place-items-center animate-pulse gap-5 justify-center drop-shadow-md">
      <CardWithoutName>
        <p>amogus</p>
      </CardWithoutName>
    </div>
  );
}
