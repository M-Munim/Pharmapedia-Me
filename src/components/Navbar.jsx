"use client";

import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

export default function Navbar() {
  // Assuming you are in a component or function
  const currentUrl =
    typeof window !== "undefined" ? window.location.pathname : "";

  // console.log('Current URL:', currentUrl);

  const [moveTo, setMoveTo] = useState(currentUrl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);

  useEffect(() => {
    // Extract current pathname from window.location
    const path = window.location.pathname;
    // Determine active link based on pathname
    if (path === "/") {
      setMoveTo("Home");
    } else if (path === "/About") {
      setMoveTo("About");
    } else if (path === "/Blog") {
      setMoveTo("Blog");
    } else if (path === "/Products") {
      setMoveTo("Products");
    } else if (path === "/Faqs") {
      setMoveTo("FAQs");
    } else {
      setMoveTo("Home"); // Default to Home if path not matched
    }
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the search logic or API call here
    console.log("Search query:", query);
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  return (
    <>
      <Head>
        <title>Pharmapedia</title>
        <meta
          name="description"
          content="Pharmapedia - Your reliable source for pharmaceutical products and information."
        />
        <meta
          name="keywords"
          content="Pharmapedia, pharmaceutical, products, health, medicine"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.pharmapedia.pro" />
      </Head>
      <nav className="w-full relative">
        <div
          className={`h-10 w-full flex items-center justify-center ${
            moveTo === "Home" ? "bg-blue text-white" : "bg-white text-black"
          }`}
        >
          <div className="w-11/12 sm:w-9/12 flex m-auto justify-between">
            <div className="flex items-center  gap-3 text-3xl">
              <a
                href="https://www.facebook.com/Pharmapedia01"
                target="_blank"
                className="sm:text-base text-sm border-r border-borderBlue md:border-r-2 pr-3 py-1"
                aria-label="Facebook"
              >
                <FaFacebookF className="cursor-pointer" />
              </a>
              <a
                href="https://www.linkedin.com/company/pharmapedia1/"
                target="_blank"
                className="sm:text-base text-sm border-r border-borderBlue md:border-r-2 pr-3 py-1"
                aria-label="YouTube"
              >
                <FaLinkedin className="cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/pharmapedia01/?hl=en"
                target="_blank"
                className="sm:text-base text-sm"
                aria-label="Instagram"
              >
                <FaInstagram className="cursor-pointer" />
              </a>
            </div>

            <div className="flex-row items-center justify-end gap-6 sm:flex font-semibold text-[12px] sm:text-sm">
              <p className="">saharbegum@pharmapedia.pro</p>
              <p className="">+92&nbsp;3494428783</p>
            </div>
          </div>
        </div>
        <div
          className={`h-20 md:h-28 flex items-center justify-center ${
            moveTo !== "Home" ? "absolute w-full top-12 z-50" : "block"
          } `}
        >
          <div className="w-10/12 flex justify-between items-center m-auto">
            <div className="flex-shrink-0">
              <Link
                href="/"
                onClick={() => setMoveTo("Home")}
                className="flex items-center justify-center"
              >
                <Image
                  src="/logo.png"
                  alt="Pharmapedia Logo"
                  width={100}
                  height={100}
                  priority
                  className="w-14 md:w-20"
                />
                <span className="text-lg lg:text-xl text-blue font-medium">
                  {" "}
                  Pharmapedia
                </span>
                <span className="text-lg lg:text-xl font-medium">
                  &nbsp;Private Limited
                </span>
              </Link>
            </div>

            <div className="flex-grow hidden lg:flex items-center justify-center">
              <ul
                className={`flex justify-center items-center gap-7 text-base xl:text-lg ${
                  moveTo !== "Home" ? "text-white" : ""
                }`}
              >
                <li onClick={() => setMoveTo("Home")}>
                  <Link
                    href="/"
                    className={`${
                      moveTo === "Home" ? "text-hover_blue font-bold" : ""
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li onClick={() => setMoveTo("About")}>
                  <Link
                    href="/About"
                    className={`${
                      moveTo === "About" ? "text-hover_blue2 font-bold" : ""
                    }`}
                  >
                    About us
                  </Link>
                </li>
                <li onClick={() => setMoveTo("Blog")}>
                  <Link
                    href="/Blog"
                    className={`${
                      moveTo === "Blog" ? "text-hover_blue2 font-bold" : ""
                    }`}
                  >
                    Blogs
                  </Link>
                </li>
                <li onClick={() => setMoveTo("Products")}>
                  <Link
                    href="/Products"
                    className={`${
                      moveTo === "Products" ? "text-hover_blue2 font-bold" : ""
                    }`}
                  >
                    Products
                  </Link>
                </li>
                <li onClick={() => setMoveTo("FAQs")}>
                  <Link
                    href="/Faqs"
                    className={`${
                      moveTo === "FAQs" ? "text-hover_blue2 font-bold" : ""
                    }`}
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden lg:flex items-center justify-center gap-5">
              {/* <div>
                {!showSearchBox && (
                  <IoIosSearch
                    onClick={toggleSearchBox}
                    style={{ cursor: "pointer", fontSize: "34px" }}
                  />
                )}
                {showSearchBox && (
                  <form
                    onSubmit={handleSubmit}
                    className="flex justify-center items-center"
                  >
                    <IoIosSearch
                      className="text-white"
                      onClick={toggleSearchBox}
                      style={{ cursor: "pointer", fontSize: "30px" }}
                    />
                    <input
                      type="text"
                      id="search"
                      name="q"
                      value={query}
                      onChange={handleInputChange}
                      placeholder="Search"
                      className="outline-none border-1 border-black rounded-md p-1"
                      autoFocus
                    />
                  </form>
                )}
              </div> */}
              <button
                className={` ${
                  moveTo !== "Home" ? "button-outlined2" : "button-outlined"
                } `}
              >
                <a href="#contact">Contact Us</a>
              </button>
            </div>
            <div className="lg:hidden text-2xl">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {/* {menuOpen ? <FaTimes className='text-white' /> : <FaBars className='text-white' />} */}
                {menuOpen ? (
                  <FaTimes
                    className={` ${
                      moveTo !== "Home" ? "text-white" : "text-black"
                    } `}
                  />
                ) : (
                  <FaBars
                    className={` ${
                      moveTo !== "Home" ? "text-white" : "text-black"
                    } `}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-slate-100 w-5/12 ms-auto absolute z-50 top-32 right-10 rounded-xl">
            <ul className="flex flex-col items-center gap-4 py-4 text-lg">
              <li
                onClick={() => {
                  setMoveTo("Home");
                  setMenuOpen(false);
                }}
              >
                <Link
                  href="/"
                  className={`${
                    moveTo === "Home" ? "text-hover_blue font-bold" : ""
                  }`}
                >
                  Home
                </Link>
              </li>
              <li
                onClick={() => {
                  setMoveTo("About us");
                  setMenuOpen(false);
                }}
              >
                <Link
                  href="/About"
                  className={`${
                    moveTo === "About" ? "text-hover_blue2 font-bold" : ""
                  }`}
                >
                  About us
                </Link>
              </li>
              <li
                onClick={() => {
                  setMoveTo("Blogs");
                  setMenuOpen(false);
                }}
              >
                <Link
                  href="/Blog"
                  className={`${
                    moveTo === "Blog" ? "text-hover_blue2 font-bold" : ""
                  }`}
                >
                  Blogs
                </Link>
              </li>
              <li
                onClick={() => {
                  setMoveTo("Our Products");
                  setMenuOpen(false);
                }}
              >
                <Link
                  href="/Products"
                  className={`${
                    moveTo === "Products" ? "text-hover_blue2 font-bold" : ""
                  }`}
                >
                  Products
                </Link>
              </li>
              <li
                onClick={() => {
                  setMoveTo("FAQs");
                  setMenuOpen(false);
                }}
              >
                <Link
                  href="/Faqs"
                  className={`${
                    moveTo === "FAQs" ? "text-hover_blue2 font-bold" : ""
                  }`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                {/* <button className={` ${moveTo !== "Home" ? "button-outlined2" : "button-outlined"} `}> */}
                <button className="button-outlined">
                  <a href="#contact">Contact Us</a>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
