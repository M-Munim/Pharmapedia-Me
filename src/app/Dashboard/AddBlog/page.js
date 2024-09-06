"use client";

// import axios from 'axios';
// import AddBlogLayout from '../Components/AddBlogLayout';
// import { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Image from 'next/image';

// const AddBlog = () => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupType, setPopupType] = useState('add'); // 'add', 'edit', 'delete'
//   const [description, setDescription] = useState(''); // State for ReactQuill
//   const [blogTitle, setBlogTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [date, setDate] = useState('');
//   const [image, setImage] = useState("");
//   const [imagePreview, setImagePreview] = useState('');

//   const [imagetwo, setImagetwo] = useState("");
//   const [imagePreviewtwo, setImagePreviewtwo] = useState('');
//   const [blogs, setBlogs] = useState([]);
//   const [id, setid] = useState('');

//   const [selectedblog, setSelectedblog] = useState({
//     author: "",
//     title: "",
//     blogContent: "",
//     datetime: "",
//     displayImage: null,
//     authorImage: null
//   });

//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/Blog');
//       setBlogs(response.data.result);
//     } catch (error) {
//       console.error('Error fetching blogs:', error);
//     }
//   };

//   const handlePopup = (type) => {
//     setPopupType(type);
//     setShowPopup(true);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setImage(''); // Reset image input
//     setImagePreview(''); // Reset image preview
//     setImagetwo(''); // Reset author image input
//     setImagePreviewtwo(''); // Reset author image preview
//   };

//   const handleDescriptionChange = (value) => {
//     setDescription(value);
//   };

//   const handleDeleteClick = (id) => {
//     setShowPopup(true);
//     setid(id);
//   }

//   const handleConfirmDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/Blog/${id}`);
//       console.log("blog deleted successfully");
//       fetchBlogs();
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//     }
//     setShowPopup(false);
//   }

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const handleImageChangeTwo = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImagetwo(file);
//       setImagePreviewtwo(URL.createObjectURL(file));
//     }
//   };

//   const handleEditClick = (blogid) => {
//     setid(blogid); // Set the ID of the blog to be edited
//     showblogDetails(blogid);
//     handlePopup('edit');
//   };

//   const showblogDetails = async (blogid) => {
//     try {
//       const res = await axios.get(`http://localhost:3000/api/Blog/${blogid}`);
//       const blogData = res.data.result;

//       setSelectedblog({
//         author: blogData.author,
//         title: blogData.title,
//         blogContent: blogData.blogContent,
//         datetime: blogData.datetime,
//         displayImage: blogData.displayImage,
//         authorImage: blogData.authorImage,
//       });

//       setBlogTitle(blogData.title);
//       setDescription(blogData.blogContent);
//       setAuthor(blogData.author);
//       setDate(blogData.datetime);
//     } catch (error) {
//       console.error("Error fetching Blog details:", error);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Debugging: Log form data before submission
//     console.log('Submitting form with values:', {
//       title: blogTitle,
//       author: author,
//       datetime: date,
//       blogContent: description,
//       displayImage: image,
//       authorImage: imagetwo,
//     });

//     const formData = new FormData();
//     formData.append('title', blogTitle);
//     formData.append('author', author);
//     formData.append('datetime', date);
//     formData.append('blogContent', description);

//     if (image) {
//       formData.append('displayImage', image);
//     }

//     if (imagetwo) {
//       formData.append('authorImage', imagetwo);
//     }

//     try {
//       if (popupType === 'add') {
//         await axios.post('http://localhost:3000/api/Blog', formData);
//       } else if (popupType === 'edit') {
//         await axios.put(`http://localhost:3000/api/Blog/${id}`, formData);
//       }
//       fetchBlogs(); // Refresh the list of blogs after add/edit
//       closePopup(); // Close the popup after submitting the form
//       resetForm(); // Reset the form fields
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   // Function to reset form fields
//   const resetForm = () => {
//     setBlogTitle('');
//     setAuthor('');
//     setDate('');
//     setDescription('');
//     setImage('');
//     setImagePreview('');
//     setImagetwo('');
//     setImagePreviewtwo('');
//   };


