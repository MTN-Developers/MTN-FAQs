"use client";

import React from "react";

interface SingleResultCompProps {
  organ: string;
}

const SingleResultComp: React.FC<SingleResultCompProps> = ({ organ }) => {
  return (
    <div
      dir="rtl"
      className="mx-auto mb-4 md:mb-[48px] md:w-[680px] lg:w-[880px] bg-white shadow-lg rounded-xl h-[440px] w-[310px] md:min-h-[518px] px-6 py-10 md:px-[90px] md:py-[60px]"
    >
      <h1 className=" md:mb-[56px] text-black text-right [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-[40px] md:text-[40px] font-bold leading-7">
        {organ}
      </h1>

      <div className="border-b">
        <h2 className="text-[#00204C] text-right [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-2xl font-bold leading-7">
          - الأعراض:
        </h2>

        <p className="md:pb-[40px] flex-[1_0_0]  text-[color:var(--Neutral-600,#6F6C90)] text-right [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-lg font-normal leading-[30px]">
          جلد الأذن جاف ومتقشر،الإفراط في إنتاج شمع الأذن ، حكة ،طفح جلدي مع
          التهاب واحمرار، Swimmer’s ear
        </p>
      </div>
      <div className="md:mt-[56px]">
        <h2 className="text-[#00204C] text-right [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-2xl font-bold leading-7">
          - المشاعر المضطربة :
        </h2>

        <p className="md:pb-[40px] flex-[1_0_0]  text-[color:var(--Neutral-600,#6F6C90)] text-right [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-lg font-normal leading-[30px]">
          افتقاد لمسة على أذني (صوت) / هسد وداني علشان مسمعش كلام (قذر) يضايقني
          / افتقاد لصوت تركني 
        </p>
      </div>
    </div>
  );
};

export default SingleResultComp;
