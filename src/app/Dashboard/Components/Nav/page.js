"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios"; // Ensure axios is imported

const Nav = () => {
  const router = useRouter();

  const Logout = async () => {
    try {
      // Call the API to log out the user server-side
      // local
      // await axios.get("http://localhost:3000/api/User/Logout");
      await axios.get("/api/User/Logout");

      // Clear local storage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      const tokenget = localStorage.getItem('token')

      if (!tokenget) {
        // Optionally clear cookies if used
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        // Redirect to login page


        // Show success message
        toast.success("Logged out successfully!!!");
        // local
        // router.push("/Dashboard/Login");
        router.push("/Dashboard/Login");
      }



    } catch (error) {
      console.error(`Error logging out: ${error.message}`);
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
