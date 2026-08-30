import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const destinations = [
  {
    id: 'maasai-mara',
    name: 'Maasai Mara',
    country: 'Kenya',
    location: 'Narok, Kenya',
    price: 'KES 45,000',
    category: 'Safari',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'diani-beach',
    name: 'Diani Beach',
    country: 'Kenya',
    location: 'Kwale, Kenya',
    price: 'KES 32,000',
    category: 'Beach',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'zanzibar',
    name: 'Zanzibar',
    country: 'Tanzania',
    location: 'Zanzibar, Tanzania',
    price: 'USD 150',
    category: 'Beach',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    location: 'Cape Town, South Africa',
    price: 'USD 210',
    category: 'City',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    location: 'Dubai, United Arab Emirates',
    price: 'USD 500',
    category: 'Luxury',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'serengeti',
    name: 'Serengeti',
    country: 'Tanzania',
    location: 'Serengeti, Tanzania',
    price: 'USD 350',
    category: 'Safari',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'victoria-falls',
    name: 'Victoria Falls',
    country: 'Zimbabwe',
    location: 'Victoria Falls, Zimbabwe',
    price: 'USD 180',
    category: 'Adventure',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'seychelles',
    name: 'Seychelles',
    country: 'Seychelles',
    location: 'Mahé, Seychelles',
    price: 'USD 400',
    category: 'Beach',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=1000&q=80',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [destination, setDestination] = useState('');
  const [filteredDestinations, setFilteredDestinations] =
    useState(destinations);

  useEffect(() => {
    const search = destination.trim().toLowerCase();

    if (!search) {
      setFilteredDestinations(destinations);
      return;
    }

    const results = destinations.filter((item) =>
      `${item.name} ${item.country} ${item.location} ${item.category}`
        .toLowerCase()
        .includes(search)
    );

    setFilteredDestinations(results);
  }, [destination]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!destination.trim()) {
      document
        .getElementById('destinations')
        ?.scrollIntoView({ behavior: 'smooth' });

      return;
    }

    document
      .getElementById('destinations')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = (item) => {
    if (!user) {
      navigate('/login', {
        state: {
          from: `/stays?destination=${encodeURIComponent(item.name)}`,
        },
      });
      return;
    }

    navigate(`/stays?destination=${encodeURIComponent(item.name)}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=85"
          alt="African safari"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
          <div className="max-w-3xl text-white">
            <p className="uppercase tracking-[0.3em] text-sm font-semibold mb-5">
              Discover • Explore • Experience
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Your next adventure
              <span className="text-red-500"> starts here.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mt-6 max-w-2xl">
              Discover incredible destinations, find beautiful places to stay
              and experience the world with Ajax.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() =>
                  document
                    .getElementById('destinations')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-lg font-bold transition"
              >
                Explore Destinations
              </button>

              <Link
                to="/experiences"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-lg font-bold transition"
              >
                Local Experiences
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Where do you want to go?</h2>

            <p className="text-sm text-gray-500 mt-1">
              Search destinations, stays and experiences.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Maasai Mara, Zanzibar, Diani..."
              className="flex-1 px-5 py-4 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition"
            >
              Search
            </button>
          </form>

          <p className="text-xs text-gray-400 mt-3">
            Browse destinations freely. Sign in is required to book a trip.
          </p>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section
        id="destinations"
        className="max-w-7xl mx-auto px-6 py-24"
      >
        <div className="mb-10">
          <p className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm">
            Explore the world
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-2">
            Popular destinations
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl">
            Discover destinations across Kenya, Africa and beyond.
          </p>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 border border-gray-200 rounded-2xl">
            <p className="text-xl font-bold">No destinations found</p>

            <p className="text-gray-500 mt-2">
              Try searching for Kenya, safari, beach or another destination.
            </p>

            <button
              onClick={() => setDestination('')}
              className="mt-5 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Show all destinations
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDestinations.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                    ★ {item.rating}
                  </div>

                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-xs uppercase tracking-widest">
                      {item.country}
                    </p>

                    <h3 className="text-2xl font-bold">{item.name}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm text-gray-500">{item.location}</p>

                  <p className="text-xs text-gray-400 uppercase tracking-wide mt-3">
                    Starting from
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-lg font-bold text-red-600">
                      {item.price}
                    </p>

                    <button
                      onClick={() => handleBooking(item)}
                      className="text-sm font-semibold text-gray-900 hover:text-red-600 transition"
                    >
                      {user ? 'Book →' : 'View →'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* STATS */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-black">20K+</p>
              <p className="text-gray-400 text-sm tracking-[0.2em] mt-3">
                HAPPY TRAVELLERS
              </p>
            </div>

            <div>
              <p className="text-5xl font-black">50+</p>
              <p className="text-gray-400 text-sm tracking-[0.2em] mt-3">
                DESTINATIONS
              </p>
            </div>

            <div>
              <p className="text-5xl font-black">100+</p>
              <p className="text-gray-400 text-sm tracking-[0.2em] mt-3">
                EXPERIENCES
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm">
              About Ajax
            </p>

            <h2 className="text-4xl md:text-5xl font-black mt-3">
              Travel further.
              <br />
              Experience more.
            </h2>

            <p className="text-gray-600 leading-relaxed mt-6">
              Ajax is a travel platform built to make discovering, planning
              and experiencing new destinations easier.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              From finding the perfect stay to discovering unforgettable local
              experiences, Ajax brings your journey together in one simple
              platform.
            </p>

            <Link
              to="/about"
              className="inline-block mt-7 bg-red-600 text-white px-7 py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              About Ajax
            </Link>
          </div>

          <div className="h-96 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85"
              alt="Beautiful travel destination"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 text-white">
        <div className="max-w-5xl mx-auto text-center px-6 py-20">
          <h2 className="text-4xl md:text-5xl font-black">
            Ready for your next adventure?
          </h2>

          <p className="text-red-100 mt-4 text-lg">
            Find your destination and start planning your journey today.
          </p>

          <button
            onClick={() =>
              document
                .getElementById('destinations')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mt-8 bg-white text-red-600 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Explore Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <p className="text-white text-2xl font-black tracking-[0.2em]">
                AJAX
              </p>

              <p className="text-sm mt-2">
                Discover. Explore. Experience.
              </p>
            </div>

            <div className="flex gap-6 text-sm">
              <Link to="/about" className="hover:text-white">
                About
              </Link>

              <Link to="/stays" className="hover:text-white">
                Stays
              </Link>

              <Link to="/experiences" className="hover:text-white">
                Experiences
              </Link>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-xs">
            © 2026 Ajax Travel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}