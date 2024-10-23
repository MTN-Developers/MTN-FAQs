"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchComp from "../components/SearchComp";
import AlphabetComp from "../components/AlphabetComp";
import SliderComp from "../components/SliderComp";
import ResultsComp from "../components/ResultsComp";
import { CourseFaq } from "../types";
import Loader from "../components/ui/Loader";

const Page = () => {
  const [globalFaqsData, setGlobalFaqsData] = useState<CourseFaq[]>([]);
  const [faqsData, setFaqsData] = useState<CourseFaq[]>([]);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [isLoadingCourseId, setIsLoadingCourseId] = useState(true);
  const [isLoadingFaqsData, setIsLoadingFaqsData] = useState(true);
  const [selectedOrganFromSlider, setSelectedOrganFromSlider] =
    useState<string>("");
  const params = useParams();
  let slug = params.slug;

  // Ensure slug is a string
  if (Array.isArray(slug)) {
    slug = slug[0];
  }

  // Fetch the Course ID when the component mounts
  useEffect(() => {
    const getCourseId = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/course_meta_data/slug/${slug}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourseId(data.id);
      } catch (err) {
        console.error("Error fetching course ID:", err);
      } finally {
        setIsLoadingCourseId(false);
      }
    };

    if (slug) {
      getCourseId();
    }
  }, [slug]);

  // Fetch the FAQs when the Course ID is available
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/course_faqs/${courseId}?limit=10000`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const items: CourseFaq[] = data.items || [];
        setGlobalFaqsData(items);
        setFaqsData(items);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        setIsLoadingFaqsData(false);
      }
    };

    if (courseId) {
      fetchFaqs();
    }
  }, [courseId]);

  // Handle cases where slug or data is not available
  if (!slug) {
    return <div>No slug provided</div>;
  }

  if (isLoadingCourseId || isLoadingFaqsData) {
    return <Loader />;
  }

  if (!courseId) {
    return <div>No course ID found.</div>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="md:pt-[60px] text-white text-center mt-10 text-[64px] md:text-8xl font-pnu font-bold leading-normal">
        {selectedOrganFromSlider}
      </h1>
      <div className="mx-auto md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px]">
        <SearchComp />
      </div>
      {!isLoadingCourseId && courseId && (
        <>
          <div className="lg:w-[1280px] md:w-[700px] w-[310px] h-[320px] md:h-[200px] lg:h-[148px] mt-6 shrink-0 bg-white shadow-md rounded-[23px]">
            <AlphabetComp
              courseId={courseId}
              setFaqsData={setFaqsData}
              onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
            />
          </div>
          <div>
            <SliderComp
              globalFaqs={globalFaqsData}
              selectedOrganFromSlider={selectedOrganFromSlider}
              courseId={courseId}
              setFaqsData={setFaqsData}
              onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
            />
          </div>
        </>
      )}
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

export default Page;
