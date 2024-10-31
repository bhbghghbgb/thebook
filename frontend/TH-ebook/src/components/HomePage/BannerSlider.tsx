import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import Banner from "./Banner";
import { Book } from "../../models/Book";

interface Props {
  books: Book[];
  isMobile: boolean;
}

const BannerSlider = ({books, isMobile}: Props) => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, FreeMode]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        freeMode={true}
      >
        {books.map((book) => (
            <SwiperSlide key={book.id}>
                <Banner book={book} isMobile={isMobile} />
            </SwiperSlide>
            ))}
        {/* Add more slides as needed */}
      </Swiper>
    </>
  );
};

export default BannerSlider;
