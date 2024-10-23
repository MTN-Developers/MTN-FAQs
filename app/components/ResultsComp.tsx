"use client";

import React, { useState } from "react";
import { CourseFaq } from "../types";
import SingleResultComp from "./SingleResultComp";
import { ConfigProvider, Pagination } from "antd";
import { useAppSelector } from "../store/";

interface ResultsCompProps {
  searchTerm?: string;
  faqs?: CourseFaq[]; // Make faqs optional
  selectedOrgan?: string;
}

const ResultsComp: React.FC<ResultsCompProps> = ({
  searchTerm,
  faqs = [],
  selectedOrgan,
}) => {
  const selectedLetter = useAppSelector(
    (state) => state.alphabet.selectedLetter
  );

  const [currentPage, setCurrentPage] = useState(1);

  // If no data to display, render nothing
  if (!searchTerm && !selectedLetter && !selectedOrgan && faqs.length === 0) {
    return null;
  }

  // Pagination logic
  const pageSize = 5; // Adjust as needed
  const total = faqs.length;
  const indexOfLastFaq = currentPage * pageSize;
  const indexOfFirstFaq = indexOfLastFaq - pageSize;
  const currentFaqs = faqs.slice(indexOfFirstFaq, indexOfLastFaq);

  // Custom item render function for pagination
  const itemRender = (
    page: number,
    type: string,
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return (
        <a className="relative flex text-black font-normal h-[34px] text-sm flex-col justify-center items-center gap-2.5 bg-white px-1 py-2.5 rounded-lg">
          Prev
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="relative text-black font-normal flex h-[34px] text-sm flex-col justify-center items-center gap-2.5 bg-white px-1 py-2.5 rounded-lg">
          Next
        </a>
      );
    }

    return originalElement;
  };

  return (
    <div className="faqs md:mt-[64px]">
      {faqs.length > 0 ? (
        <div>
          {currentFaqs.map((faq) => (
            <SingleResultComp key={faq.id} faq={faq} />
          ))}

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
