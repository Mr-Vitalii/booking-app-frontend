import { useQuery } from "react-query";
import { Loader } from "@/components/Loader";
import { v4 as uuidv4 } from "uuid";
import * as apiClient from "../api-client";

export const MyBookings = () => {
  const { data: hotels, isLoading } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings
  );

  if (!hotels || hotels.length === 0) {
    return (
      <h2 className="text-xl font-bold text-center">
        You don't have any hotels booked yet
      </h2>
    );
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-5">
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <ul>
            {hotels.map((hotel) => (
              <li
                key={uuidv4()}
                className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-sky-600 rounded-lg p-8 gap-5"
              >
                <div className="lg:w-full lg:h-[250px]">
                  <img
                    src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                  <div className="text-2xl font-bold">
                    {hotel.name}
                    <div className="text-xs font-normal">
                      {hotel.city}, {hotel.country}
                    </div>
                  </div>
                  <ul>
                    {hotel.bookings.map((booking) => (
                      <li key={uuidv4()}>
                        <div>
                          <span className="font-bold mr-2">Dates: </span>
                          <span>
                            {new Date(booking.checkIn).toDateString()} -
                            {new Date(booking.checkOut).toDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold mr-2">Guests:</span>
                          <span>
                            {booking.adultCount} adults, {booking.childCount}{" "}
                            children
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
