// "use client"
// import axios from 'axios';
// import AddReviewLayout from '../Components/AddReviewLayout';

// import { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// export default function AddReview() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupType, setPopupType] = useState("add"); // 'add', 'edit', 'delete'
//   const [reviewContent, setReviewContent] = useState("");
//   const [review, setReview] = useState([])

//   // delte
//   const [id, setid] = useState('');

//   const fetchReview = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/Review');
//       setReview(response.data.result);
//       console.log(response.data.result);
//     } catch (error) {
//       console.error('Error fetching Review:', error);
//     }
//   };

//   const handlePopup = (type) => {
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//   };

//   const handleReviewChange = (content) => {
//     setReviewContent(content);
//   };

//   // delete
//   const handleDeleteClick = (id) => {
//     setShowPopup(true);
//     // alert(id)
//     setid(id)
//   }

//   const handleConfirmDelete = async (id) => {
//     // alert(id)
//     // alert("hi")
//     try {
//       // alert(id)
//       await axios.delete(`http://localhost:3000/api/Review/${id}`);
//       console.log("Review deleted successfully");
//       fetchReview();
//     } catch (error) {
//       console.error("Error deleting Review:", error);
//     }
//     setShowPopup(false);

//   }

//   useEffect(() => {

//     fetchReview();
//   }, [])
//   return (
//     <AddReviewLayout>
//       <div className="p-6 min-h-screen">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Manage Reviews</h1>

//         </div>

//         {/* Review Management Table */}
//         <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
//           <table className="min-w-full text-left text-sm text-gray-700">
//             <thead className="bg-teal-500 text-white">
//               <tr>
//                 <th className="py-3 px-4 border-b border-gray-200">No</th>
//                 <th className="py-3 px-4 border-b border-gray-200">Name</th>
//                 <th className="py-3 px-4 border-b border-gray-200">Review Message</th>
//                 <th className="py-3 px-4 border-b border-gray-200">Review Rating</th>

//                 <th className="py-3 px-4 border-b border-gray-200">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {
//                 review.map((item, i) => (

//                   <tr className="hover:bg-gray-50 transition-colors" key={i} >
//                     <td className="py-3 px-4 border-b border-gray-200">{i + 1}</td>
//                     <td className="py-3 px-4 border-b border-gray-200">{item.name}</td>
//                     <td className="py-3 px-4 border-b border-gray-200">
//                       {item.review}
//                     </td>
//                     <td className="py-3 px-4 border-b border-gray-200">
//                       {item.rating}
//                     </td>
//                     <td className="py-3 px-4 border-b border-gray-200">
//                       <button
//                         className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
//                         onClick={() => { handlePopup('delete'); handleDeleteClick(item._id); }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               }
//             </tbody>
//           </table>
//         </div>

//         {/* Popup for Add/Edit/Delete */}
//         {showPopup && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
//               <h2 className="text-xl mb-4">
//                 {popupType === "add"
//                   ? "Add Review"
//                   : popupType === "edit"
//                     ? "Edit Review"
//                     : "Delete Review"}
//               </h2>

//               {/* Form for Add/Edit */}
//               {(popupType === "add" || popupType === "edit") && (
//                 <form>
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     className="border p-2 w-full mb-4"
//                   />

//                   <ReactQuill
//                     value={reviewContent}
//                     onChange={handleReviewChange}
//                     placeholder="Review Message"
//                     className="mb-4"
//                   />
//                   <input
//                     type="number"
//                     min="1"
//                     max="5"
//                     placeholder="Star Rating (1-5)"
//                     className="border p-2 w-full mb-4"
//                   />
//                   <button
//                     type="submit"
//                     className="bg-teal-500 text-white px-4 py-2 rounded"
//                   >
//                     {popupType === "add" ? "Add Review" : "Update Review"}
//                   </button>
//                 </form>
//               )}

//               {/* Confirmation for Delete */}
//               {popupType === "delete" && (
//                 <div>
//                   <p>Are you sure you want to delete this review?</p>
//                   <div className="flex justify-end mt-4">
//                     <button
//                       className="bg-red-500 text-white px-4 py-2 rounded mr-2"
//                       onClick={() => handleConfirmDelete(id)}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="bg-gray-300 px-4 py-2 rounded"
//                       onClick={closePopup}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <button className="absolute top-2 right-2" onClick={closePopup}>
//                 X
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </AddReviewLayout >
//   );
// }


"use client"; // Add this at the top

import dynamic from 'next/dynamic';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddReviewLayout from '../Components/AddReviewLayout';

// Dynamically import ReactQuill to ensure it's only loaded on the client side
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AddReview() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("add");
  const [reviewContent, setReviewContent] = useState("");
  const [review, setReview] = useState([]);
  const [id, setid] = useState('');

  const fetchReview = async () => {
    try {
      // local
      // const response = await axios.get('http://localhost:3000/api/Review');
      const response = await axios.get('https://pharmapedia-me.vercel.app/api/Review');
      setReview(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.error('Error fetching Review:', error);
    }
  };

  const handlePopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleReviewChange = (content) => {
    setReviewContent(content);
  };

  const handleDeleteClick = (id) => {
    setShowPopup(true);
    setid(id);
  };

  const handleConfirmDelete = async (id) => {
    try {
      // local
      // await axios.delete(`http://localhost:3000/api/Review/${id}`);
      await axios.delete(`https://pharmapedia-me.vercel.app/api/Review/${id}`);

      console.log("Review deleted successfully");
      fetchReview();
    } catch (error) {
      console.error("Error deleting Review:", error);
    }
    setShowPopup(false);
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <AddReviewLayout>
      <div className="p-6 min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Reviews</h1>
        </div>

        {/* Review Management Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200">No</th>
                <th className="py-3 px-4 border-b border-gray-200">Name</th>
                <th className="py-3 px-4 border-b border-gray-200">Review Message</th>
                <th className="py-3 px-4 border-b border-gray-200">Review Rating</th>
                <th className="py-3 px-4 border-b border-gray-200">Delete</th>
              </tr>
            </thead>
            <tbody>
              {review.map((item, i) => (
                <tr className="hover:bg-gray-50 transition-colors" key={i}>
                  <td className="py-3 px-4 border-b border-gray-200">{i + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{item.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{item.review}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{item.rating}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                      onClick={() => { handlePopup('delete'); handleDeleteClick(item._id); }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popup for Add/Edit/Delete */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
              <h2 className="text-xl mb-4">
                {popupType === "add"
                  ? "Add Review"
                  : popupType === "edit"
                    ? "Edit Review"
                    : "Delete Review"}
              </h2>

              {/* Form for Add/Edit */}
              {(popupType === "add" || popupType === "edit") && (
                <form>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 w-full mb-4"
                  />
                  <ReactQuill
                    value={reviewContent}
                    onChange={handleReviewChange}
                    placeholder="Review Message"
                    className="mb-4"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Star Rating (1-5)"
                    className="border p-2 w-full mb-4"
                  />
                  <button
                    type="submit"
                    className="bg-teal-500 text-white px-4 py-2 rounded"
                  >
                    {popupType === "add" ? "Add Review" : "Update Review"}
                  </button>
                </form>
              )}

              {/* Confirmation for Delete */}
              {popupType === "delete" && (
                <div>
                  <p>Are you sure you want to delete this review?</p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handleConfirmDelete(id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-300 px-4 py-2 rounded"
                      onClick={closePopup}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <button className="absolute top-2 right-2" onClick={closePopup}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </AddReviewLayout>
  );
}
