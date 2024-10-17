"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setSelectedLetter } from "../store/slices/alphabetSlice";

const alphabets = [
  "ا",
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

const AlphabetComp = () => {
  const dispatch = useAppDispatch();
  const selectedLetter = useAppSelector(
    (state) => state.alphabet.selectedLetter
  );

  const handleLetterClick = (letter: string) => {
    dispatch(setSelectedLetter(letter));
  };

  return (
    <div>
      <div dir="rtl" className="alphabets text-center md:px-[90px]">
        {alphabets.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`md:m-[6px] md:py-2 md:px-3 md:text-[20px] m-[1px] py-[4px] px-[9px] font-pnu font-bold cursor-pointer rounded-sm hover:bg-[#609ae9] hover:text-white ${
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
