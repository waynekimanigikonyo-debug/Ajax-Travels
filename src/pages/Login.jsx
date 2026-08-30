import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 relative bg-neutral-950 text-white">
      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-4 h-4 bg-red-600 rotate-45 rounded-sm"></div>
          <span className="text-xl font-bold tracking-wide uppercase">Twende</span>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
        <p className="text-xs text-gray-400 mb-6 text-center">Log in to view your travel itineraries</p>
        
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-xs">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/40 transition"
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-white/40 transition"
            required
          />
          <button type="submit" className="bg-white text-black font-bold py-3 rounded-lg mt-2 text-sm uppercase tracking-wider hover:bg-gray-200 transition">
            Log In
          </button>
        </form>

        <p className="text-gray-400 text-xs mt-6 text-center">
          Don't have an account? <Link to="/signup" className="text-white hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}