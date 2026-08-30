import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { subscribeToUserBookings } from '../services/bookingService';

export default function Dashboard() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToUserBookings(
      user.uid,
      (userBookings) => {
        setBookings(userBookings);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const upcomingTrips = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return bookings.filter((booking) => {
      if (!booking.date) return true;

      const tripDate = new Date(booking.date);

      return tripDate >= today;
    });
  }, [bookings]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

        {/* HEADER */}
        <header className="mb-12">

          <h1 className="text-3xl font-light">
            Welcome back,{' '}
            <span className="font-bold">
              {user?.displayName || user?.email}
            </span>
          </h1>

          <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">
            User Dashboard & Itineraries
          </p>

        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">

            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Upcoming Trips
            </h3>

            <p className="text-3xl font-bold">
              {upcomingTrips.length}
            </p>

          </div>

          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">

            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Total Bookings
            </h3>

            <p className="text-3xl font-bold">
              {bookings.length}
            </p>

          </div>

          <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">

            <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-2">
              Membership Status
            </h3>

            <p className="text-3xl font-bold text-red-500">
              Explorer
            </p>

          </div>

        </div>

        {/* BOOKINGS */}
        <section className="bg-neutral-900 border border-white/10 rounded-2xl p-6">

          <h2 className="text-lg font-bold mb-6">
            Your Bookings
          </h2>

          {loading ? (
            <div className="border border-white/5 rounded-xl p-8 text-center text-gray-500">
              Loading your bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="border border-white/5 rounded-xl p-8 text-center text-gray-500 text-sm">
              No active bookings found.
              <br />
              Explore destinations to plan your next itinerary.
            </div>
          ) : (
            <div className="grid gap-5">

              {bookings.map((booking) => (

                <article
                  key={booking.id}
                  className="border border-white/10 rounded-xl overflow-hidden bg-neutral-950"
                >

                  <div className="flex flex-col md:flex-row">

                    {booking.image && (
                      <img
                        src={booking.image}
                        alt={booking.title || booking.destinationTitle}
                        className="w-full md:w-64 h-48 object-cover"
                      />
                    )}

                    <div className="p-6 flex-1">

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <p className="text-xs uppercase tracking-wider text-red-500">
                            {booking.type || 'Travel'}
                          </p>

                          <h3 className="text-xl font-bold mt-1">
                            {booking.title || booking.destinationTitle}
                          </h3>

                          {booking.location && (
                            <p className="text-gray-400 text-sm mt-2">
                              📍 {booking.location}
                            </p>
                          )}

                        </div>

                        <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
                          {booking.status || 'Confirmed'}
                        </span>

                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">

                        <div>
                          <p className="text-gray-500">
                            Date
                          </p>
                          <p className="font-semibold">
                            {booking.date || 'Not specified'}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Guests
                          </p>
                          <p className="font-semibold">
                            {booking.guests || 1}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Price
                          </p>
                          <p className="font-semibold">
                            {booking.price
                              ? `${booking.currency || ''} ${booking.price}`
                              : 'Contact provider'}
                          </p>
                        </div>

                      </div>

                    </div>

                  </div>

                </article>

              ))}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}