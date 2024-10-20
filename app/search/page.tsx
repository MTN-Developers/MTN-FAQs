"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ResultsComp from "../components/ResultsComp";
import SearchComp from "../components/SearchComp";
import { organsData } from "../data/organsData";
import Image from "next/image";
import closeIcon from "@/app/assets/images/Close.svg";

const SearchPage = () => {
  const [selectedOrgan, setSelectedOrgan] = useState<string | null>(null);
  const [removedOrgans, setRemovedOrgans] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Filter organsData based on the search term
  const [filteredOrgans, setFilteredOrgans] = useState(organsData);

  useEffect(() => {
    // Utility function to remove Arabic diacritics
    function removeArabicDiacritics(text: string): string {
      return text.replace(/[\u064B-\u0652]/g, "");
    }

    const normalizedSearchTerm = removeArabicDiacritics(query).toLowerCase();

    const filtered = organsData.filter((item) => {
      const organName = removeArabicDiacritics(item.organ).toLowerCase();
      const symptoms = removeArabicDiacritics(item.symptoms).toLowerCase();
      const emotions = removeArabicDiacritics(item.emotions).toLowerCase();
      const diseases = item.diseases.map((disease) =>
        removeArabicDiacritics(disease).toLowerCase()
      );

      return (
        (organName.includes(normalizedSearchTerm) ||
          symptoms.includes(normalizedSearchTerm) ||
          emotions.includes(normalizedSearchTerm) ||
          diseases.some((disease) => disease.includes(normalizedSearchTerm))) &&
        !removedOrgans.includes(item.organ) // Exclude removed organs
      );
    });

    setFilteredOrgans(filtered);
    setSelectedOrgan(null); // Reset selected organ when search term changes
  }, [query, removedOrgans]);

  // Extract organ names from filteredOrgans, excluding removed organs
  const RelatedOrgans = Array.from(
    new Set(
      filteredOrgans
        .map((item) => item.organ)
        .filter((organ) => !removedOrgans.includes(organ))
    )
  );

  // Filter the results if a specific organ is selected, excluding removed organs
  const displayedOrgans = selectedOrgan
    ? filteredOrgans.filter((organ) => organ.organ === selectedOrgan)
    : filteredOrgans;

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
      <div className="mx-auto mt-[115px] md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px]">
        <SearchComp />
      </div>
      <div className="mx-auto mt-[32px] lg:max-w-[1080px]">
        {RelatedOrgans.length > 0 ? (
          <ul className="w-full flex flex-wrap gap-4 items-center justify-center ">
            {RelatedOrgans.map((organ) => (
              <li
                key={organ}
                className={`flex [font-family:PNU] text-[#6f6c8f] border border-[#d0d0d0] items-center gap-2 rounded-full px-3 py-2 ${
                  selectedOrgan === organ ? "bg-gray-100 text-white" : ""
                }`}
              >
                <button
                  onClick={() => {
                    if (selectedOrgan === organ) {
                      setSelectedOrgan(null);
                    } else {
                      setSelectedOrgan(organ);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="pl-4 cursor-pointer font-bold">{organ}</span>
                </button>
                <Image
                  src={closeIcon}
                  alt="close"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the parent button's onClick
                    handleRemoveOrgan(organ);
                  }}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">لا توجد نتائج مطابقة للبحث.</p>
        )}
      </div>
      <h1 className="text-black text-right [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-4xl lg:text-4xl font-bold leading-[160%] mt-4 w-full px-[18px]">
        نتائج البحث
      </h1>

      <ResultsComp organs={displayedOrgans} />
    </div>
  );
};

export default SearchPage;
