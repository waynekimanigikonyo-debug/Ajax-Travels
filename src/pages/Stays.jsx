import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { searchStays } from '../services/tourService';
import { createBooking } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

export default function Stays() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [query, setQuery] = useState(
    params.get('destination') || ''
  );

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setAdults] = useState(2);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const runSearch = async (event) => {
    event?.preventDefault();

    if (query.trim().length < 3) {
      setMessage('Enter a destination with at least 3 characters.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const data = await searchStays(query.trim(), {
        checkInDate,
        checkOutDate,
        adults,
      });

      setResults(data);

      if (data.length === 0) {
        setMessage('No stays found for this destination.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.get('destination')) {
      runSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookStay = async (stay) => {
    if (!user) {
      navigate('/login', {
        state: {
          from: `/stays?destination=${encodeURIComponent(query)}`,
        },
      });

      return;
    }

    try {
      await createBooking({
        userId: user.uid,
        destinationId: stay.id,
        destinationTitle: stay.name,
        title: stay.name,
        image: stay.picture,
        location: stay.location,
        type: 'Stay',
        date:
          checkInDate ||
          new Date().toISOString().slice(0, 10),
        guests: adults,
        price: stay.price,
        currency: stay.currency,
        providerBookingLink: stay.bookingLink || '',
      });

      navigate('/dashboard');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <Navbar />

      <section className="bg-neutral-950 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm">
            Ajax Stays
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2">
            Find your next stay.
          </h1>

          <p className="text-gray-400 mt-4">
            Search accommodation by destination and travel dates.
          </p>

          <form
            onSubmit={runSearch}
            className="mt-8 grid md:grid-cols-5 gap-3"
          >

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nairobi, Diani..."
              className="md:col-span-2 bg-white text-gray-900 px-4 py-4 rounded-xl"
            />

            <input
              type="date"
              value={checkInDate}
              onChange={(event) => setCheckInDate(event.target.value)}
              className="bg-white text-gray-900 px-4 py-4 rounded-xl"
            />

            <input
              type="date"
              value={checkOutDate}
              onChange={(event) => setCheckOutDate(event.target.value)}
              className="bg-white text-gray-900 px-4 py-4 rounded-xl"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-6 py-4 rounded-xl font-bold"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>

          </form>

          <div className="mt-3">
            <label className="text-sm text-gray-400">
              Adults
            </label>

            <select
              value={adults}
              onChange={(event) =>
                setAdults(Number(event.target.value))
              }
              className="ml-3 bg-white text-gray-900 px-3 py-2 rounded-lg"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>

        </div>

      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">

        {message && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
            {message}
          </div>
        )}

        {results.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {results.map((stay) => (

              <article
                key={stay.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition"
              >

                {stay.picture ? (
                  <img
                    src={stay.picture}
                    alt={stay.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                    Hotel image unavailable
                  </div>
                )}

                <div className="p-6">

                  <h2 className="text-xl font-bold">
                    {stay.name}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    📍 {stay.location}
                  </p>

                  <p className="text-sm mt-3">
                    ⭐ {stay.rating || 'N/A'}
                  </p>

                  {stay.available !== undefined && (
                    <p className="text-sm mt-2">
                      {stay.available
                        ? '✓ Available'
                        : 'Currently unavailable'}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-6">

                    <p className="font-bold text-red-600">
                      {stay.price
                        ? `${stay.currency || ''} ${stay.price}`
                        : 'Price unavailable'}
                    </p>

                    <button
                      onClick={() => bookStay(stay)}
                      className="bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-red-700"
                    >
                      Book
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>
        )}

      </main>

    </div>
  );
}