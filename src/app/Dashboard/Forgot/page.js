"use client"

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add your forgot password logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-500">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md bg-white"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
