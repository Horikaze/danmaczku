type CardWithNameProps = {
  children: React.ReactNode;
  nameToDisplay: string;
};
export default function CardWithName({
  children,
  nameToDisplay,
}: CardWithNameProps) {
  return (
    <div className="flex flex-col w-11/12  bg-card rounded-sm p-4">
      <div className="text-center text-text font-bold text-lg bg-content py-1 mb-4 rounded-sm">
        <h1>{nameToDisplay}</h1>
      </div>
      {children}
    </div>
  );
}
