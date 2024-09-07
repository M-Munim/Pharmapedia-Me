"use client"

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios"; // Ensure axios is imported


const Nav = () => {
  const router = useRouter();

  const Logout = async () => {
    try {
      // Call the API to log out the user server-side

      // Show cookies before removal (client-side only)


      await axios.get("/api/User/Logout");
      const allCookies = document.cookie; // Get all cookies as a string
      console.log("Cookies before deletion:", allCookies);

      // Remove the token cookie
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=None";

      // Show cookies after removal to verify if it's removed
      const cookiesAfterRemoval = document.cookie;
      console.log("Cookies after deletion:", cookiesAfterRemoval);
      // Clear local storage
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      // Show localStorage values after removal
      const value = localStorage.getItem("token");
      console.log("localStorage token:", value);  // Should be null if removed properly

      // Show success message
      toast.success("Logged out successfully!!!");

      // Redirect to login page
      router.push("/Dashboard/Login");

    } catch (error) {
      // Log the error to the console
      console.error(`Error during logout: ${error.message}`);

      // Show error message to the user
      toast.error("Failed to log out. Please try again.");
    }
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
