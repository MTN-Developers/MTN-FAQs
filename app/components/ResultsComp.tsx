"use client";

import React, { useState } from "react";
import { CourseFaq } from "../types";
import SingleResultComp from "./SingleResultComp";
import { ConfigProvider, Pagination } from "antd";
import { useAppSelector } from "../store/";

interface ResultsCompProps {
  searchTerm?: string;
  faqs: CourseFaq[];
  selectedOrgan?: string;
}

const ResultsComp: React.FC<ResultsCompProps> = ({
  searchTerm,
  faqs,
  selectedOrgan,
}) => {
  const selectedLetter = useAppSelector(
    (state) => state.alphabet.selectedLetter
  );

  const [currentPage, setCurrentPage] = useState(1);
  // const [filteredFaqs, setFilteredFaqs] = useState<CourseFaq[]>([]);

  console.log("inside component", faqs);

  // Utility function to remove Arabic diacritics
  // function removeArabicDiacritics(text: string): string {
  //   return text.replace(/[\u064B-\u0652]/g, "");
  // }

  // useEffect(() => {
  //   let filtered: CourseFaq[] = [...faqs];

  //   // Filter by selectedOrgan (assuming 'title' corresponds to organ)
  //   if (selectedOrgan) {
  //     const normalizedSelectedOrgan =
  //       removeArabicDiacritics(selectedOrgan).toLowerCase();
  //     filtered = filtered.filter((faq) =>
  //       removeArabicDiacritics(faq.title)
  //         .toLowerCase()
  //         .includes(normalizedSelectedOrgan)
  //     );
  //   }

  //   // // Filter by searchTerm
  //   // if (searchTerm && searchTerm.trim() !== "") {
  //   //   const normalizedSearchTerm =
  //   //     removeArabicDiacritics(searchTerm).toLowerCase();
  //   //   filtered = filtered.filter(
  //   //     (faq) =>
  //   //       removeArabicDiacritics(faq.title)
  //   //         .toLowerCase()
  //   //         .includes(normalizedSearchTerm) ||
  //   //       removeArabicDiacritics(faq.question)
  //   //         .toLowerCase()
  //   //         .includes(normalizedSearchTerm) ||
  //   //       removeArabicDiacritics(faq.answer)
  //   //         .toLowerCase()
  //   //         .includes(normalizedSearchTerm)
  //   //   );
  //   // }

  //   // Filter by selectedLetter (first letter of title)
  //   if (selectedLetter) {
  //     filtered = filtered.filter((faq) => {
  //       const title = faq.title.startsWith("ال")
  //         ? faq.title.slice(2)
  //         : faq.title;
  //       const firstLetter = removeArabicDiacritics(title[0]).toLowerCase();
  //       return firstLetter === selectedLetter.toLowerCase();
  //     });
  //   }

  //   setFilteredFaqs(filtered);
  //   setCurrentPage(1); // Reset to first page on new filter
  // }, [searchTerm, faqs, selectedOrgan, selectedLetter]);

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
