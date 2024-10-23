"use client";

import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setSelectedLetter } from "../store/slices/alphabetSlice";
import { useGetSearchResultByIndexQuery } from "../store/apiSlice";
import { CourseFaq } from "../types"; // Import the CourseFaq type

const alphabets = [
  "أ",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "ه",
  "و",
  "ي",
];

interface IProps {
  courseId: string;
  setFaqsData: React.Dispatch<React.SetStateAction<CourseFaq[]>>; // Updated type
  onSelectOrgan: (organ: string) => void;
}

const AlphabetComp: React.FC<IProps> = ({
  courseId,
  setFaqsData,
  onSelectOrgan,
}) => {
  const dispatch = useAppDispatch();
  const selectedLetter = useAppSelector(
    (state) => state.alphabet.selectedLetter
  );

  const { data: searchResults, refetch } = useGetSearchResultByIndexQuery(
    {
      courseId,
      index: selectedLetter,
    },
    {
      skip: !selectedLetter,
    }
  );

  const handleLetterClick = useCallback(
    (letter: string) => {
      dispatch(setSelectedLetter(letter));
      onSelectOrgan("");
    },
    [dispatch, onSelectOrgan]
  );

  React.useEffect(() => {
    if (selectedLetter) {
      refetch();
    }
  }, [selectedLetter, refetch]);

  React.useEffect(() => {
    if (searchResults) {
      setFaqsData(searchResults);
    }
  }, [searchResults, setFaqsData]);

  return (
    <div>
      <div
        dir="rtl"
        className="alphabets text-start md:text-center md:px-[90px] px-[32px] my-[30px]"
      >
        {alphabets.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`md:m-[6px] md:py-2 md:px-3 mb-4 md:text-[20px] text-2xl m-[1px] py-[4px] px-[9px] transition duration-300 font-pnu font-bold cursor-pointer rounded-sm hover:bg-[#609ae9] hover:text-white ${
              selectedLetter === letter
                ? "text-white bg-[#609ae9]"
                : "text-gray-600"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetComp;
