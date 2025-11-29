
import React, { useState } from 'react';
import { Style, Category, Gender } from '../types';
import { ArrowLeft, User, UserCheck } from 'lucide-react';
import StyleCard from './StyleCard';

interface StyleSelectionScreenProps {
  styles: Style[];
  onStyleSelect: (style: Style, gender?: Gender) => void;
  onBack: () => void;
  category: Category | null;
}

const StyleSelectionScreen: React.FC<StyleSelectionScreenProps> = ({ styles, onStyleSelect, onBack, category }) => {
  const [selectedStyleForModal, setSelectedStyleForModal] = useState<Style | null>(null);

  const handleStyleClick = (style: Style) => {
    if (category === 'couple') {
        onStyleSelect(style);
    } else {
        setSelectedStyleForModal(style);
    }
  };

  const handleGenderSelect = (gender: Gender) => {
    if (selectedStyleForModal) {
        onStyleSelect(selectedStyleForModal, gender);
        setSelectedStyleForModal(null);
    }
  };

  return (
    <div className="flex flex-col h-full w-full animate-fade-in bg-[#050505] relative">
        {/* Header - Scaled up for TV */}
        <div className="flex items-center justify-between px-10 py-8 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 z-20 sticky top-0">
             <div className="flex items-center gap-8">
                <button 
                    onClick={onBack} 
                    className="group p-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-3xl font-display font-medium text-white tracking-wide">Select Aesthetic</h2>
                    <p className="text-sm text-gray-500 font-mono mt-1 uppercase tracking-widest">Tap a card to begin</p>
                </div>
             </div>
        </div>

      {/* Grid Content - Bigger Cards (Max 3 cols for TV visibility) */}
      <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-[95%] mx-auto pb-20">
            {styles.map((style, index) => (
              <div key={style.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                 <StyleCard style={style} onSelect={() => handleStyleClick(style)} />
              </div>
            ))}
          </div>
      </div>

      {/* Gender Selection Modal - Scaled Up */}
      {selectedStyleForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl animate-fade-in">
            <div className="bg-[#111] border border-white/10 p-12 rounded-[2rem] max-w-2xl w-full shadow-2xl transform scale-100 transition-all">
                <h3 className="text-4xl font-display font-light text-white text-center mb-4">Subject Identity</h3>
                <p className="text-gray-400 text-sm text-center font-mono uppercase tracking-widest mb-12">
                    Select for accurate AI styling
                </p>

                <div className="grid grid-cols-2 gap-8">
                    <button 
                        onClick={() => handleGenderSelect('female')}
                        className="group flex flex-col items-center justify-center p-10 rounded-3xl bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all duration-300 gap-6"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                            <User size={40} className="group-hover:text-black" />
                        </div>
                        <span className="font-display font-medium text-2xl tracking-wide">Female</span>
                    </button>

                    <button 
                        onClick={() => handleGenderSelect('male')}
                        className="group flex flex-col items-center justify-center p-10 rounded-3xl bg-white/5 hover:bg-white hover:text-black border border-white/10 transition-all duration-300 gap-6"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                            <UserCheck size={40} className="group-hover:text-black" />
                        </div>
                        <span className="font-display font-medium text-2xl tracking-wide">Male</span>
                    </button>
                </div>

                <button 
                    onClick={() => setSelectedStyleForModal(null)}
                    className="w-full mt-10 py-6 text-sm font-mono text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default StyleSelectionScreen;
