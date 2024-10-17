"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "../store";
import SingleResultComp from "./SingleResultComp";
import { Pagination, ConfigProvider } from "antd";

const organs = [
  "المعدة",
  "الامعاء",
  "الرئة",
  "القلب",
  "الكبد",
  "الطحال",
  "الدماغ",
  "العين",
  "الاذن",
  "الاذن الداخلية",
  "الاذن الخارجية",
  "الاذن الوسطي",
  "الانف",
  "اللسان",
  "الكلية",
  "البنكرياس",
  "الحلق",
  "الحنجرة",
  "الأسنان",
  "الشعر",
  "الجلد",
  "العضلات",
  "العظام",
];

const ResultsComp = () => {
  const selectedLetter = useAppSelector(
    (state) => state.alphabet.selectedLetter
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default to 1 for large screens

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 768) {
        // Mobile screen (e.g., width less than 768px)
        setPageSize(3);
      } else {
        // Larger screens
        setPageSize(5);
      }
    };

    // Initial check
    updatePageSize();

    // Add event listener
    window.addEventListener("resize", updatePageSize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  // Filter organs that start with the selected letter after removing "ال" if it exists
  const filteredOrgans = organs.filter((organ) => {
    const organWithoutAl = organ.startsWith("ال") ? organ.slice(2) : organ;
    const firstLetter = organWithoutAl[0];
    return firstLetter === selectedLetter;
  });

  if (!selectedLetter) {
    return null; // Render nothing if no letter is selected
  }

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
          {currentOrgans.map((organ) => (
            <SingleResultComp key={organ} organ={organ} />
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
            لا توجد أعضاء تبدأ بهذا الحرف.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsComp;
