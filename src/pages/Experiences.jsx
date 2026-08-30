import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { searchExperiences } from '../services/tourService';
import { createBooking } from '../services/bookingService';
import { useAuth } from '../context/AuthContext';

export default function Experiences() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [query, setQuery] = useState(
    params.get('destination') || ''
  );

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const runSearch = async (event) => {
    event?.preventDefault();

    if (query.trim().length < 3) {
      setMessage('Enter at least 3 characters.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const data = await searchExperiences(query.trim());
      setResults(data);

      if (data.length === 0) {
        setMessage('No experiences found for this destination.');
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

  const bookExperience = async (experience) => {
    if (!user) {
      navigate('/login', {
        state: {
          from: `/experiences?destination=${encodeURIComponent(query)}`,
        },
      });

      return;
    }

    try {
      await createBooking({
        userId: user.uid,
        destinationId: experience.id,
        destinationTitle: experience.name,
        title: experience.name,
        image: experience.picture,
        location: experience.location,
        type: 'Experience',
        date: new Date().toISOString().slice(0, 10),
        guests: 1,
        price: experience.price,
        currency: experience.currency,
        providerBookingLink: experience.bookingLink || '',
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
            Ajax Experiences
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2">
            Discover local experiences.
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl">
            Search destinations and discover activities,
            tours and unforgettable experiences.
          </p>

          <form
            onSubmit={runSearch}
            className="mt-8 flex flex-col md:flex-row gap-3 max-w-3xl"
          >

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Nairobi, Diani, Maasai Mara..."
              className="flex-1 bg-white text-gray-900 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>

          </form>

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

            {results.map((experience) => (

              <article
                key={experience.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition"
              >

                {experience.picture ? (
                  <img
                    src={experience.picture}
                    alt={experience.name}
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}

                <div className="p-6">

                  <div className="flex justify-between gap-3">

                    <h2 className="text-xl font-bold">
                      {experience.name}
                    </h2>

                    {experience.rating && (
                      <span className="text-sm">
                        ⭐ {experience.rating}
                      </span>
                    )}

                  </div>

                  <p className="text-gray-500 text-sm mt-3">
                    {experience.location}
                  </p>

                  <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                    {experience.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mt-6">

                    <div>
                      <p className="text-xs text-gray-400 uppercase">
                        From
                      </p>

                      <p className="text-lg font-bold text-red-600">
                        {experience.price
                          ? `${experience.currency || ''} ${experience.price}`
                          : 'Price unavailable'}
                      </p>
                    </div>

                    <button
                      onClick={() => bookExperience(experience)}
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