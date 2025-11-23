
import React from 'react';
import { Category } from '../types';
import { Aperture } from 'lucide-react';

interface WelcomeScreenProps {
  onCategorySelect: (category: Category) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCategorySelect }) => {
  return (
    <div className="flex flex-col h-full w-full animate-fade-in bg-[#050505]">
      {/* Branding Header */}
      <div className="absolute top-0 left-0 p-8 md:p-12 z-30">
        <div className="flex items-center gap-3 mb-2 opacity-80">
           <Aperture className="w-5 h-5" />
           <span className="text-xs font-mono tracking-[0.3em] uppercase">Creative AI Studio</span>
        </div>
        <h1 className="font-display text-6xl md:text-8xl font-light tracking-tighter text-white leading-none">
          MIRAGE
        </h1>
        <p className="text-xs font-mono text-gray-500 mt-2 tracking-widest">v2.0 — ULTRA REALISM ENGINE</p>
      </div>

      {/* Main Selection Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 h-full w-full">
        
        {/* Adult Column */}
        <button
          onClick={() => onCategorySelect('adult')}
          className="group relative h-full border-r border-white/5 focus:outline-none"
        >
          {/* Background Image - Updated to Bollywood/Red Carpet Theme */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center grayscale brightness-[0.3] group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700 ease-out"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-10 w-full text-left">
            <span className="block text-xs font-mono text-gray-400 mb-2 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">01</span>
            <h2 className="text-4xl font-display text-white font-light tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">Adult</h2>
            <div className="h-[1px] w-8 bg-white/50 group-hover:w-full transition-all duration-700"></div>
            <p className="mt-4 text-sm text-gray-300 font-light opacity-60 group-hover:opacity-100 transition-opacity duration-500 max-w-[200px]">
              Bollywood Glamour, Royal Heritage & Vintage Aesthetics.
            </p>
          </div>
        </button>

        {/* Couple Column */}
        <button
          onClick={() => onCategorySelect('couple')}
          className="group relative h-full border-r border-white/5 focus:outline-none"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center grayscale brightness-[0.3] group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700 ease-out"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

          <div className="absolute bottom-0 left-0 p-10 w-full text-left">
            <span className="block text-xs font-mono text-gray-400 mb-2 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">02</span>
            <h2 className="text-4xl font-display text-white font-light tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">Couple</h2>
            <div className="h-[1px] w-8 bg-white/50 group-hover:w-full transition-all duration-700"></div>
            <p className="mt-4 text-sm text-gray-300 font-light opacity-60 group-hover:opacity-100 transition-opacity duration-500 max-w-[200px]">
              Weddings, Romance, & Editorial Duos.
            </p>
          </div>
        </button>

        {/* Child Column */}
        <button
          onClick={() => onCategorySelect('child')}
          className="group relative h-full focus:outline-none"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center grayscale brightness-[0.3] group-hover:grayscale-0 group-hover:brightness-75 transition-all duration-700 ease-out"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

          <div className="absolute bottom-0 left-0 p-10 w-full text-left">
            <span className="block text-xs font-mono text-gray-400 mb-2 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">03</span>
            <h2 className="text-4xl font-display text-white font-light tracking-tight mb-2 group-hover:translate-x-2 transition-transform duration-500">Kids</h2>
            <div className="h-[1px] w-8 bg-white/50 group-hover:w-full transition-all duration-700"></div>
             <p className="mt-4 text-sm text-gray-300 font-light opacity-60 group-hover:opacity-100 transition-opacity duration-500 max-w-[200px]">
              Superheroes, Fantasy, & Toon styles.
            </p>
          </div>
        </button>

      </div>
    </div>
  );
};

export default WelcomeScreen;
