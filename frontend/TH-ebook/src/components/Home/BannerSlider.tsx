import "swiper/css";
import {Swiper, SwiperSlide} from "swiper/react";
import {Scrollbar, Mousewheel} from "swiper/modules";
import Banner from "./Banner";
import {Book} from "../../models/Book";
import {useSelector} from "react-redux";
import {StateType} from "../../store/rootReducer.ts";

interface Props {
    isMobile: boolean;
    onClick: (book: Book) => void;
}

const BannerSlider = ({isMobile, onClick}: Props) => {
    const {data: books} = useSelector(
        (state: StateType) => state.newBooks
    );
    return (
        <>
            <Swiper
                modules={[Scrollbar, Mousewheel]}
                loop={true}
                pagination={{clickable: true}}
                grabCursor={true}
                scrollbar={{draggable: true}}
                mousewheel={{invert: false}}
                updateOnWindowResize={false}
                resizeObserver={true}
                autoHeight={true}
                slidesPerView={1}
                autoplay={{delay: 5000}}
            >
                {books?.map((book) => (
                    <SwiperSlide key={book.id} onClick={() => onClick(book)}>
                        <Banner book={book} isMobile={isMobile}/>
                    </SwiperSlide>
                ))}
                {/* Add more slides as needed */}
            </Swiper>
        </>
    );
};

export default BannerSlider;
