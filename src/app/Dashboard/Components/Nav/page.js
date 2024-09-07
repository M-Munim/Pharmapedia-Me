"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios"; // Ensure axios is imported
import { useCallback } from 'react';
import Cookies from 'js-cookie';

const Nav = () => {
  const router = useRouter();

  const Logout = async () => {
    try {
      // Call the API to log out the user server-side
      await axios.get("/api/User/Logout");
      // const res = await axios.get("/api/User/Logout");
      // console.log(res)

      // Clear local storage
      localStorage.removeItem("userId"); localStorage.removeItem("token");
      const value = localStorage.getItem("token");
      const co = document.cookie;
      console.log("localstorage:", value)
      console.log("cookies", co)
      // Remove the token cookie (make sure the path and other attributes match how it was set)
      document.cookie = "token=token; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None";

      // Show success message
      toast.success("Logged out successfully!!!");

      // Redirect to login page
      router.push("https://pharmapedia-me.vercel.app/Dashboard/Login");

    } catch (error) {
      // Log the error to the console
      console.error(`Error during logout: ${error.message}`);

      // Show error message to the user
      toast.error("Failed to log out. Please try again.");
    }
  };



  return (
    <nav className="flex items-center justify-between bg-hover_blue h-16 pr-5">
      <h2 className="text-white font-semibold text-xl">Pharmapedia Dashboard</h2>
      <button
        className="bg-hover_blue2 text-white px-2 py-1 rounded-md"
        onClick={Logout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Nav;
