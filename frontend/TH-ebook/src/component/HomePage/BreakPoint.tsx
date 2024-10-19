import 'swiper/css'

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Mousewheel, Scrollbar} from "swiper/modules";
import {Book} from "../../models/Book.ts";


export default ({book}: {book: Book[]}) => (
    <section className="pt-[7rem] pb-[2rem] bg-rose-100">
        <div className="xl:mx-auto max-w-6xl mx-[1.5rem]">
            <h1 className="text-[3rem] font-bold mb-[2rem] text-center">
                BreakPoint + Mousewheel + Autoplay
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
                            <div className="relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 transition-transform transform hover:translate-y-[-10px]">
                                    <h2 className="text-lg font-bold">{p.title}</h2>
                                    <p className="text-sm">{p.authors.map(author => author.name).join(", ")}</p>
                                    <p className="text-sm">{p.published_year}</p>
                                </div>
                                <img
                                    className="w-full h-auto block"
                                    src={p.cover_image}
                                    alt={p.title}
                                />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    </section>
)
