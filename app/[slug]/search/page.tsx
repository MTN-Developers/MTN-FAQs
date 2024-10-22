"use client";
import SearchComp from "@/app/components/SearchComp";
import SearchPageResultComp from "@/app/components/SearchPageResultComp";
import { useGetCourseMetaDataBySlugQuery } from "@/app/store/apiSlice";
import { CourseFaq } from "@/app/types";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import closeIcon from "@/app/assets/images/Close.svg";

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  // Handle potential array value for slug
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const query = searchParams.get("query") || "";

  const [originalFaqs, setOriginalFaqs] = useState<CourseFaq[]>([]);
  const [faqs, setFaqs] = useState<CourseFaq[]>([]);
  const [taps, setTaps] = useState<string[]>([]);
  const [selectedTap, setSelectedTap] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log("taps is ", taps);

  const {
    data: metaData,
    isLoading: isMetaLoading,
    error: metaError,
  } = useGetCourseMetaDataBySlugQuery(slug);

  const courseId = metaData?.id;

  const fetchFaqs = async () => {
    if (!courseId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/course_faqs/${courseId}/search?keyword=${encodeURIComponent(
          query
        )}?limit=10000`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOriginalFaqs(data);
      setFaqs(data);

      const uniqueTaps = Array.from(
        new Set(data.map((faq: CourseFaq) => faq.title))
      );
      setTaps(uniqueTaps);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching FAQs"
      );
      console.error("Error fetching FAQs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  //handlers
  const handleKeywordClick = (tap: string) => {
    // console.log("tap is ", tap);
    // Set selectedTaps to only the clicked tap
    setSelectedTap(tap);
    // Filter faqs accordingly
    const filteredFaqs = originalFaqs.filter(
      (faq: CourseFaq) => faq.title === tap
    );
    setFaqs(filteredFaqs);
  };

  const handleRemoveOrgan = (tap: string) => {
    const newSelectedTaps = taps.filter((t) => t !== tap);
    setTaps(newSelectedTaps);
    // setSelectedTaps(newSelectedTaps);

    if (newSelectedTaps.length === 0) {
      // No taps selected, show all originalFaqs
      setFaqs(originalFaqs);
    } else {
      // Filter faqs to include only those with titles in newSelectedTaps
      const filteredFaqs = originalFaqs.filter((faq) =>
        newSelectedTaps.includes(faq.title)
      );
      setFaqs(filteredFaqs);
    }
  };

  useEffect(() => {
    if (courseId && query) {
      fetchFaqs();
    }
  }, [courseId, query]);

  if (metaError || error) {
    return <div>Error: {error || "Failed to load course metadata"}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto mt-[115px] md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px]">
        <SearchComp />
      </div>
      <div className="mx-auto mt-[32px] lg:max-w-[1080px]">
        {taps.length > 0 ? (
          <ul className="w-full flex flex-wrap gap-4 items-center justify-center ">
            {taps.map((tap, index) => (
              <li
                key={index}
                className={`flex font-pnu text-[#6f6c8f] border border-[#d0d0d0] items-center gap-2 rounded-full px-3 py-2 ${
                  selectedTap === tap ? "bg-gray-100 text-white" : ""
                }`}
              >
                <button
                  onClick={() => handleKeywordClick(tap)}
                  className="flex items-center gap-2"
                >
                  <span className="pl-4 cursor-pointer font-bold">{tap}</span>
                </button>
                <Image
                  src={closeIcon}
                  alt="close"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent button's onClick
                    handleRemoveOrgan(tap);
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">لا توجد نتائج مطابقة للبحث.</p>
        )}
      </div>
      <h1 className="text-black text-right [font-feature-settings:'liga'_off,'clig'_off] font-pnu text-4xl lg:text-4xl font-bold leading-[160%] mt-4 w-full px-[18px]">
        نتائج البحث
      </h1>
      {isMetaLoading && <div>Loading...</div>}
      {isLoading && <div>Loading...</div>}
      {faqs.length > 0 ? (
        <SearchPageResultComp faqs={faqs} />
      ) : (
        <>
          <div
            dir="rtl"
            className="mx-auto flex items-center justify-center md:mb-[48px] md:w-[880px] bg-white shadow-lg rounded-xl md:min-h-[518px] md:px-[90px] md:py-[60px]"
          >
            <p className="text-2xl font-pnu font-bold text-gray-400">
              لا توجد نتائج مطابقة للبحث.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
