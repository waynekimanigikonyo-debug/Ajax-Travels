import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
      {/* Hero Image Background with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0 h-[70vh]">
        <img 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000" 
          alt="Safari Adventure" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-neutral-950"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-48 pb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-red-500 font-semibold mb-3">Curated Expeditions</span>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">KENYA</h1>
        <p className="max-w-xl text-gray-300 text-sm md:text-base leading-relaxed mb-12">
          Curated journeys across East Africa and top global destinations. Experience authentic safaris, pristine coastal retreats, and international getaways.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">20K+</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Happy Travellers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">2K+</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Custom Tours</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">5K+</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Arranged Stays</div>
          </div>
        </div>
      </div>
    </div>
  );
}