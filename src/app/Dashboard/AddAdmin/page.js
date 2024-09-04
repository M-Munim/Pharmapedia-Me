"use client";

import { useEffect, useState } from "react";
import AddAdminLayout from "../Components/AddAdminLayout";
import axios from "axios";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti"; // Import checkmark icon

export default function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [designation, setDesignation] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // token
  const [inputValues, setInputValues] = useState({});
  const [buttonStates, setButtonStates] = useState({});

  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  // const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [id, setid] = useState("");
  const [admin, setAdmin] = useState([]);

  // edit
  const [first, setfirst] = useState("");
  // edit
  const [selectedAdmin, setSelectedAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    image: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState(selectedAdmin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmpassword', formData.confirmPassword);

    // Append the file if it's a file type
    if (formData.image) {
      formDataToSend.append('Image', formData.image);
    }

    console.log("Form Values:", formData);


    try {
      // local
      // const res = await axios.put(`http://localhost:3000/api/User/${first}`, formDataToSend, {
      const res = await axios.put(`https://pharmapedia-me.vercel.app/api/User/${first}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Response:", res.data);
      alert('data updated')
      // Handle successful submission here
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };


  // add admin
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("designation", designation);
    if (image) formData.append("Image", image);
    formData.append("password", password);
    formData.append("confirmpassword", confirmPassword);

    try {
      // local 
      // await axios.post("http://localhost:3000/api/User/Signup", formData, {
      await axios.post("https://pharmapedia-me.vercel.app/api/User/Signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Admin added successfully");
      fetchAdmin(); // Ensure this function is defined and implemented
      handleCloseModal(); // Ensure this function is defined and implemented
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const response = await axios.get(
        // local 
        // "http://localhost:3000/api/User/SpecificUser"
        "https://pharmapedia-me.vercel.app/api/User/SpecificUser"
      );
      setAdmin(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error("Error fetching Admin:", error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  // get specifice admin record
  const showAdminDetails = async (userid) => {
    try {
      // local
      // const res = await axios.get(`http://localhost:3000/api/User/${userid}`);
      const res = await axios.get(`https://pharmapedia-me.vercel.app/api/User/${userid}`);
      const adminData = res.data.Result;
      console.log(adminData);

      setFormData({
        name: adminData.username,
        email: adminData.email,
        phone: adminData.phone,
        designation: adminData.designation,
        password: adminData.confirmpassword,
        confirmPassword: adminData.confirmpassword,
        image: adminData.Image,
      });
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };


  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Update formData with the new file
    });
  };

  const handleAddAdminClick = () => setIsAddAdminOpen(true);

  const handleEditClick = (admin) => {
    // alert(admin);
    showAdminDetails(admin);
    setSelectedAdmin(admin);
    setfirst(admin);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (id) => {
    setIsDeleteConfirmOpen(true);
    setid(id);
  };

  const handleCloseModal = () => {
    setIsAddAdminOpen(false);
    setIsEditOpen(false);
    setIsDeleteConfirmOpen(false);
  };

  const handleConfirmDelete = async (id) => {
    // Implement delete logic here
    try {
      // alert(id)
      // local 
      // await axios.delete(`http://localhost:3000/api/User/${id}`);
      await axios.delete(`https://pharmapedia-me.vercel.app/api/User/${id}`);
      alert("Admin deleted successfully");
      fetchAdmin();
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
    // handleCloseModal();
    handleCloseModal();
  };

  // TOken
  // Handle input change
  const handleInputChange = (itemId, event) => {
    setInputValues((prev) => ({
      ...prev,
      [itemId]: event.target.value,
    }));
  };

  const handleButtonClick = async (itemId) => {
    console.log(itemId);
    const inputValue = inputValues[itemId] || "";
    console.log(inputValue);

    if (inputValue.trim() === "") {
      alert("No token available");
      return;
    }

    try {
      const response = await axios.post(
        // local
        // "http://localhost:3000/api/User/verifyEmail",
        "https://pharmapedia-me.vercel.app/api/User/verifyEmail",
        {
          token: inputValue,
          userId: itemId,
        }
      );
      setButtonStates((prev) => ({
        ...prev,
        [itemId]: response.data.success, // Set state based on verification success
      }));

      alert(response.data.message);
    } catch (error) {
      console.error("Token verification failed:", error);
      alert("Token verification failed");
    }
  };

  return (
    <AddAdminLayout>
      <div className="p-2 min-h-screen">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Admins</h1>
          <button
            onClick={handleAddAdminClick}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
          >
            Add Admin
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200">No</th>
                <th className="py-3 px-4 border-b border-gray-200">Name</th>
                <th className="py-3 px-4 border-b border-gray-200">Email</th>
                <th className="py-3 px-4 border-b border-gray-200">Phone</th>
                <th className="py-3 px-4 border-b border-gray-200">
                  Designation
                </th>
                <th className="py-3 px-4 border-b border-gray-200">Image</th>
                <th className="py-3 px-4 border-b border-gray-200">Password</th>
                <th className="py-3 px-4 border-b border-gray-200">
                  Verify Token
                </th>
                <th className="py-3 px-4 border-b border-gray-200">Edit</th>
                <th className="py-3 px-4 border-b border-gray-200">Delete</th>
              </tr>
            </thead>

            <tbody>
              {admin.map((item, i) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={item._id}
                >
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    {i + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.username}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.email}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    03302021926
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.designation}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <Image
                      src={`/uploads/${item.Image}`}
                      alt="shareIcon-Img"
                      width={100}
                      height={100}
                      className="w-10"
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    {item.confirmpassword}
                  </td>

                  <td className="py-3 px-4 border-gray-200 flex items-center justify-center gap-3 mt-2">
                    <input
                      type="text"
                      value={inputValues[item._id] || ""}
                      onChange={(e) => handleInputChange(item._id, e)}
                      className="border p-2"
                    />
                    <button
                      type="button"
                      onClick={() => handleButtonClick(item._id)}
                      className={`text-xs px-2 py-1 rounded text-white ${buttonStates[item._id] ? "bg-green-400" : "bg-red-400"
                        }`}
                    >
                      {buttonStates[item._id] ? <TiTick /> : <RxCross2 />}{" "}
                      {/* Conditional icon */}
                    </button>
                  </td>

                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    <button
                      onClick={() => {
                        handleEditClick(item._id);
                        // handleEdit(item._id);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200 text-center">
                    <button
                      // onClick={handleDeleteClick}
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

        {/* Add Admin Modal */}
        {isAddAdminOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center gap-3">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image</label>
                  <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Add Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Admin Modal */}
        {isEditOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">Edit Admin</h2>
              <form onSubmit={handleSubmitEdit}>
                <div className="flex items-center justify-center gap-2">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image</label>

                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />

                  <td className="py-3 px-4 border-b border-gray-200">
                    <Image
                      src={`/uploads/${formData.image}`}
                      alt="shareIcon-Img"
                      width={100}
                      height={100}
                      className="w-10"
                    />
                  </td>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  // onClick={handleConfirmDelete}
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
    </AddAdminLayout>
  );
}
