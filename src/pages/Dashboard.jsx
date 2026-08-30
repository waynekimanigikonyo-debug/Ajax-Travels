import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <header className="mb-12">
          <h1 className="text-3xl font-light">
            Welcome back, <span className="font-bold">{user?.displayName || user?.email}</span>
          </h1>
          <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">User Dashboard & Itineraries</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Upcoming Trips</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Saved Destinations</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">Membership Status</h3>
            <p className="text-3xl font-bold text-red-500">Explorer</p>
          </div>
        </div>

        <section className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Your Bookings</h2>
          <div className="border border-white/5 rounded-xl p-8 text-center text-gray-500 text-sm">
            No active bookings found. Explore destinations to plan your next itinerary.
          </div>
        </section>
      </main>
    </div>
  );
}