import Image from "next/image";
import React, { useState } from "react";
import logo from "@/app/assets/images/logo-dalel.svg";
import SearchComp from "./SearchComp";

interface IProps {
  selectedOrganFromSlider?: string;
}

const Navbar = ({ selectedOrganFromSlider }: IProps) => {
  // State to track if mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white fixed  top-0 left-0 w-screen z-40 border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/identification" className="flex items-center">
              <Image src={logo} className="h-[75px]" alt="Dalel Logo" />
            </a>
          </div>

          {/* Search Bar - desktop */}
          {/* <div className="flex-grow mx-8 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar-desktop"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search for anything..."
              />
            </div>
          </div> */}

          <div
            className={`mx-auto md:mt-[20px] md:mb-[20px] md:w-[520px] w-[310px] ${
              selectedOrganFromSlider === "" ? "mt-[115px] md:mt-[20px]" : ""
            }`}
          >
            <SearchComp />
          </div>

          {/* Navigation Menu - desktop */}
          <div className="flex-shrink-0">
            <ul className="flex space-x-8 rtl:space-x-reverse font-medium">
              <li>
                <a
                  href="/identification"
                  className="text-blue-700 py-2"
                  aria-current="page"
                >
                  الصفحة الرئيسية
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-900 hover:text-blue-700 py-2">
                  أعضاء الجسم
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-between py-3">
          {/* Logo */}
          <a href="/identification" className="flex items-center">
            <Image src={logo} className="h-[75px]" alt="Dalel Logo" />
          </a>

          {/* Mobile buttons */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>

            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-mobile"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - toggles visibility */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:hidden pb-4`}
          id="navbar-mobile"
        >
          {/* Mobile search input */}
          {/* <div className="relative mb-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar-mobile"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for anything..."
            />
          </div> */}
          {/* Mobile navigation links */}
          <ul className="flex flex-col my-10 font-medium border border-gray-100 rounded-lg bg-gray-50">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-black  rounded-t-lg"
                aria-current="page"
              >
                الصفحة الرئيسية
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 hover:bg-gray-100"
              >
                أعضاء الجسم
              </a>
            </li> */}
          </ul>

          <div
            className={`mx-auto md:mt-[20px] md:mb-[20px] md:w-[520px] w-[310px] ${
              selectedOrganFromSlider === ""
                ? "mt-[10px] mb-10 md:mt-[20px] w-[90%]"
                : ""
            }`}
          >
            <SearchComp />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
