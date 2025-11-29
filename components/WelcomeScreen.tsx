
import React, { useEffect, useState } from 'react';
import { Category } from '../types';
import { Aperture, History, Camera } from 'lucide-react';
import { getGenerationCount } from '../services/db';

interface WelcomeScreenProps {
  onCategorySelect: (category: Category) => void;
  onOpenGallery: () => void;
  onGoIdle: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onCategorySelect, onOpenGallery, onGoIdle }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getGenerationCount());
  }, []);

  return (
    <div className="flex flex-col h-full w-full animate-fade-in bg-[#050505]">
      {/* Branding Header */}
      <div className="absolute top-0 left-0 p-10 md:p-16 z-30 flex justify-between w-full pointer-events-none">
        
        {/* Clickable Branding to Go Idle */}
        <div onClick={onGoIdle} className="pointer-events-auto cursor-pointer group hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-4 mb-4 opacity-80">
            <Aperture className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-700" />
            <span className="text-sm md:text-base font-mono tracking-[0.4em] uppercase">Creative AI Studio</span>
            </div>
            <h1 className="font-display text-7xl md:text-9xl font-light tracking-tighter text-white leading-none">
            MIRAGE
            </h1>
            <div className="flex items-center gap-6 mt-6">
                <p className="text-sm md:text-base font-mono text-gray-500 tracking-widest">v2.0 — ULTRA REALISM ENGINE</p>
                <div className="h-6 w-[1px] bg-gray-800"></div>
                <div className="flex items-center gap-3 text-sm md:text-base font-mono text-white/60">
                    <Camera size={16} />
                    <span>{count.toString().padStart(4, '0')} GENERATIONS</span>
                </div>
            </div>
        </div>

        {/* Gallery Button - Larger for TV */}
        <button 
            onClick={onOpenGallery}
            className="pointer-events-auto flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all h-fit group"
        >
            <History className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-white" />
            <span className="text-sm md:text-base font-mono uppercase tracking-widest text-gray-400 group-hover:text-white">Gallery</span>
        </button>
      </div>

      {/* Main Selection Grid - Changed to 2 columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full w-full">
        
        {/* Adult Column */}
        <button
          onClick={() => onCategorySelect('adult')}
          className="group relative h-full border-b md:border-b-0 md:border-r border-white/5 focus:outline-none overflow-hidden"
        >
          {/* Background Image - Updated to requested URL */}
          <div className="absolute inset-0 bg-[url('https://www.francescolejones.com/wp-content/uploads/2013/05/DebraVanCleve_Group_of_Young_Adult_Friends_iStock_000016037243Medium-resized-600.jpg.png')] bg-cover bg-center grayscale brightness-[0.5] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700 ease-out scale-100 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-12 md:p-20 w-full text-left z-10">
            <span className="block text-sm md:text-base font-mono text-gray-400 mb-4 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">01</span>
            <h2 className="text-5xl md:text-7xl font-display text-white font-light tracking-tight mb-4 group-hover:translate-x-4 transition-transform duration-500">Adult</h2>
            <div className="h-[2px] w-12 bg-white/50 group-hover:w-full transition-all duration-700"></div>
            <p className="mt-6 text-base md:text-xl text-gray-300 font-light opacity-60 group-hover:opacity-100 transition-opacity duration-500 max-w-md leading-relaxed">
              Bollywood Glamour, Royal Heritage & Vintage Aesthetics.
            </p>
          </div>
        </button>

        {/* Child Column */}
        <button
          onClick={() => onCategorySelect('child')}
          className="group relative h-full focus:outline-none overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center grayscale brightness-[0.5] group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700 ease-out scale-100 group-hover:scale-105"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90"></div>

          <div className="absolute bottom-0 left-0 p-12 md:p-20 w-full text-left z-10">
            <span className="block text-sm md:text-base font-mono text-gray-400 mb-4 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">02</span>
            <h2 className="text-5xl md:text-7xl font-display text-white font-light tracking-tight mb-4 group-hover:translate-x-4 transition-transform duration-500">Kids</h2>
            <div className="h-[2px] w-12 bg-white/50 group-hover:w-full transition-all duration-700"></div>
             <p className="mt-6 text-base md:text-xl text-gray-300 font-light opacity-60 group-hover:opacity-100 transition-opacity duration-500 max-w-md leading-relaxed">
              Superheroes, Fantasy, & Toon styles.
            </p>
          </div>
        </button>

      </div>
    </div>
  );
};

export default WelcomeScreen;
