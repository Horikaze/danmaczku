import Link from "next/link";
import CardWithoutName from "../utils/components/CardWithoutName";
import WRTable from "./components/WRTable";
import SRTable from "./components/SRTable";
export default function Info() {
  return (
    <div className="flex mt-5 flex-col place-items-center gap-5 justify-center drop-shadow-md">
      <CardWithoutName>
        <div className=" break-words text-text p-4">
          <div className="flex flex-col gap-4 text-xs md:text-base text-text">
            <WRTable />
            <SRTable />
          </div>
        </div>
      </CardWithoutName>
    </div>
  );
}
