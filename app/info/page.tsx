import CardWithoutName from "../utils/components/CardWithoutName";

export default async function page() {
  return (
    <div className="flex mt-5 flex-col place-items-center gap-5 justify-center drop-shadow-md">
      <CardWithoutName>
        <div className="bg-content break-words text-text p-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ad
            aliquid minus eum voluptatibus nesciunt corporis reiciendis nulla
            ratione, asperiores sequi adipisci incidunt commodi? Odio
            consectetur aliquid ratione quis labore? TODO
          </p>
        </div>
      </CardWithoutName>
    </div>
  );
}
