import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "@/common/types/hotel";

type Props = {
  hotel: HotelType;
};

export const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] bg-sky-100 border border-sky-600 rounded-lg p-4 gap-8 md:p-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0] || "/No_image_available.svg"}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[0.7fr_1.2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <span key={index}>
                  <AiFillStar className="fill-yellow-400" />
                </span>
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div>
          <div className="font-bold mb-4">${hotel.pricePerNight} per night</div>
          <div className="flex gap-1 items-stretch mb-4">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <p
                key={uuidv4()}
                className=" bg-sky-600 text-white p-2 rounded-lg font-bold text-xs "
              >
                {facility}
              </p>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex">
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-sky-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-sky-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
