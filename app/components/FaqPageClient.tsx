"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import SearchComp from "./SearchComp";
import AlphabetComp from "./AlphabetComp";
import SliderComp from "./SliderComp";
import ResultsComp from "./ResultsComp";
import { CourseFaq } from "../types";

const FaqPageClient = ({
  courseId,
  faqsData: initialFaqsData,
}: {
  slug: string;
  courseId: string;
  faqsData: CourseFaq[];
}) => {
  const [faqsData, setFaqsData] = useState<CourseFaq[]>(initialFaqsData);
  const [selectedOrganFromSlider, setSelectedOrganFromSlider] =
    useState<string>("");

  return (
    <main className="flex flex-col items-center container mx-auto px-4 pb-8">
      {selectedOrganFromSlider !== "" && (
        <h1 className="md:pt-[5px] text-white text-center mt-2 text-[30px] md:text-6xl font-pnu font-bold !leading-snug">
          {selectedOrganFromSlider}
        </h1>
      )}

      <div
        className={`mx-auto mt-2 md:mt-[20px] md:mb-[50px] md:w-[520px] w-[300px] ${
          selectedOrganFromSlider === "" ? "mt-[115px] md:mt-[20px]" : ""
        }`}
      >
        <SearchComp />
      </div>
      <div className="lg:w-[1280px] md:w-[700px] w-[310px] h-[320px] md:h-[200px] lg:h-[148px] mt-6 shrink-0 bg-white shadow-md rounded-[23px]">
        <AlphabetComp
          courseId={courseId}
          setFaqsData={setFaqsData}
          onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
        />
      </div>
      <div>
        <SliderComp
          globalFaqs={initialFaqsData}
          selectedOrganFromSlider={selectedOrganFromSlider}
          courseId={courseId}
          setFaqsData={setFaqsData}
          onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
        />
      </div>
      <div className="w-full md:w-[650px] lg:w-[1280px] mt-6">
        {faqsData.length > 0 ? (
          <ResultsComp
            faqs={faqsData}
            selectedOrgan={selectedOrganFromSlider}
          />
        ) : (
          <div
            dir="rtl"
            className="mx-auto flex items-center justify-center md:mb-[48px] md:w-[880px] bg-white shadow-lg rounded-xl md:min-h-[518px] md:px-[90px] md:py-[60px]"
          >
            <p className="text-2xl font-pnu font-bold text-gray-400">
              لا توجد نتائج مطابقة للبحث.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default FaqPageClient;
