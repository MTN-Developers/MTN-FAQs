"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

const Header = ({ logo }: { logo: string }) => {
  const params = useParams();
  const slug = params.slug;

  return (
    <div className="w-full ">
      <a href={`/${slug}`}>
        <Image
          src={logo}
          alt="logo"
          width={155}
          height={155}
          objectFit="contain"
          quality={100}
          className="md:pt-[120px] lg:w-[155px] w-[100px] mt-10 object-contain   mx-auto  cursor-pointer"
        />
      </a>
    </div>
  );
};

export default Header;
