"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ResultsComp from "../components/ResultsComp";
import SearchComp from "../components/SearchComp";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <div className="w-full lg:px-[68px]">
      <div className="mx-auto md:mt-[20px] md:mb-[50px] md:w-[520px] w-[310px]">
        <SearchComp />
      </div>
      <h1 className=" text-black text-right [font-feature-settings:'liga'_off,'clig'_off] [font-family:PNU] text-5xl font-bold leading-[160%] ">
        نتائج البحث
      </h1>
      <ResultsComp searchTerm={query} />
    </div>
  );
};

export default SearchPage;
