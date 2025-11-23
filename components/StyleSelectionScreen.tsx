
import React from 'react';
import { Style } from '../types';
import { ArrowLeft } from 'lucide-react';
import StyleCard from './StyleCard';

interface StyleSelectionScreenProps {
  styles: Style[];
  onStyleSelect: (style: Style) => void;
  onBack: () => void;
}

const StyleSelectionScreen: React.FC<StyleSelectionScreenProps> = ({ styles, onStyleSelect, onBack }) => {
  return (
    <div className="flex flex-col h-full w-full animate-fade-in bg-[#050505]">
        {/* Minimal Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 z-20 sticky top-0">
             <div className="flex items-center gap-6">
                <button 
                    onClick={onBack} 
                    className="group p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
                >
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h2 className="text-xl font-display font-medium text-white tracking-wide">Select Aesthetic</h2>
                    <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-widest">Define your look</p>
                </div>
             </div>
             <div className="hidden md:block text-xs font-mono text-gray-600">
                 {styles.length} PRESETS AVAILABLE
             </div>
        </div>

      {/* Grid Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 max-w-7xl mx-auto pb-12">
            {styles.map((style, index) => (
              <div key={style.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                 <StyleCard style={style} onSelect={() => onStyleSelect(style)} />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default StyleSelectionScreen;
