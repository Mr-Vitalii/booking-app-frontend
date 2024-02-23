import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import * as apiClient from "../api-client";
import { Loader } from "@/components/Loader";
import { useAppContext } from "@/contexts/AppContext";

export const MyHotels = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const { data: HotelData, isLoading } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (error) => {
        console.error("An error occurred:", error);
      },
    }
  );

  const deleteHotelMutation = useMutation(apiClient.deleteMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel deleted!", type: "SUCCESS" });
      queryClient.invalidateQueries("fetchMyHotels");
    },
    onError: () => {
      showToast({ message: "Error deleting Hotel", type: "ERROR" });
    },
  });

  const handleDeleteHotel = async (hotelId: string) => {
    try {
      await deleteHotelMutation.mutateAsync(hotelId);
    } catch (error) {
      console.error("An error occurred while deleting the hotel:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : HotelData && HotelData.length > 0 ? (
        <div className="space-y-5">
          <span className="flex justify-between">
            <h1 className="text-3xl font-bold">My Hotels</h1>
            <Link
              to="/add-hotel"
              className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
            >
              Add Hotel
            </Link>
          </span>
          <div className="grid grid-cols-1 gap-8">
            {HotelData.map((hotel) => (
              <div
                key={hotel._id}
                className="flex flex-col justify-between border border-sky-600 rounded-lg p-8 gap-5"
              >
                <h2 className="text-2xl font-bold">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  <div className="border border-sky-600 rounded-sm p-2 flex items-center">
                    <BsMap className="mr-1" />
                    {hotel.city}, {hotel.country}
                  </div>
                  <div className="border border-sky-600 rounded-sm p-2 flex items-center">
                    <BsBuilding className="mr-1" />
                    {hotel.type}
                  </div>
                  <div className="border border-sky-600 rounded-sm p-2 flex items-center">
                    <BiMoney className="mr-1" />$ {hotel.pricePerNight} per
                    night
                  </div>
                  <div className="border border-sky-600 rounded-sm p-2 flex items-center">
                    <BiHotel className="mr-1" />
                    {hotel.adultCount} adults, {hotel.childCount} children
                  </div>
                  <div className="border border-sky-600 rounded-sm p-2 flex items-center">
                    <BiStar className="mr-1" />
                    {hotel.starRating} Star Rating
                  </div>
                </div>
                <div className="flex justify-end items-center gap-3">
                  <button
                    onClick={() => handleDeleteHotel(hotel._id)}
                    className="flex items-center bg-red-600 text-white font-bold p-2 hover:bg-red-500 sm:text-xl"
                  >
                    <MdDeleteForever />
                    <span>Delete hotel</span>
                  </button>
                  <span>
                    <Link
                      to={`/edit-hotel/${hotel._id}`}
                      className="flex bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 sm:text-xl"
                    >
                      View Details
                    </Link>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-xl font-bold text-center">
          You haven't added any hotels yet
        </h2>
      )}
    </>
  );
};
