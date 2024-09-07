"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios"; // Ensure axios is imported


const Nav = () => {
  const router = useRouter();

  const Logout = async () => {
    try {
      await axios.get("/api/User/Logout", { timeout: 10000 });
    } catch (error) {
      console.error(`Error logging out: ${error.message}`);
    }

    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // localStorage.removeItem("username");
    // localStorage.removeItem("email");
    // Cookies.remove("token");

    router.push("/Dashboard/Login");
    toast.success("Logged out successfully");
  };

  // // Use client-side lifecycle to handle the logout
  // useEffect(() => {
  //   Logout();
  // }, []); // Runs only once after the component mounts (client-side)




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
