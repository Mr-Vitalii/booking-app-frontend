import { Link } from "react-router-dom";
import { HotelProps } from "@/common/types/hotel";

export const LatestDestinationCard = ({ hotel }: HotelProps) => {
  return (
    <div className="relative rounded-md">
      <Link
        to={`/detail/${hotel._id}`}
        className=" cursor-pointer overflow-hidden "
      >
        <div className="h-[300px]">
          <img
            src={hotel.imageUrls[0]}
            className="w-full h-full object-cover object-center rounded-md"
          />
        </div>
      </Link>
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-[100%] rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {hotel.name}
        </span>
      </div>
    </div>
  );
};
