type CardWithoutNameProps = {
  children: React.ReactNode;
};
export default function CardWithoutName({ children }: CardWithoutNameProps) {
  return (
    <div className="flex flex-col w-11/12 bg-card rounded-sm p-4">
      {children}
    </div>
  );
}
