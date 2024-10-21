"use client";

import React from "react";
import { CourseFaq } from "../types";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import {
  HiOutlineArrowRightCircle,
  HiOutlineArrowLeftCircle,
} from "react-icons/hi2";

interface SliderCompProps {
  faqs: CourseFaq[];
  onSelectOrgan: (organ: string) => void;
}

const SliderComp: React.FC<SliderCompProps> = ({ faqs, onSelectOrgan }) => {
  const prevRef = React.useRef<HTMLButtonElement | null>(null);
  const nextRef = React.useRef<HTMLButtonElement | null>(null);

  // Extract unique organ names from faqs (assuming 'title' corresponds to organ)
  const organs = Array.from(new Set(faqs.map((faq) => faq.title)));

  return (
    <div
      dir="rtl"
      className="relative flex items-center mt-[45px] md:mt-[48px] w-[310px] md:w-[650px] lg:w-[1180px]"
    >
      {/* Left Arrow */}
      <div className="hidden md:block md:absolute -left-14 z-10">
        <button ref={nextRef} className="p-2">
          <HiOutlineArrowLeftCircle size={24} />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        spaceBetween={5}
        slidesPerView="auto"
        className="flex items-center"
      >
        {/* Dynamically generate SwiperSlides from organs array */}
        {organs.map((organ, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <div
              onClick={() => onSelectOrgan(organ)}
              className="hover:bg-[#00204c] hover:text-white mx-[8px] text-gray-500 cursor-pointer transition duration-300 flex flex-col justify-center items-center border border-gray-400 bg-white shadow-md px-12 py-4 rounded-[14px]"
            >
              {organ}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Right Arrow */}
      <div className="hidden md:block md:absolute -right-14 z-10">
        <button ref={prevRef} className="p-2">
          <HiOutlineArrowRightCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default SliderComp;
