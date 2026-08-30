import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const destinations = [
    {
      name: 'Maasai Mara',
      country: 'Kenya',
      price: 'From $180',
      image:
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
    },
    {
      name: 'Diani Beach',
      country: 'Kenya',
      price: 'From $120',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    },
    {
      name: 'Zanzibar',
      country: 'Tanzania',
      price: 'From $150',
      image:
        'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1000&q=80',
    },
    {
      name: 'Cape Town',
      country: 'South Africa',
      price: 'From $210',
      image:
        'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    if (!destination.trim()) return;

    const user = localStorage.getItem('ajaxUser');

    if (!user) {
      navigate('/login');
      return;
    }

    navigate(`/stays?destination=${destination}`);
  };

  const handleBooking = () => {
    const user = localStorage.getItem('ajaxUser');

    if (!user) {
      navigate('/login');
      return;
    }

    navigate('/stays');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=2000&q=85"
          alt="African safari"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Hero Content */}
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
              Discover incredible destinations, find beautiful places to
              stay and experience the world with Ajax.
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
            <h2 className="text-xl font-bold">
              Where do you want to go?
            </h2>

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
            You can browse destinations freely. Sign in is required to
            check availability or make a booking.
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
            Start your journey by exploring some of the destinations
            travellers love most.
          </p>

        </div>

        {/* DESTINATION CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {destinations.map((destination) => (

            <div
              key={destination.name}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition duration-300"
            >

              {/* Image */}
              <div className="relative h-64 overflow-hidden">

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-4 text-white">

                  <p className="text-xs uppercase tracking-widest">
                    {destination.country}
                  </p>

                  <h3 className="text-2xl font-bold">
                    {destination.name}
                  </h3>

                </div>

              </div>

              {/* Card Content */}
              <div className="p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Starting from
                    </p>

                    <p className="text-lg font-bold text-red-600">
                      {destination.price}
                    </p>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="text-sm font-semibold text-gray-900 hover:text-red-600 transition"
                  >
                    View →
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

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
              Ajax is a travel platform built to make discovering,
              planning and experiencing new destinations easier.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              From finding the perfect stay to discovering unforgettable
              local experiences, Ajax brings your journey together in one
              simple platform.
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