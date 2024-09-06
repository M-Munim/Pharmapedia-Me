"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios"; // Ensure axios is imported
import { useCallback } from 'react';
import Cookies from 'js-cookie';

const Nav = () => {
  const router = useRouter();

  const Logout = useCallback(async () => {
    try {
      // Call the API to log out the user server-side
      await axios.get("/api/User/Logout");

      // Clear local storage
      localStorage.removeItem("userId");
      const cookie = localStorage.removeItem("token");
      localStorage.removeItem("email");
      const copokie = Cookies.remove('token');
      console.log(copokie);


      // Check if the token is successfully removed
      if (!cookie) {
        // Show success message
        toast.success("Logged out successfully!!!");

        // Redirect to login page
        router.push("https://pharmapedia-me.vercel.app/Dashboard/Login");
      }

    } catch (error) {
      console.error(`Error during logout: ${error.message}`);
      toast.error("Failed to log out. Please try again.");
    }
  }, [router]);


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
