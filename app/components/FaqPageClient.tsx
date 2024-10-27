"use client"; // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import SearchComp from "./SearchComp";
import AlphabetComp from "./AlphabetComp";
import SliderComp from "./SliderComp";
import ResultsComp from "./ResultsComp";
import { CourseFaq, CourseMetaData } from "../types";
import Header from "./Header";
import Loader from "./ui/Loader";
import { useRouter } from "next/navigation";

const FaqPageClient = ({ slug }: { slug: string }) => {
  const [globalFaqsData, setGlobalFaqsData] = useState<CourseFaq[]>([]);
  const [faqsData, setFaqsData] = useState<CourseFaq[]>([]);
  const [isLoadingFaqsData, setIsLoadingFaqsData] = useState(true);
  const [isLoadingCourseMetaData, setIsLoadingCourseMetadata] = useState(true);
  const [courseMetaData, setCourseMetaData] = useState<CourseMetaData>();
  const [selectedOrganFromSlider, setSelectedOrganFromSlider] =
    useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const fetchCourseMetaData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/course_meta_data/slug/${slug}`
        );

        if (!response.ok) {
          // REDIRECT: If the course ID is not found, redirect to 404 page
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCourseMetaData(data);
      } catch (err) {
        console.error("Error fetching course metadata:", err);
        router.push("/404");
      } finally {
        setIsLoadingCourseMetadata(false);
      }
    };

    if (slug) {
      fetchCourseMetaData();
    }
  }, [router, slug]);

  // Fetch the FAQs when the Course ID is available
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/course_faqs/${courseMetaData?.id}?limit=10000`
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
        router.push("/404");
      } finally {
        setIsLoadingFaqsData(false);
      }
    };

    if (courseMetaData && courseMetaData.id) {
      fetchFaqs();
    }
  }, [courseMetaData, router]);

  return (
    <>
      {courseMetaData ? (
        <>
          <Header logo={courseMetaData.course_logo} />
          <main className="flex flex-col items-center container mx-auto px-4 py-8">
            {selectedOrganFromSlider !== "" && (
              <h1 className="md:pt-[5px] text-white text-center mt-2 text-[30px] md:text-6xl font-pnu font-bold !leading-snug">
                {selectedOrganFromSlider}
              </h1>
            )}

            <div
              className={`mx-auto md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px] ${
                selectedOrganFromSlider === "" ? "mt-[115px] md:mt-[20px]" : ""
              }`}
            >
              <SearchComp />
            </div>
            <div className="lg:w-[1280px] md:w-[700px] w-[310px] h-[320px] md:h-[200px] lg:h-[148px] mt-6 shrink-0 bg-white shadow-md rounded-[23px]">
              <AlphabetComp
                courseId={courseMetaData.id}
                setFaqsData={setFaqsData}
                onSelectOrgan={(organ) => setSelectedOrganFromSlider(organ)}
              />
            </div>
            <div>
              <SliderComp
                globalFaqs={globalFaqsData}
                selectedOrganFromSlider={selectedOrganFromSlider}
                courseId={courseMetaData.id}
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
        </>
      ) : isLoadingCourseMetaData || isLoadingFaqsData ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-2xl font-pnu font-bold text-gray-400">
            لا توجد نتائج مطابقة للبحث.
          </p>
        </div>
      )}
    </>
  );
};

export default FaqPageClient;
