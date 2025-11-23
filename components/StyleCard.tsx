
import React from 'react';
import { Style } from '../types';
import { Plus } from 'lucide-react';

interface StyleCardProps {
  style: Style;
  onSelect: () => void;
}

const StyleCard: React.FC<StyleCardProps> = ({ style, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="group relative w-full aspect-[4/5] overflow-hidden bg-[#111] cursor-pointer focus:outline-none border border-white/5 hover:border-white/30 transition-all duration-500"
    >
      {/* Image */}
      <img
        src={style.previewImageUrl}
        alt={style.name}
        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end items-start text-left">
        <div className="flex items-center justify-between w-full mb-2">
            <h3 className="text-white text-xl font-display font-light leading-none tracking-tight">{style.name}</h3>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white text-black shrink-0 ml-4">
                <Plus size={16} />
            </div>
        </div>
        <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
            {style.description}
        </p>
        <div className="h-[1px] w-full bg-white/20 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
      </div>
    </button>
  );
};

export default StyleCard;
