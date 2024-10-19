import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Mousewheel, Scrollbar} from "swiper/modules";
import {Book} from "../../models/Book.ts";
import BookCard from "./BookCard.tsx";


export default ({book, text}: {book: Book[], text: string}) => (
    <section className="w-full">
        <div className="xl:mx-auto max-w-6xl mx-[1.5rem]">
            <h1 className="text-[3rem] font-bold mb-[2rem] text-white">
                {text}
            </h1>
            <Swiper
                modules={[Scrollbar, Mousewheel, Autoplay]}
                loop={true}
                pagination={{clickable: true}}
                centeredSlides={true}
                grabCursor={true}
                scrollbar={{draggable: true}}
                mousewheel={{
                    invert: false,
                }}
                autoplay={{
                    delay: 5000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    0: {
                        spaceBetween: 10,
                        slidesPerView: 1,
                    },
                    468: {
                        spaceBetween: 10,
                        slidesPerView: 2,
                    },
                    768: {
                        spaceBetween: 15,
                        slidesPerView: 3,
                    },
                    1024: {
                        spaceBetween: 15,
                        slidesPerView: 4,
                    },
                    1280: {
                        spaceBetween: 30,
                        slidesPerView: 5,
                    },
                }}
                className="breakpoint"
            >
                {book.map((p, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <BookCard book={p} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    </section>
)
