"use client";

import React from "react";
import { Input } from "antd";
import { useAppDispatch, useAppSelector } from "../store";
import { setSearchTerm } from "../store/slices/searchSlice";

const { Search } = Input;

const SearchComp = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.search.searchTerm);

  const onSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <div className="h-full w-full flex">
      <Search
        placeholder="Search Here"
        allowClear
        onSearch={onSearch}
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-grow h-full"
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default SearchComp;
