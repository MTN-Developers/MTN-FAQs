"use client";

import React, { useState } from "react";
import { Input } from "antd";
import { useParams, useRouter } from "next/navigation";

const { Search } = Input;

const SearchComp = () => {
  const params = useParams();
  const slug = params.slug;

  // console.log(typeof slug);

  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const onSearch = (value: string) => {
    if (value.trim() !== "") {
      if (slug) {
        router.push(`/${slug}/search?query=${encodeURIComponent(value)}`);
      } else {
        router.push(`/${slug}/search?query=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <div className="h-full w-full flex">
      <Search
        placeholder="ابحث هنا" // "Search here" in Arabic
        allowClear
        onSearch={onSearch}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="flex-grow h-full"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default SearchComp;
