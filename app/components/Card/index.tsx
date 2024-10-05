import Image from "next/image";

interface ICardProps {
  name: string;
  image?: string;
  className?: string;
}

const Card: React.FC<ICardProps> = ({ name, image, className }) => {
  return (
    <div
      className={`${className} card-container flex w-full items-center justify-start gap-4 rounded-xl bg-white p-4 sm:w-[40%] md:w-[30%] lg:w-[23%]`}
    >
      {image && (
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#ebebeb]">
          <Image src={image} alt={name} width={72} height={72} />
        </div>
      )}
      <h5 className="color-neutral-dark break-all">{name}</h5>
    </div>
  );
};

export default Card;