//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const modules = {
//     toolbar: [
//       [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
//       [{ size: [] }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       ['link', 'image', 'video'],
//       [{ 'align': [] }],
//       [{ 'color': [] }, { 'background': [] }],
//       ['clean']
//     ],
//   };

//   return (
//     <AddBlogLayout>
//       {/* Header Section */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
//         <button
//           className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
//           onClick={() => handlePopup('add')}
//         >
//           Add Blog
//         </button>
//       </div>

//       {/* Blog Management Table */}
//       <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
//         <table className="min-w-full text-left text-sm text-gray-700">
//           <thead className="bg-teal-500 text-white">
//             <tr>
//               <th className="py-3 px-4 border-b border-gray-200">No</th>
//               <th className="py-3 px-4 border-b border-gray-200">Author</th>
//               <th className="py-3 px-4 border-b border-gray-200">Author Image</th>
//               <th className="py-3 px-4 border-b border-gray-200">Blog Uploaded</th>
//               <th className="py-3 px-4 border-b border-gray-200">Blog Image</th>
//               <th className="py-3 px-4 border-b border-gray-200">Date</th>
//               <th className="py-3 px-4 border-b border-gray-200">Edit</th>
//               <th className="py-3 px-4 border-b border-gray-200">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Render blogs here */}
//             {blogs.map((item, i) => (
//               <tr className="hover:bg-gray-50 transition-colors" key={item._id}>
//                 <td className="py-3 px-4 border-b border-gray-200">{i + 1}</td>
//                 <td className="py-3 px-4 border-b border-gray-200">{item.author}</td>
//                 {/* <td className="py-3 px-4 border-b border-gray-200">{item.authorImage}</td> */}
//                 <td className="py-3 px-4 border-b border-gray-200"><Image
//                   src={`/uploads/${item.authorImage}`}
//                   alt='Blog image'
//                   width={100}
//                   height={100}
//                   className='bg-red-300'
//                 /></td>
//                 <td className="py-3 px-4 border-b border-gray-200">{item.title}</td>
//                 <td className="py-3 px-4 border-b border-gray-200">
//                   <Image
//                     src={`/uploads/${item.displayImage}`}
//                     alt='Blog image'
//                     width={100}
//                     height={100}
//                     className='bg-red-300'
//                   />
//                 </td>
//                 <td className="py-3 px-4 border-b border-gray-200">{item.datetime}</td>

//                 <td className="py-3 px-4 border-b border-gray-200 text-center">
//                   <button
//                     onClick={() => {
//                       handleEditClick(item._id);
//                       handlePopup('edit')
//                       // handleEdit(item._id);
//                     }}
//                     className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
//                   >
//                     Edit
//                   </button>
//                 </td>

//                 <td className="py-2 px-4 border-b">
//                   <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
//                     onClick={() => {
//                       handlePopup('delete');
//                       handleDeleteClick(item._id);
//                     }}
//                   >
//                     Delete</button>
//                 </td>
//               </tr>
//             ))}
//             {/* Add more rows as needed */}
//           </tbody>
//         </table>
//       </div>

//       {/* Other parts of the component */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
//             <h2 className="text-xl mb-4">
//               {popupType === 'add' ? 'Add Blog' : popupType === 'edit' ? 'Edit Blog' : 'Delete Blog'}
//             </h2>

