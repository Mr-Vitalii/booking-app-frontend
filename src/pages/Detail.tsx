import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import { GuestInfoForm } from "@/components/forms/GuestInfoForm/GuestInfoForm";
import { Loader } from "@/components/Loader";
import { Modal } from "@/components/Modal";
import { ImageSwiper } from "@/components/ImageSwiper";
import { useAppContext } from "@/contexts/AppContext";

export const Detail = () => {
  const { hotelId } = useParams();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const { isAboveMediumScreens } = useAppContext();

  const { data: hotel, isLoading } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

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
          {isAboveMediumScreens && <ImageSwiper imagesArr={hotel.imageUrls} />}

          <div className="grid grid-col-1 lg:grid-cols-3 gap-4">
            {hotel.imageUrls.map((imageUrl) => (
              <div key={uuidv4()} className="h-[300px]">
                <img
                  onClick={() => openModal(imageUrl)}
                  src={imageUrl}
                  alt={hotel.name}
                  className="rounded-md w-full h-full object-cover object-center cursor-pointer"
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="h-auto">
          <img
            src={selectedImage}
            alt="room view"
            className="rounded-md w-full h-full md:max-h-[550px] object-cover object-center cursor-pointer"
          />
        </div>
      </Modal>
    </>
  );
};
