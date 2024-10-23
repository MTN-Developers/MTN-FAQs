"use client";

import React from "react";
import { CourseFaq } from "../types";
import { RenderHTML } from "./RenderHTML";

interface SingleResultCompProps {
  faq: CourseFaq;
}

const SingleResultComp: React.FC<SingleResultCompProps> = ({ faq }) => {
  // console.log("from single result comp", faq);

  const { title, question, answer } = faq;
  // console.log("obj", { title, question, answer });

  return (
    <div
      dir="rtl"
      className="mx-auto mb-4 md:mb-[48px] md:w-[680px] lg:w-[880px] bg-white shadow-lg rounded-xl h-auto w-[310px] md:min-h-[518px] px-6 py-10 md:px-[90px] md:py-[60px]"
    >
      <h1 className="md:mb-[56px] text-black text-right font-pnu text-[40px] md:text-[40px] font-bold leading-7">
        {title}
      </h1>

      <div className="border-b">
        <h2 className="text-[#00204C] text-right font-pnu text-2xl font-bold leading-7">
          - الأعراض:
        </h2>

        <p className="md:pb-[40px] text-gray-600 text-right font-pnu text-lg font-normal leading-[30px]">
          {question}
        </p>
      </div>
      <div className="md:mt-[56px]">
        <h2 className="text-[#00204C] text-right font-pnu text-2xl font-bold leading-7">
          - المشاعر المضطربة:
        </h2>

        <p className="md:pb-[40px] text-gray-600 text-right font-pnu text-lg font-normal leading-[30px]">
          <RenderHTML htmlContent={answer} />
        </p>
      </div>
    </div>
  );
};

export default SingleResultComp;
