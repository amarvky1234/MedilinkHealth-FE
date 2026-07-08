import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "./css/swipersection.css"

function SwiperSection() {
    const services = [
        {
            id: 1,
            titledesc: "FAST HEALTHCARE",
            title: "Reliable on-time home delivery",
            desc: "Our in-house pharmacists ensure your medicines reach you when you need them.",
            image: "/images/medicine1.png",
            bgColor: "#E7F1F7",
        },
        {
            id: 2,
            titledesc: "AVAILABLE EVERYWHERE",
            title: "Delivering in 100+ cities all over India",
            desc: "From Amritsar to Port Blair, we home deliver medicine & health products all over India",
            image: "/images/medicine2.png",
            bgColor: "#F7E8E6",
        },
        {
            id: 3,
            titledesc: "TRUSTED CARE",
            title: "Genuine medicines",
            desc: "All medicines & health products are sourced from Practo's trusted network of verified pharmacies and medical stores",
            image: "/images/medicine3.png",
            bgColor: "#E4F2EB",
        },
        {
            id: 4,
            titledesc: "COMPEHENSIVE INFORMATION",
            title: "Know your medicine",
            desc: "Exhaustive information about medicines wriiten by verified medical experts",
            image: "/images/medicine4.png",
            bgColor: "#EEEBF8",
        },
    ];

    return (
        <div className="">

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={0}
                loop={true}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                {services.map((item) => (
                    <SwiperSlide key={item.id}>

                        <div className="slide-card" style={{backgroundColor:item.bgColor}}>

                            <div className="slide-content">

                                <div className="slide-text">

                                    <h6>{item.titledesc}</h6>

                                    <h1>{item.title}</h1>

                                    <p>{item.desc}</p>

                                </div>

                                <div className="slide-image">

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                    />

                                </div>

                            </div>

                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}

export default SwiperSection;