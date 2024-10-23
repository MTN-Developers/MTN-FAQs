import React from "react";
import { CourseFaq } from "../types";
import SingleResultComp from "./SingleResultComp";
// import Loader from "./ui/Loader";

interface IProps {
  faqs: CourseFaq[];
  // isLoading: boolean;
}

const SearchPageResultComp = ({ faqs }: IProps) => {
  // if (isLoading) {
  //   return <Loader />;
  // }
  return (
    <>
      {faqs.map((faq) => (
        <SingleResultComp key={faq.id} faq={faq} />
      ))}
    </>
  );
};

export default SearchPageResultComp;
