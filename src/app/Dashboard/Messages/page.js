"use client"

import React from 'react'
import MessageLayout from '../Components/MessageLayout'
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [id, setid] = useState("");
  const [message, setMessage] = useState([]);

  const fetchMessage = async () => {
    try {
      const response = await axios.get(
        // local
        // "http://localhost:3000/api/ContactForm"
        "https://pharmapedia-me.vercel.app/api/ContactForm"
      );
      setMessage(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching Admin:", error);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);


  const handleConfirmDelete = async (id) => {
    // Implement delete logic here
    try {
      await axios.delete(`/api/ContactForm/${id}`);
      alert("Message deleted successfully");
      fetchMessage();
    } catch (error) {
      console.error("Error deleting Message:", error);
    }
    handleCloseModal();
  };

  const handleDeleteClick = (id) => {
    setIsDeleteConfirmOpen(true);
    setid(id);
  };

  const handleCloseModal = () => {
    setIsDeleteConfirmOpen(false);
  };

  return (
    <MessageLayout>

      <div className="p-2 min-h-screen">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Messages</h1>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200">No</th>
                <th className="py-3 px-4 border-b border-gray-200">First Name</th>
                <th className="py-3 px-4 border-b border-gray-200">Last Name</th>
                <th className="py-3 px-4 border-b border-gray-200">Email</th>
                <th className="py-3 px-4 border-b border-gray-200">Phone</th>
                <th className="py-3 px-4 border-b border-gray-200">Message</th>

                <th className="py-3 px-4 border-b border-gray-200">Delete</th>
              </tr>
            </thead>

            <tbody>
              {message.map((item, i) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={item._id}
                >
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {i + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.firstName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.lastName}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.phone}
                  </td>

                  <td className="py-3 px-4 border-b border-gray-200">
                    <div className="h-28 overflow-y-auto w-72 flex items-center justify-start">
                      {item.message}
                    </div>
                  </td>

                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {/* <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                    >
                      Delete
                    </button> */}

                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>

        {/* Confirm Delete Modal */}
        {isDeleteConfirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete this admin?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmDelete(id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MessageLayout>
  )
}

export default Page