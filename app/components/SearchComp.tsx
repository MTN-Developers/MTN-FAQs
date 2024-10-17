"use client";

import React, { useState } from "react";
import { Input } from "antd";
import { useRouter } from "next/navigation";

const { Search } = Input;

const SearchComp = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const onSearch = (value: string) => {
    if (value.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(value)}`);
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
