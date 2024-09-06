"use client";
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
                    className="text-white bg-orange-500"
                    onClick={() => handleEditClick(item._id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <button
                    className="text-white bg-red-600"
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
                    className='mt-2 w-20 h-20'
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
                    className='mt-2 w-20 h-20'
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
