import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerUser(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-xl">

        {/* Ajax Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-4 h-4 bg-red-600 rotate-45 rounded-sm"></div>

          <span className="text-2xl font-extrabold tracking-widest uppercase text-gray-900">
            Ajax
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
          Create Account
        </h2>

        <p className="text-sm text-gray-500 mb-7 text-center">
          Join Ajax to manage your safari & flight bookings
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 text-white font-bold py-3 rounded-lg mt-2 text-sm uppercase tracking-wider hover:bg-red-700 active:bg-red-800 transition shadow-md"
          >
            Sign Up
          </button>

        </form>

        {/* Login Link */}
        <p className="text-gray-500 text-sm mt-6 text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:text-red-700 hover:underline"
          >
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
}