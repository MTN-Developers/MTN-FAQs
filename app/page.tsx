"use client";

import { useState } from "react";
import AlphabetComp from "./components/AlphabetComp";
import ResultsComp from "./components/ResultsComp";
import SearchComp from "./components/SearchComp";
import SliderComp from "./components/SliderComp";

export default function Home() {
  const [selectedOrganFromSlider, setSelectedOrganFromSlider] =
    useState<string>("");

  return (
    <main className="flex flex-col items-center">
      <h1 className="md:pt-[60px] text-white text-center mt-10 text-[64px] md:text-8xl font-pnu font-bold leading-normal">
        الأذن الخارجية
      </h1>
      <div className="mx-auto md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px]">
        <SearchComp />
      </div>
      <div className="lg:w-[1280px] md:w-[700px] w-[310px] h-[320px] md:h-[200px] lg:h-[148px] mt-6 shrink-0 bg-white shadow-md rounded-[23px]">
        <AlphabetComp />
      </div>
      <div>
        <SliderComp
          onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
        />
      </div>
      <div className="w-full md:w-[650px] lg:w-[1280px] mt-6">
        <ResultsComp selectedOrgan={selectedOrganFromSlider} />
      </div>
    </main>
  );
}
