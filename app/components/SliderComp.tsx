"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Import Swiper navigation module and styles
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

import { Swiper as SwiperType } from "swiper";

import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";

// Organs array
const organs = [
  "المعدة",
  "الامعاء",
  "الرئة",
  "القلب",
  "الكبد",
  "الطحال",
  "الدماغ",
  "العين",
  "الاذن",
  "الانف",
  "اللسان",
  "الكلية",
  "البنكرياس",
  "الحلق",
  "الحنجرة",
  "الأسنان",
  "الشعر",
  "الجلد",
  "العضلات",
  "العظام",
];

const SliderComp = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

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
        onBeforeInit={(swiper: SwiperType) => {
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
        className="flex items-center "
      >
        {/* Dynamically generate SwiperSlides from organs array */}
        {organs.map((organ, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <div className="hover:bg-[#00204c] hover:text-white mx-[8px] text-gray-500 cursor-pointer transition duration-300 flex flex-col justify-center items-center border border-gray-400 bg-white shadow-md px-12 py-4 rounded-[14px]">
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
