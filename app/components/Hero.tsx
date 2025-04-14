"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/images/tamahy-logo.svg";
import backVideo from "../../public/videos/backVid.mp4";
import playerIcon from "@/public/images/playIcon.svg";
import { VscChromeClose } from "react-icons/vsc";

// import { Modal } from "antd";

const Hero = ({ paymentLink }: { paymentLink: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      dir="rtl"
      className="relative font-pnu lg:w-[1280px] w-full rounded-lg top-[100px] mx-auto  flex flex-col lg:justify-end lg:items-start justify-center items-center p-8 lg:p-[80px] overflow-hidden mb-[60px] md:mb-[90px]"
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={backVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-l from-[#d8b984] via-[#d8b984da] to-transparent"></div>

      {/* Overlay Content */}
      <div className="relative z-20 flex flex-col lg:items-start items-center   ">
        <Image src={logo} alt="logo" className="mb-6 w-[100px] lg:w-auto" />
        <p className=" text-white text-center mb-4  text-2xl lg:text-4xl font-normal leading-[139%] left-[385px] top-[454px]">
          برنامج التماهي الأساسي{" "}
        </p>
        <p className=" text-white max-w-[540px] text-center lg:text-start mb-10  text-lg lg:text-xl font-normal leading-[139%] left-[385px] top-[454px]">
          التماهي ليس مجرد فكرة، بل تجربة. تجربة تعيشها في كل خلية، في كل ذكرى
          دفنتها، وفي كل شعور لم تسمح له بالخروج هنا، في هذا البرنامج، نمنحك
          المساحة لترى، لتشعر، لتفهم… ولتعود إلى ذاتك{" "}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={paymentLink}
            className="bg-[#c9a885] border-2 border-[#fff] text-white w-[150px] lg:w-[200px] rounded-md h-[50px] text-base lg:text-2xl flex items-center justify-center "
          >
            اشترك الان
          </a>

          <button
            onClick={showModal}
            className="bg-transparent border-2 border-[#fff] text-[#fff] w-[150px] text-nowrap lg:w-[200px] rounded-md h-[50px] lg:text-xl text-base flex items-center gap-1 lg:gap-4 justify-center "
          >
            <Image src={playerIcon} alt="play" />
            <span>مشاهده الفيديو</span>{" "}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="fixed top-0 flex items-center justify-center left-0 w-full h-full bg-black bg-opacity-90 z-[999]">
            <div className="relative w-full  h-full flex justify-center items-center">
              <div
                className="absolute top-20 right-10 cursor-pointer  "
                onClick={handleCancel}
              >
                <VscChromeClose className="text-white text-2xl" />
              </div>
              <video
                controls
                autoPlay
                loop
                playsInline
                className="lg:w-[70vw] w-[90vw] lg:h-[70vh] rounded-md"
                onClick={(e) => e.stopPropagation()} // Prevent click propagation
              >
                <source src={backVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;

/* 


<Modal
       
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
        centered
        bodyStyle={{ padding: 20, background: "transparent" }}
      >
        <div
          className="w-full h-full flex justify-center items-center"
          onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
        >
          <video
            controls
            autoPlay
            loop
            playsInline
            className="w-full max-h-[80vh] rounded-md"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation
          >
            <source src={backVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>



*/
