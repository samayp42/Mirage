
import React, { useState, useEffect } from 'react';
import { Sparkles, Aperture } from 'lucide-react';
import { ADULT_STYLES, KID_STYLES } from '../constants';

interface IdleScreenProps {
  onStart: () => void;
}

const ALL_PREVIEWS = [
  ...ADULT_STYLES.map(s => s.previewImageUrl),
  ...KID_STYLES.map(s => s.previewImageUrl)
];

const IdleScreen: React.FC<IdleScreenProps> = ({ onStart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ALL_PREVIEWS.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      onClick={onStart}
      className="relative w-full h-full bg-black overflow-hidden cursor-pointer group"
    >
      {/* Background Slideshow */}
      {ALL_PREVIEWS.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImageIndex ? 'opacity-60 scale-110' : 'opacity-0 scale-100'
          }`}
          style={{ 
            backgroundImage: `url(${img})`,
            transitionProperty: 'opacity, transform',
            transform: index === currentImageIndex ? 'scale(1.1)' : 'scale(1.0)'
          }}
        />
      ))}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80"></div>

      {/* Floating Particles / Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-12 text-center">
        
        {/* Animated Icon */}
        <div className="mb-12 relative">
            <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full animate-pulse"></div>
            <Aperture className="w-24 h-24 text-white animate-[spin_10s_linear_infinite]" />
        </div>

        {/* Main Title */}
        <h1 className="text-7xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter mb-8 drop-shadow-2xl">
          MIRAGE
        </h1>

        <p className="text-xl md:text-3xl font-mono text-gray-300 tracking-[0.5em] uppercase mb-20 animate-pulse">
          AI Portrait Studio
        </p>

        {/* CTA */}
        <div className="group-hover:scale-110 transition-transform duration-500">
            <div className="px-12 py-6 border border-white/30 bg-white/10 backdrop-blur-md rounded-full flex items-center gap-4 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce" />
                <span className="text-xl font-display font-medium text-white tracking-widest">TOUCH TO START</span>
                <Sparkles className="w-6 h-6 text-yellow-300 animate-bounce delay-100" />
            </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="absolute bottom-12 w-full text-center">
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
            Powered by Gemini 2.5 Flash • Ultra-Realism Engine
        </p>
      </div>
      
      {/* CSS for Slow Zoom Effect handled inline style above */}
    </div>
  );
};

export default IdleScreen;
