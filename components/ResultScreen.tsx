
import React from 'react';
import { Camera, Repeat, Download, X, Share2 } from 'lucide-react';
import IconButton from './IconButton';

interface ResultScreenProps {
  generatedImage: string;
  styleName: string;
  onRetake: () => void;
  onTryAnotherStyle: () => void;
  onShowDownload: () => void;
  onStartOver: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ generatedImage, styleName, onRetake, onTryAnotherStyle, onShowDownload, onStartOver }) => {
  return (
    <div className="flex flex-col w-full h-full bg-[#050505] animate-fade-in">
        {/* Minimal Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-30">
             <div className="flex flex-col">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Collection</span>
                <h2 className="text-lg font-display font-medium text-white">{styleName}</h2>
             </div>
             <button onClick={onStartOver} className="p-2 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors">
                <X size={20} />
             </button>
        </div>

      {/* Main Image Stage */}
      <div className="flex-1 relative flex items-center justify-center p-8 md:p-16 bg-black">
        <div className="relative z-10 h-full max-h-[80vh] aspect-[3/4] shadow-2xl animate-slide-up">
            <img 
                src={generatedImage} 
                alt="Generated Portrait" 
                className="w-full h-full object-contain bg-[#111]" 
            />
            {/* Watermark subtle */}
            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/30 uppercase tracking-widest">
                MIRAGE STUDIO
            </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-8 bg-[#050505] border-t border-white/5">
        <div className="flex flex-col md:flex-row gap-6 max-w-3xl mx-auto items-center justify-center">
             <button onClick={onTryAnotherStyle} className="text-xs font-mono text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                Change Style
             </button>
             
             <div className="flex-1 w-full flex gap-4">
                 <IconButton Icon={Download} label="Save Portrait" onClick={onShowDownload} variant="primary" className="flex-1" />
             </div>
             
             <button onClick={onRetake} className="text-xs font-mono text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                Retake
             </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
