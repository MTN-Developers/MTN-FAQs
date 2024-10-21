"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ResultsComp from "../../components/ResultsComp";
import SearchComp from "../../components/SearchComp";
import Image from "next/image";
import closeIcon from "@/app/assets/images/Close.svg";
import {
  useGetCourseMetaDataBySlugQuery,
  useGetSearchResultQuery, // Use the search hook
} from "../../store/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { CourseFaq } from "../../types";

const SearchPage = () => {
  // Unconditionally call Hooks at the top
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [removedOrgans, setRemovedOrgans] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const params = useParams();
  const slug = params.slug;

  console.log(slug);

  const {
    isError: isMetaError,
    isLoading: isMetaLoading,
    data: metaData,
  } = useGetCourseMetaDataBySlugQuery(`${slug}`);

  const courseId = metaData?.id;

  console.log(courseId);

  // Fetch search results using the custom hook
  const {
    isError: isSearchError,
    isLoading: isSearchLoading,
    data: searchResults,
  } = useGetSearchResultQuery(
    courseId && query ? { courseId, keyword: query } : skipToken
  );

  console.log(searchResults);

  // Initialize state for filtered FAQs
  const [filteredFaqs, setFilteredFaqs] = useState<CourseFaq[]>([]);

  useEffect(() => {
    if (!searchResults) {
      setFilteredFaqs([]);
      return;
    }

    // Utility function to remove Arabic diacritics
    function removeArabicDiacritics(text: string): string {
      return text.replace(/[\u064B-\u0652]/g, "");
    }

    let filtered = searchResults;

    if (selectedOrgan) {
      const normalizedSelectedOrgan =
        removeArabicDiacritics(selectedOrgan).toLowerCase();
      filtered = filtered.filter((faq) =>
        removeArabicDiacritics(faq.title)
          .toLowerCase()
          .includes(normalizedSelectedOrgan)
      );
    }

    if (removedOrgans.length > 0) {
      filtered = filtered.filter((faq) => !removedOrgans.includes(faq.title));
    }

    setFilteredFaqs(filtered);
  }, [searchResults, selectedOrgan, removedOrgans]);

  // Handle loading and error states
  if (isMetaLoading || isSearchLoading) return <div>Loading...</div>;
  if (isMetaError || isSearchError) return <div>Error loading data.</div>;
  if (!courseId) return <div>No course metadata found.</div>;
  if (!searchResults) return <div>No FAQs found.</div>;

  // Extract unique organ names from filteredFaqs, excluding removed organs
  // const RelatedOrgans = Array.from(
  //   new Set(
  //     filteredFaqs
  //       .map((faq) => faq.title) // Assuming 'title' corresponds to organ
  //       .filter((organ) => !removedOrgans.includes(organ))
  //   )
  // );

  // Function to handle removing an organ
  const handleRemoveOrgan = (organ: string) => {
    setRemovedOrgans((prev) => [...prev, organ]);

    // If the removed organ was selected, reset the selectedOrgan state
    if (selectedOrgan === organ) {
      setSelectedOrgan(null);
    }
  };

  return (
    <div className="w-full lg:px-[68px]">
      {/* Search Component */}
      <div className="mx-auto mt-[115px] md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px]">
        <SearchComp />
      </div>

      {/* Related Organs Filters */}
      <div className="mx-auto mt-[32px] lg:max-w-[1080px]">
        {searchResults.length > 0 ? (
          <ul className="w-full flex flex-wrap gap-4 items-center justify-center ">
            {searchResults.map((result) => (
              <li
                key={result.id}
                className={`flex font-pnu text-[#6f6c8f] border border-[#d0d0d0] items-center gap-2 rounded-full px-3 py-2 ${
                  selectedOrgan === result.title ? "bg-gray-100 text-white" : ""
                }`}
              >
                <button
                  onClick={() => {
                    if (selectedOrgan === result.title) {
                      setSelectedOrgan(null);
                    } else {
                      setSelectedOrgan(result.title);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="pl-4 cursor-pointer font-bold">
                    {result.title}
                  </span>
                </button>
                <Image
                  src={closeIcon}
                  alt="close"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent button's onClick
                    handleRemoveOrgan(result.title);
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">لا توجد نتائج مطابقة للبحث.</p>
        )}
      </div>

      {/* Search Results Header */}
      <h1 className="text-black text-right [font-feature-settings:'liga'_off,'clig'_off] font-pnu text-4xl lg:text-4xl font-bold leading-[160%] mt-4 w-full px-[18px]">
        نتائج البحث
      </h1>

      {/* Results Component */}
      <ResultsComp faqs={searchResults} selectedOrgan={selectedOrgan!} />
    </div>
  );
};

export default SearchPage;
