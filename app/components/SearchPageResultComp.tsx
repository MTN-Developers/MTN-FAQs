import React from "react";
import { CourseFaq } from "../types";
import SingleResultComp from "./SingleResultComp";

interface IProps {
  faqs: CourseFaq[];
}

const SearchPageResultComp = ({ faqs }: IProps) => {
  return (
    <>
      {faqs.map((faq) => (
        <SingleResultComp key={faq.id} faq={faq} />
      ))}
    </>
  );
};

export default SearchPageResultComp;
