import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export const ImageSwiper = ({ imagesArr }: { imagesArr: string[] }) => {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={true}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {imagesArr.map((image) => (
        <SwiperSlide key={image}>
          <div className="flex items-center justify-center w-full h-[500px]">
            <img
              className="object-cover h-full w-full"
              src={image}
              alt="room view"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
