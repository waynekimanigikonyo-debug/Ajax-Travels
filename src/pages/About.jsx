import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <p className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm">
            About Ajax
          </p>

          <h1 className="text-5xl md:text-7xl font-black mt-3">
            Travel further.
            <br />
            Experience more.
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mt-6 leading-relaxed">
            Ajax is a travel platform designed to make discovering
            destinations, planning trips and finding memorable experiences
            simple.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-black">
              Your journey starts here.
            </h2>

            <p className="text-gray-600 leading-relaxed mt-6">
              Ajax brings destinations, stays and local experiences together
              in one platform. Whether you're looking for a Kenyan safari,
              relaxing beach holiday or an international adventure, Ajax
              makes it easier to discover your next destination.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              Browse destinations, explore experiences and create your next
              adventure from one convenient place.
            </p>

            <Link
              to="/"
              className="inline-block mt-7 bg-red-600 text-white px-7 py-3 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Explore Destinations
            </Link>
          </div>

          <div className="h-96 rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85"
              alt="Travel destination"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-black text-center">
            Why travel with Ajax?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="text-red-600 text-3xl">🌍</div>
              <h3 className="text-xl font-bold mt-4">
                Discover destinations
              </h3>
              <p className="text-gray-500 mt-3">
                Explore destinations across Kenya, Africa and the world.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="text-red-600 text-3xl">🏨</div>
              <h3 className="text-xl font-bold mt-4">
                Find places to stay
              </h3>
              <p className="text-gray-500 mt-3">
                Discover accommodation options for your next adventure.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="text-red-600 text-3xl">✨</div>
              <h3 className="text-xl font-bold mt-4">
                Local experiences
              </h3>
              <p className="text-gray-500 mt-3">
                Discover activities and experiences unique to each
                destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-red-600 text-white">
        <div className="max-w-5xl mx-auto text-center px-6 py-20">
          <h2 className="text-4xl md:text-5xl font-black">
            Ready to explore?
          </h2>

          <p className="text-red-100 mt-4 text-lg">
            Find your next destination and start planning.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-white text-red-600 px-8 py-3.5 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
}