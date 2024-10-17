"use client";

import Image from "next/image";
import React from "react";
import instagram from "@/app/assets/images/instagram.svg";
import Youtube from "@/app/assets/images/youtube.svg";
import X from "@/app/assets/images/new-twitter.svg";
import Facebook from "@/app/assets/images/facebook.svg";

const Footer = () => {
  return (
    <div className="w-full bg-[#e6e6e6] h-[80px] pt-4 mt-[160px] md:bg-none lg:mt-[230px] lg:h-[155px] border-t flex flex-col items-center justify-between lg:pt-[40px]">
      <div className="flex items-center gap-16 lg:gap-[88px]">
        <div className="flex gap-3 items-center justify-center cursor-pointer">
          <Image src={instagram} alt="Instagram" width={24} height={24} />
          <span className="hidden md:block text-black  text-lg font-medium leading-5 tracking-[0.21px]">
            Company
          </span>
        </div>
        <div className="flex gap-3 items-center justify-center cursor-pointer">
          <Image src={Youtube} alt="Youtube" width={24} height={24} />
          <span className="hidden md:block text-black  text-lg font-medium leading-5 tracking-[0.21px]">
            Youtube
          </span>
        </div>
        <div className="flex gap-3 items-center justify-center cursor-pointer">
          <Image src={X} alt="X" />
          <span className="hidden md:block text-black  text-lg font-medium leading-5 tracking-[0.21px]">
            X
          </span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <Image src={Facebook} alt="Facebook" />
          <span className="hidden md:block text-black  text-lg font-medium leading-5 tracking-[0.21px]">
            Facebook
          </span>
        </div>
      </div>
      <p className="text-black text-center mt-4 text-sm font-medium leading-[25px] tracking-[-0.14px] opacity-70">
        © 2024 All Rights Reserved - Mange The Now
      </p>
    </div>
  );
};

export default Footer;
