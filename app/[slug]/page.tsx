"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import {
  useGetCourseFaqsQuery,
  useGetCourseMetaDataBySlugQuery,
} from "../store/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import SearchComp from "../components/SearchComp";
import AlphabetComp from "../components/AlphabetComp";
import SliderComp from "../components/SliderComp";
import ResultsComp from "../components/ResultsComp";

const Page = () => {
  const [selectedOrganFromSlider, setSelectedOrganFromSlider] =
    useState<string>("");
  const params = useParams();
  let slug = params.slug;

  // Ensure slug is a string
  if (Array.isArray(slug)) {
    slug = slug[0]; // Take the first element, or handle as needed
  }

  // Call the hooks unconditionally
  const {
    isError: isMetaError,
    isLoading: isMetaLoading,
    data: metaData,
  } = useGetCourseMetaDataBySlugQuery(slug ?? skipToken);

  const courseId = metaData?.id;

  const {
    isError: isFaqsError,
    isLoading: isFaqsLoading,
    data: faqs,
  } = useGetCourseFaqsQuery(courseId ?? skipToken);

  const [faqsData, setFaqsData] = useState(faqs);
  // Handle loading and error states
  if (isMetaLoading || isFaqsLoading) return <div>Loading...</div>;
  if (isMetaError || isFaqsError) return <div>Error</div>;

  // Handle cases where slug or data is not available
  if (!slug) {
    return <div>No slug provided</div>;
  }
  if (!metaData) {
    return <div>No course metadata found.</div>;
  }
  if (!faqs) {
    return <div>No FAQs found.</div>;
  }

  console.log(metaData);
  console.log(faqs);

  return (
    <main className="flex flex-col items-center">
      <h1 className="md:pt-[60px] text-white text-center mt-10 text-[64px] md:text-8xl font-pnu font-bold leading-normal">
        {selectedOrganFromSlider}
      </h1>
      <div className="mx-auto md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px]">
        <SearchComp />
        {/* Pass onSearch prop */}
      </div>
      <div className="lg:w-[1280px] md:w-[700px] w-[310px] h-[320px] md:h-[200px] lg:h-[148px] mt-6 shrink-0 bg-white shadow-md rounded-[23px]">
        <AlphabetComp
          courseId={courseId!}
          setFaqsData={setFaqsData}
          onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
        />
      </div>
      <div>
        <SliderComp
          faqs={faqs}
          selectedOrganFromSlider={selectedOrganFromSlider}
          courseId={courseId!}
          setFaqsData={setFaqsData}
          onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
        />
      </div>
      <div className="w-full md:w-[650px] lg:w-[1280px] mt-6">
        <ResultsComp
          faqs={faqsData || faqs}
          selectedOrgan={selectedOrganFromSlider}
        />
      </div>
    </main>
  );
};

export default Page;
