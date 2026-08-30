import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* AJAX LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-4 h-4 bg-red-600 rotate-45 rounded-sm" />

          <span className="text-2xl font-black tracking-[0.2em] text-gray-900">
            AJAX
          </span>
        </Link>

        {/* NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="text-gray-700 hover:text-red-600 transition"
          >
            Home
          </Link>

          <Link
            to="/stays"
            className="text-gray-700 hover:text-red-600 transition"
          >
            Stays
          </Link>

          <Link
            to="/experiences"
            className="text-gray-700 hover:text-red-600 transition"
          >
            Local Experiences
          </Link>

          <Link
            to="/about"
            className="text-gray-700 hover:text-red-600 transition"
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-red-600 transition"
              >
                Dashboard
              </Link>

              <span className="text-sm text-gray-500">
                {user.displayName || user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-red-600 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}