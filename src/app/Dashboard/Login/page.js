"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "../Components/urls.js";


const Login = () => {
  const [userlogin, setuserlogin] = useState({
    email: "",
    password: "",
  });
  // for button disabled
  const [buttonDisable, setbuttondisable] = useState(true);
  // for loading
  const [loading, setloading] = useState(false);
  // navigation
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const response = await axios.post(
        // "/api/Users/login",
        `/api/User/Login`, {
        email: userlogin.email,
        password: userlogin.password
      }
        // Ensure this API route exists and is properly defined
      );

      console.log("Login successful", response);


      // If using verification, uncomment the following code
      const isVerified = response.data.isVerified;
      if (isVerified) {
        toast.success("Login successfully");
        router.push("/Dashboard/Home");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
      } else {
        toast.warning("You are not verified for login😢");
        router.push("/Dashboard/Login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (userlogin.email.length > 0 && userlogin.password.length > 0) {
      setbuttondisable(false);
    } else {
      setbuttondisable(true);
    }
  }, [userlogin]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center">
      <form
        className="bg-transparent p-10 rounded-xl shadow-xl w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-5">
          {loading ? "Processing..." : "Pharmapedia Dashboard"}
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={userlogin.email}
            onChange={(e) =>
              setuserlogin({ ...userlogin, email: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={userlogin.password}
            onChange={(e) =>
              setuserlogin({ ...userlogin, password: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={buttonDisable || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 flex justify-end">
          <a href="/Register" className="text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;