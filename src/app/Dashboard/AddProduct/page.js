// "use client";

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Image from 'next/image';
// import AddProductLayout from '../Components/AddProductLayout';

// export default function AddProduct() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupType, setPopupType] = useState('add'); // 'add', 'edit', 'delete'
//   const [productDescription, setProductDescription] = useState('');
//   const [productName, setProductName] = useState('');
//   const [productImage, setProductImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [productId, setProductId] = useState(''); // ID for the product being edited
//   const [products, setProducts] = useState([]);

//   // Define modules and formats for ReactQuill
//   const modules = {
//     toolbar: [
//       [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['bold', 'italic', 'underline'],
//       ['link'],
//       [{ 'align': [] }],
//       ['clean'] // Remove formatting button
//     ],
//   };

//   const formats = [
//     'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'align'
//   ];

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/Product');
//       setProducts(response.data.result);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleProductDetails = async (id) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/Product/${id}`);
//       const product = response.data.result;
//       console.log(product);

//       setProductName(product.productName);
//       setProductDescription(product.productContent);
//       setProductImage(null); // Keep image as it is
//       setImagePreview(`/uploads/${product.displayImage}`); // Assuming the image URL is available
//       setProductId(product._id);
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   const handleSubmitProduct = async (e) => {
//     e.preventDefault();

//     console.log(productId);


//     const formData = new FormData();
//     formData.append('productName', productName);
//     formData.append('productContent', productDescription);
//     if (productImage) formData.append('displayImage', productImage);
//     console.log(productName, productDescription, productImage);

//     try {
//       if (popupType === 'add') {
//         await axios.post('http://localhost:3000/api/Product', formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert("Product added successfully");
//       } else if (popupType === 'edit' && productId) {
//         await axios.put(`http://localhost:3000/api/Product/${productId}`, formData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         alert("Product updated successfully");
//       }
//       fetchProducts();
//       closePopup();
//     } catch (error) {
//       console.error('Error submitting product:', error);
//     }

//     // Clear the form
//     setProductName('');
//     setProductDescription('');
//     setProductImage(null);
//     setImagePreview(null);
//   };

//   const handlePopup = (type, id = null) => {
//     setPopupType(type);
//     if (type === 'edit' && id) {
//       handleProductDetails(id);
//     } else {
//       setProductName('');
//       setProductDescription('');
//       setProductImage(null);
//       setImagePreview(null);
//     }
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setProductName('');
//     setProductDescription('');
//     setProductImage(null);
//     setImagePreview(null);
//   };

//   const handleDescriptionChange = (value) => {
//     setProductDescription(value);
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setProductImage(e.target.files[0]);
//       setImagePreview(URL.createObjectURL(e.target.files[0]));
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setProductId(id);
//     handlePopup('delete');
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:3000/api/Product/${productId}`);
//       console.log("Product deleted successfully");
//       fetchProducts();
//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <AddProductLayout>
//       <div className="p-6 min-h-screen">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
//           <button
//             className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
//             onClick={() => handlePopup('add')}
//           >
//             Add Product
//           </button>
//         </div>

//         {/* Product Management Table */}
//         <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
//           <table className="min-w-full text-left text-sm text-gray-700">
//             <thead className="bg-teal-500 text-white">
//               <tr>
//                 <th className="py-3 px-4 border-b border-gray-200">No</th>
//                 <th className="py-3 px-4 border-b border-gray-200">Product Name</th>
//                 <th className="py-3 px-4 border-b border-gray-200">Product Image</th>
//                 <th className="py-3 px-4 border-b border-gray-200">Update</th>
//                 <th className="py-3 px-4 border-b border-gray-200">Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((item, i) => (
//                 <tr className="hover:bg-gray-50 transition-colors" key={item._id}>
//                   <td className="py-3 px-4 border-b border-gray-200">{i + 1}</td>
//                   <td className="py-3 px-4 border-b border-gray-200">{item.productName}</td>
//                   <td className="py-3 px-4 border-b border-gray-200">
//                     <Image
//                       src={`/uploads/${item.displayImage}`}
//                       alt="Product Image"
//                       width={100}
//                       height={100}
//                       className='w-28'
//                     />
//                   </td>
//                   <td className="py-3 px-4 border-b border-gray-200">
//                     <button
//                       onClick={() => handlePopup('edit', item._id)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                   <td className="py-2 px-4 border-b">
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
//                       onClick={() => handleDeleteClick(item._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Popup for Add/Edit/Delete */}
//         {showPopup && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//             <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full relative">
//               <h2 className="text-xl mb-4">
//                 {popupType === 'add' ? 'Add Product' : popupType === 'edit' ? 'Edit Product' : 'Delete Product'}
//               </h2>

//               {/* Form for Add/Edit */}
//               {(popupType === 'add' || popupType === 'edit') && (
//                 <form onSubmit={handleSubmitProduct} className="space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Product Name"
//                     value={productName}
//                     onChange={(e) => setProductName(e.target.value)}
//                     className="border p-2 w-full"
//                   />
//                   <ReactQuill
//                     value={productDescription}
//                     onChange={handleDescriptionChange}
//                     modules={modules}
//                     formats={formats}
//                     placeholder="Product Description"
//                     className="w-full h-44 overflow-y-auto"
//                   />
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="border p-2 w-full"
//                   />
//                   {imagePreview && (
//                     <div className="w-32 h-32">
//                       <Image src={imagePreview} alt="Product Image Preview" width={128} height={128} />
//                     </div>
//                   )}
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       type="button"
//                       onClick={closePopup}
//                       className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
//                     >
//                       {popupType === 'add' ? 'Add Product' : 'Update Product'}
//                     </button>
//                   </div>
//                 </form>
//               )}

//               {/* Confirm Delete */}
//               {popupType === 'delete' && (
//                 <div className="text-center">
//                   <p className="mb-4">Are you sure you want to delete this product?</p>
//                   <div className="flex justify-center space-x-4">
//                     <button
//                       onClick={handleConfirmDelete}
//                       className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={closePopup}
//                       className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </AddProductLayout>
//   );
// }







"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import AddProductLayout from '../Components/AddProductLayout';

// Dynamically import ReactQuill to avoid server-side rendering issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

export default function AddProduct() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('add'); // 'add', 'edit', 'delete'
  const [productDescription, setProductDescription] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productId, setProductId] = useState(''); // ID for the product being edited
  const [products, setProducts] = useState([]);

  // Define modules and formats for ReactQuill
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      ['clean'] // Remove formatting button
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'align'
  ];

  const fetchProducts = async () => {
    try {
      // local 
      // const response = await axios.get('/api/Product');
      const response = await axios.get('https://pharmapedia-me.vercel.app/api/Product');
      setProducts(response.data.result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductDetails = async (id) => {
    try {
      // local 
      // const response = await axios.get(`/api/Product/${id}`);
      const response = await axios.get(`https://pharmapedia-me.vercel.app/api/Product/${id}`);
      const product = response.data.result;
      console.log(product);

      setProductName(product.productName);
      setProductDescription(product.productContent);
      setProductImage(null); // Keep image as it is
      setImagePreview(`/uploads/${product.displayImage}`); // Assuming the image URL is available
      setProductId(product._id);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productContent', productDescription);
    if (productImage) formData.append('displayImage', productImage);

    try {
      if (popupType === 'add') {
        // local
        // await axios.post('/api/Product', formData, {
        await axios.post('https://pharmapedia-me.vercel.app/api/Product', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert("Product added successfully");
      } else if (popupType === 'edit' && productId) {
        // local
        // await axios.put(`/api/Product/${productId}`, formData, {
        await axios.put(`https://pharmapedia-me.vercel.app/api/Product/${productId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert("Product updated successfully");
      }
      fetchProducts();
      closePopup();
    } catch (error) {
      console.error('Error submitting product:', error);
    }

    // Clear the form
    setProductName('');
    setProductDescription('');
    setProductImage(null);
    setImagePreview(null);
  };

  const handlePopup = (type, id = null) => {
    setPopupType(type);
    if (type === 'edit' && id) {
      handleProductDetails(id);
    } else {
      setProductName('');
      setProductDescription('');
      setProductImage(null);
      setImagePreview(null);
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setProductName('');
    setProductDescription('');
    setProductImage(null);
    setImagePreview(null);
  };

  const handleDescriptionChange = (value) => {
    setProductDescription(value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDeleteClick = (id) => {
    setProductId(id);
    handlePopup('delete');
  };

  const handleConfirmDelete = async () => {
    try {
      // LOCAL
      // await axios.delete(`/api/Product/${productId}`);
      await axios.delete(`https://pharmapedia-me.vercel.app/api/Product/${productId}`);
      console.log("Product deleted successfully");
      fetchProducts();
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AddProductLayout>
      <div className="p-6 min-h-screen">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
            onClick={() => handlePopup('add')}
          >
            Add Product
          </button>
        </div>

        {/* Product Management Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
          <table className="min-w-full text-left text-sm text-gray-700">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200">No</th>
                <th className="py-3 px-4 border-b border-gray-200">Product Name</th>
                <th className="py-3 px-4 border-b border-gray-200">Product Image</th>
                <th className="py-3 px-4 border-b border-gray-200">Update</th>
                <th className="py-3 px-4 border-b border-gray-200">Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, i) => (
                <tr className="hover:bg-gray-50 transition-colors" key={item._id}>
                  <td className="py-3 px-4 border-b border-gray-200">{i + 1}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{item.productName}</td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <Image
                      src={`/uploads/${item.displayImage}`}
                      alt="Product Image"
                      width={100}
                      height={100}
                      className='w-28'
                    />
                  </td>
                  <td className="py-3 px-4 border-b border-gray-200">
                    <button
                      onClick={() => handlePopup('edit', item._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
                      onClick={() => handleDeleteClick(item._id)}
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
            <div className="bg-white p-6 rounded shadow-lg max-w-3xl w-full relative">
              <h2 className="text-xl mb-4">
                {popupType === 'add' ? 'Add Product' : popupType === 'edit' ? 'Edit Product' : 'Delete Product'}
              </h2>

              {/* Form for Add/Edit */}
              {(popupType === 'add' || popupType === 'edit') && (
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-2 w-full"
                  />
                  <ReactQuill
                    value={productDescription}
                    onChange={handleDescriptionChange}
                    modules={modules}
                    formats={formats}
                    placeholder="Product Description"
                    className="w-full h-44 overflow-y-auto"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 w-full"
                  />
                  {imagePreview && (
                    <div className="w-32 h-32">
                      <Image src={imagePreview} alt="Product Image Preview" width={128} height={128} />
                    </div>
                  )}
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={closePopup}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      {popupType === 'add' ? 'Add Product' : 'Update Product'}
                    </button>
                  </div>
                </form>
              )}

              {/* Confirm Delete */}
              {popupType === 'delete' && (
                <div className="text-center">
                  <p className="mb-4">Are you sure you want to delete this product?</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleConfirmDelete}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      onClick={closePopup}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AddProductLayout>
  );
}