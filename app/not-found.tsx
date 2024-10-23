"use client";
import React from "react";
import notFoundBanner from "@/app/assets/images/notFound.svg";
import starsOverlay from "@/app/assets/images/stars.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="relative mt-10 w-full h-[400px] overflow-hidden">
      <Image
        src={notFoundBanner}
        alt="Not Found"
        fill
        style={{ objectFit: "contain", zIndex: 1 }}
      />
      <Image
        src={starsOverlay}
        alt="Stars Overlay"
        fill
        style={{ objectFit: "cover" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <p className="text-4xl font-bold">OOPS!</p>
        <p className="text-2xl mt-2">Page not found</p>
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            GO HOME
          </button>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
          >
            GO BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
