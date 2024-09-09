import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // local
    // const response = await fetch('/api/ContactForm', {
    const response = await fetch('https://pharmapedia-me.vercel.app/api/ContactForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      // Show success toast
      toast.success('Message sent successfully!');
      // Clear form fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } else {
      // Show error toast
      toast.error('Failed to send message.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center gap-2 lg:gap-7 xl:gap-10 mb-4">
          <div className="flex flex-col items-start justify-center gap-1 w-6/12">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              className="h-12 w-full rounded-lg p-3 outline-none border-slate-400 border"
              required
              onChange={handleChange}
              value={formData.firstName}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-1 w-6/12">
            <label htmlFor="lastName" className="text-sm font-medium leading-6">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              className="h-12 w-full rounded-lg p-3 outline-none border-slate-400 border"
              required
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-sm font-medium leading-6">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Example@company.com"
            required
            className="h-12 w-full rounded-lg p-3 outline-none border-slate-400 border"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="text-sm font-medium leading-6">
            Phone number
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="+92 300 0000000"
            required
            className="h-12 w-full rounded-lg p-3 outline-none border-slate-400 border"
            onChange={handleChange}
            value={formData.phone}
          />
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="message" className="text-sm font-medium leading-6">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 w-full rounded-lg p-3 outline-none border-slate-400 border resize-none"
            onChange={handleChange}
            value={formData.message}
          ></textarea>
        </div>

        <button type="submit" className="button-filledext">
          Send Message
        </button>
      </form>

      {/* ToastContainer for displaying toast notifications */}
      <ToastContainer />
    </>
  );
}
