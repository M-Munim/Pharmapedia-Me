"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Sidebar = () => {
  // Set default path to /Dashboard/Home and track the current path
  const [activeLink, setActiveLink] = useState("/Dashboard/Home");

  useEffect(() => {
    // This will run only once after the initial render
    const path = window.location.pathname;
    setActiveLink(path);
  }, []);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <aside className="bg-blue w-56 min-h-screen">
      <div className="flex items-center justify-start mb-20 p-4">
        <Image
          src="/logo.png"
          alt="Pharmapedia Logo"
          width={100}
          height={100}
          priority
          className="w-14 md:w-14"
        />
        <span className="text-lg lg:text-xl text-white font-medium">
          {" "}
          Pharmapedia
        </span>
      </div>

      <div className="flex items-center justify-center">
        <ul className="flex items-center gap-5 justify-center flex-col text-white">
          <li className="flex items-center justify-center">
            <Link href="/Dashboard/Home" passHref>
              <div
                onClick={() => handleLinkClick("/Dashboard/Home")}
                className={`${activeLink === "/Dashboard/Home"
                  ? "bg-hover_blue2 text-white"
                  : "bg-white text-blue"
                  } border border-hover_blue2 w-44 py-2 flex items-center justify-center rounded-md font-medium hover:bg-hover_blue2 hover:text-white transition-all cursor-pointer`}
              >
                Home
              </div>
            </Link>
          </li>



          <li className="flex items-center justify-center">
            <Link href="/Dashboard/AddAdmin" passHref>
              <div
                onClick={() => handleLinkClick("/Dashboard/AddAdmin")}
                className={`${activeLink === "/Dashboard/AddAdmin"
                  ? "bg-hover_blue2 text-white"
                  : "bg-white text-blue"
                  } border border-hover_blue2 w-44 py-2 flex items-center justify-center rounded-md font-medium hover:bg-hover_blue2 hover:text-white transition-all cursor-pointer`}
              >
                Admin
              </div>
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link href="/Dashboard/AddBlog" passHref>
              <div
                onClick={() => handleLinkClick("/Dashboard/AddBlog")}
                className={`${activeLink === "/Dashboard/AddBlog"
                  ? "bg-hover_blue2 text-white"
                  : "bg-white text-blue"
                  } border border-hover_blue2 w-44 py-2 flex items-center justify-center rounded-md font-medium hover:bg-hover_blue2 hover:text-white transition-all cursor-pointer`}
              >
                Add Blog
              </div>
            </Link>
          </li>


          <li className="flex items-center justify-center">
            <Link href="/Dashboard/AddProduct" passHref>
              <div
                onClick={() => handleLinkClick("/Dashboard/AddProduct")}
                className={`${activeLink === "/Dashboard/AddProduct"
                  ? "bg-hover_blue2 text-white"
                  : "bg-white text-blue"
                  } border border-hover_blue2 w-44 py-2 flex items-center justify-center rounded-md font-medium hover:bg-hover_blue2 hover:text-white transition-all cursor-pointer`}
              >
                Add Product
              </div>
            </Link>
          </li>

          <li className="flex items-center justify-center">
            <Link href="/Dashboard/AddReview" passHref>
              <div
                onClick={() => handleLinkClick("/Dashboard/AddReview")}
                className={`${activeLink === "/Dashboard/AddReview"
                  ? "bg-hover_blue2 text-white"
                  : "bg-white text-blue"
                  } border border-hover_blue2 w-44 py-2 flex items-center justify-center rounded-md font-medium hover:bg-hover_blue2 hover:text-white transition-all cursor-pointer`}
              >
                Add Review
              </div>
            </Link>
          </li>

          <li className="flex items-center justify-center">
            <Link href="/Dashboard/Messages" passHref>
              <div
                onClick={() => handleLinkClick("/Dashboard/Messages")}
                className={`${activeLink === "/Dashboard/Messages"
                  ? "bg-hover_blue2 text-white"
                  : "bg-white text-blue"
                  } border border-hover_blue2 w-44 py-2 flex items-center justify-center rounded-md font-medium hover:bg-hover_blue2 hover:text-white transition-all cursor-pointer`}
              >
                Messages
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
