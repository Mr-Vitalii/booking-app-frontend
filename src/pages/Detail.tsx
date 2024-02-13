import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { GuestInfoForm } from "@/components/forms/GuestInfoForm/GuestInfoForm";
import { Loader } from "@/components/Loader";

export const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-6">
          <div>
            <ul className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <li key={uuidv4()}>
                  <span>
                    <AiFillStar className="fill-yellow-400" />
                  </span>
                </li>
              ))}
            </ul>
            <h1 className="text-3xl font-bold">{hotel.name}</h1>
          </div>
          <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
            {hotel.imageUrls.map((image) => (
              <div key={uuidv4()} className="h-[300px]">
                <img
                  src={image}
                  alt={hotel.name}
                  className="rounded-md w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
            {hotel.facilities.map((facility) => (
              <div
                key={uuidv4()}
                className="border border-sky-600 rounded-sm p-3"
              >
                {facility}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
            <div className="whitespace-pre-line mb-4">{hotel.description}</div>
            <div className="h-fit">
              <GuestInfoForm
                pricePerNight={hotel.pricePerNight}
                hotelId={hotel._id}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
