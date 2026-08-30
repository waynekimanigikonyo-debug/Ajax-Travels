import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 relative bg-neutral-950 text-white">
      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl text-center shadow-2xl">
        <div className="text-5xl font-extrabold tracking-widest text-red-600 mb-4">404</div>
        <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
        <p className="text-xs text-gray-400 mb-6">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-block bg-white text-black font-bold py-3 px-6 rounded-lg text-xs uppercase tracking-wider hover:bg-gray-200 transition">
          Return Home
        </Link>
      </div>
    </div>
  );
}