//             {(popupType === 'add' || popupType === 'edit') && (
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                   type="text"
//                   placeholder="Blog Title"
//                   value={blogTitle}
//                   onChange={(e) => setBlogTitle(e.target.value)}
//                   className="border p-2 w-full"
//                 />
//                 <ReactQuill
//                   value={description}
//                   onChange={handleDescriptionChange}
//                   modules={modules}
//                   className="w-full h-60 overflow-y-auto"
//                 />
//                 <div className="flex items-center justify-center gap-2">
//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="border p-2 w-full"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Author"
//                     value={author}
//                     onChange={(e) => setAuthor(e.target.value)}
//                     className="border p-2 w-full"
//                   />
//                 </div>
//                 <label className="mb-0">Change Blog Image:</label>
//                 <div className="flex items-center justify-start gap-x-3">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="border p-2 w-6/12"
//                   />
//                   {imagePreview ? (
//                     <div className="mb-2 flex items-center justify-center">
//                       <Image
//                         src={imagePreview}
//                         alt="Image Preview"
//                         width={100}
//                         height={100}
//                       />
//                     </div>
//                   ) : (
//                     selectedblog.displayImage && (
//                       <div className="mb-2 flex items-center justify-center">
//                         <Image
//                           src={`/uploads/${selectedblog.displayImage}`}
//                           alt="Old Blog Image"
//                           width={100}
//                           height={100}
//                           className="w-14 h-14 object-cover"
//                         />
//                       </div>
//                     )
//                   )}
//                 </div>

//                 <label className="mb-0">Change Author Image:</label>
//                 <div className="flex items-center justify-start gap-x-3">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChangeTwo}
//                     className="border p-2 w-6/12"
//                   />
//                   {imagePreviewtwo ? (
//                     <div className="mb-4 flex items-center justify-center">
//                       <Image
//                         src={imagePreviewtwo}
//                         alt="Image Preview"
//                         width={100}
//                         height={100}
//                         className="w-20 h-20 object-cover"
//                       />
//                     </div>
//                   ) : (
//                     selectedblog.authorImage && (
//                       <div className="mb-4 flex items-center justify-center">
//                         <Image
//                           src={`/uploads/${selectedblog.authorImage}`}
//                           alt="Old Author Image"
//                           className="w-20 h-20 object-cover"
//                           width={100}
//                           height={100}
//                         />
//                       </div>
//                     )
//                   )}
//                 </div>
//                 <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded w-full">
//                   {popupType === 'add' ? 'Add Blog' : 'Edit Blog'}
//                 </button>
//               </form>
//             )}

//             {popupType === 'delete' && (
//               <>
//                 <p>Are you sure you want to delete this blog?</p>
//                 <div className="flex justify-end mt-4">
//                   <button
//                     onClick={closePopup}
//                     className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => handleConfirmDelete(id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </AddBlogLayout>
//   );
// };

// export default AddBlog




import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import AddBlogLayout from '../Components/AddBlogLayout';
import Image from 'next/image';

