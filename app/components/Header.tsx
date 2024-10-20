import React from "react";
import logo from "@/app/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full">
      <Link href={"/"}>
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={70}
          className="md:pt-[100px] mx-auto mt-10"
        />
      </Link>
    </div>
  );
};

export default Header;
