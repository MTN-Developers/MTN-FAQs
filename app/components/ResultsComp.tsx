"use client";

import React, { useState, useEffect } from "react";
import { OrganData } from "../data/organsData";
import { useAppSelector } from "../store";
import SingleResultComp from "./SingleResultComp";
import { ConfigProvider, Pagination } from "antd";

interface ResultsCompProps {
  searchTerm?: string;
}

const ResultsComp: React.FC<ResultsCompProps> = ({ searchTerm }) => {
  const organsData = useAppSelector((state) => state.organs.data);
  const selectedLetter = useAppSelector(
    (state) => state.alphabet.selectedLetter
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredOrgans, setFilteredOrgans] = useState<OrganData[]>([]);

  useEffect(() => {
    let filtered: OrganData[] = [];

    if (searchTerm && searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      filtered = organsData.filter((organData) => {
        const organName = organData.organ.toLowerCase();
        const diseases = organData.diseases.map((disease) =>
          disease.toLowerCase()
        );

        return (
          organName.includes(lowerCaseSearchTerm) ||
          diseases.some((disease) => disease.includes(lowerCaseSearchTerm))
        );
      });
    } else if (selectedLetter) {
      filtered = organsData.filter((organData) => {
        const organName = organData.organ.startsWith("ال")
          ? organData.organ.slice(2)
          : organData.organ;
        const firstLetter = organName[0];

        return firstLetter === selectedLetter;
      });
    }

    setFilteredOrgans(filtered);
    setCurrentPage(1); // Reset to first page on new search or letter selection
  }, [searchTerm, organsData, selectedLetter]);

  // If no search term and no letter is selected, render nothing
  if (!searchTerm && !selectedLetter) {
    return null;
  }

  // Pagination logic
  const pageSize = 5; // Adjust as needed
  const total = filteredOrgans.length;
  const indexOfLastOrgan = currentPage * pageSize;
  const indexOfFirstOrgan = indexOfLastOrgan - pageSize;
  const currentOrgans = filteredOrgans.slice(
    indexOfFirstOrgan,
    indexOfLastOrgan
  );

  // Custom item render function for pagination
  const itemRender = (
    page: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return (
        <a className="relative bottom-1 flex text-black font-normal h-[34px] text-sm flex-col justify-center items-center gap-2.5 bg-white px-1 py-2.5 rounded-lg">
          Prev
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="relative bottom-1 text-black font-normal flex h-[34px] text-sm flex-col justify-center items-center gap-2.5 bg-white px-1 py-2.5 rounded-lg">
          Next
        </a>
      );
    }

    return originalElement;
  };

  return (
    <div className="organs md:mt-[64px]">
      {filteredOrgans.length > 0 ? (
        <div>
          {currentOrgans.map((organData) => (
            <SingleResultComp key={organData.organ} organData={organData} />
          ))}

          {/* Pagination Component */}
          {/* Pagination Component */}
          <div className="flex justify-center mt-4" dir="ltr">
            <ConfigProvider
              theme={{
                components: {
                  Pagination: {
                    itemActiveBg: "#00204c",
                    itemSize: 34,
                  },
                },
              }}
            >
              <Pagination
                current={currentPage}
                total={total}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                showQuickJumper={false}
                hideOnSinglePage={true}
                itemRender={itemRender}
              />
            </ConfigProvider>
          </div>
        </div>
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
  );
};

export default ResultsComp;
