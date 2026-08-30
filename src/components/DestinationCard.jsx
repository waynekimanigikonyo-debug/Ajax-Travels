import React from 'react';

export default function DestinationCard({ item }) {
  return (
    <div className="group relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition duration-300">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white uppercase tracking-wider">
          {item.type}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white">{item.title}</h3>
          <span className="text-xs text-yellow-400 flex items-center gap-1">
            ★ {item.rating}
          </span>
        </div>
        
        <p className="text-xs text-gray-400 mb-4">{item.location}</p>
        
        <div className="flex justify-between items-center pt-4 border-t border-white/5">
          <span className="text-sm font-semibold text-white">{item.price}</span>
          <button className="text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 transition">
            Explore →
          </button>
        </div>
      </div>
    </div>
  );
}