// Dynamically import ReactQuill with no SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const AddBlog = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('add');
  const [description, setDescription] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState('');
  const [imagetwo, setImagetwo] = useState("");
  const [imagePreviewtwo, setImagePreviewtwo] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [id, setid] = useState('');
  const [selectedblog, setSelectedblog] = useState({
    author: "",
    title: "",
    blogContent: "",
    datetime: "",
    displayImage: null,
    authorImage: null
  });

  const fetchBlogs = async () => {
    try {
      // local
      // const response = await axios.get('http://localhost:3000/api/Blog');
      const response = await axios.get('https://pharmapedia-me.vercel.app/api/Blog');
      setBlogs(response.data.result);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handlePopup = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setImage('');
    setImagePreview('');
    setImagetwo('');
    setImagePreviewtwo('');
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleDeleteClick = (id) => {
    setShowPopup(true);
    setid(id);
  }

  const handleConfirmDelete = async (id) => {
    try {
      // local 
      // await axios.delete(`http://localhost:3000/api/Blog/${id}`);
      await axios.delete(`https://pharmapedia-me.vercel.app/api/Blog/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setShowPopup(false);
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChangeTwo = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagetwo(file);
      setImagePreviewtwo(URL.createObjectURL(file));
    }
  };

  const handleEditClick = (blogid) => {
    setid(blogid);
    showblogDetails(blogid);
    handlePopup('edit');
  };

  const showblogDetails = async (blogid) => {
    try {
      // local 
      // const res = await axios.get(`http://localhost:3000/api/Blog/${blogid}`);
      const res = await axios.get(`https://pharmapedia-me.vercel.app/api/Blog/${blogid}`);
      const blogData = res.data.result;

      setSelectedblog({
        author: blogData.author,
        title: blogData.title,
        blogContent: blogData.blogContent,
        datetime: blogData.datetime,
        displayImage: blogData.displayImage,
        authorImage: blogData.authorImage,
      });

      setBlogTitle(blogData.title);
      setDescription(blogData.blogContent);
      setAuthor(blogData.author);
      setDate(blogData.datetime);
    } catch (error) {
      console.error("Error fetching Blog details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', blogTitle);
    formData.append('author', author);
    formData.append('datetime', date);
    formData.append('blogContent', description);

    if (image) {
      formData.append('displayImage', image);
    }

    if (imagetwo) {
      formData.append('authorImage', imagetwo);
    }

    try {
      if (popupType === 'add') {
        // local
        // await axios.post('http://localhost:3000/api/Blog', formData);
        await axios.post('https://pharmapedia-me.vercel.app/api/Blog', formData);
      } else if (popupType === 'edit') {
        // local
        // await axios.put(`http://localhost:3000/api/Blog/${id}`, formData);
        await axios.put(`https://pharmapedia-me.vercel.app/api/Blog/${id}`, formData);
      }
      fetchBlogs();
      closePopup();
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const resetForm = () => {
    setBlogTitle('');
    setAuthor('');
    setDate('');
    setDescription('');
    setImage('');
    setImagePreview('');
    setImagetwo('');
    setImagePreviewtwo('');
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      ['link', 'image', 'video'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  return (
    <AddBlogLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transform transition-transform hover:scale-105"
          onClick={() => handlePopup('add')}
        >
          Add Blog
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="py-3 px-4 border-b border-gray-200">No</th>
              <th className="py-3 px-4 border-b border-gray-200">Author</th>
              <th className="py-3 px-4 border-b border-gray-200">Author Image</th>
              <th className="py-3 px-4 border-b border-gray-200">Blog Uploaded</th>
              <th className="py-3 px-4 border-b border-gray-200">Blog Image</th>
              <th className="py-3 px-4 border-b border-gray-200">Date</th>
              <th className="py-3 px-4 border-b border-gray-200">Edit</th>
              <th className="py-3 px-4 border-b border-gray-200">Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, i) => (
              <tr className="hover:bg-gray-50 transition-colors" key={item._id}>
                <td className="py-3 px-4 border-b border-gray-200">{i + 1}</td>
                <td className="py-3 px-4 border-b border-gray-200">{item.author}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <img
                    src={item.authorImage}
                    alt='Blog image'
                  // className='bg-red-300'
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200">{item.title}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <img
                    src={item.displayImage}
                    alt='Blog image'

                  // className='bg-red-300'
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-200">{item.datetime}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="text-teal-500 hover:text-teal-600"
                    onClick={() => handleEditClick(item._id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="text-red-500 hover:text-red-600"
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

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{popupType === 'add' ? 'Add Blog' : 'Edit Blog'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                  Blog Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="author">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border rounded-lg p-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                  Blog Content
                </label>
                <ReactQuill
                  value={description}
                  onChange={handleDescriptionChange}
                  modules={modules}
                  className="border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                  Display Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border rounded-lg p-2 w-full"
                />
                {imagePreview && (
                  <img
                    src={imagePreview} alt="Image Preview"

                    className='mt-2'
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="authorImage">
                  Author Image
                </label>
                <input
                  type="file"
                  id="authorImage"
                  accept="image/*"
                  onChange={handleImageChangeTwo}
                  className="border rounded-lg p-2 w-full"
                />
                {imagePreviewtwo && (
                  <img
                    src={imagePreviewtwo} alt="Image Preview"
                    width={100}
                    height={100}
                    className='mt-2'
                  />
                )}
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closePopup}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  {popupType === 'add' ? 'Add Blog' : 'Update Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AddBlogLayout>
  );
};

export default AddBlog;
