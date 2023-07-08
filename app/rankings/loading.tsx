import CardWithName from "../utils/components/CardWithName";

export default function Loading() {
  return (
    <div className="flex mt-5 flex-col place-items-center animate-pulse 2xl:grid 2xl:grid-cols-2 gap-5 justify-center drop-shadow-md">
      <CardWithName nameToDisplay="&zwnj;">
        <div className="h-80 bg-content"></div>
      </CardWithName>
      <CardWithName nameToDisplay="&zwnj;">
        <div className="h-80 bg-content"></div>
      </CardWithName>
    </div>
  );
}
