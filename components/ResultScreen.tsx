
import React from 'react';
import { Download, X } from 'lucide-react';
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
    <div className="relative w-full h-full bg-black overflow-hidden animate-fade-in">
        
        {/* Full Screen Image Layer */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
            {/* Blurred Background for ambiance */}
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-3xl scale-110"
                style={{ backgroundImage: `url(${generatedImage})` }}
            ></div>
            
            {/* Main Image - Maximize Height for TV */}
            <img 
                src={generatedImage} 
                alt="Generated Portrait" 
                className="relative z-10 h-full w-full object-contain shadow-2xl" 
            />
        </div>

        {/* Minimal Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-30 bg-gradient-to-b from-black/80 to-transparent">
             <div className="flex flex-col">
                <span className="text-xs md:text-sm font-mono text-gray-400 uppercase tracking-[0.2em] mb-1">Mirage Studio</span>
                <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">{styleName}</h2>
             </div>
             <button 
                onClick={onStartOver} 
                className="p-4 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors border border-white/20 backdrop-blur-md"
            >
                <X size={28} />
             </button>
        </div>

        {/* Action Footer Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-12 px-12">
            <div className="flex flex-col-reverse md:flex-row gap-6 max-w-5xl mx-auto items-center justify-center">
                 
                 <button 
                    onClick={onTryAnotherStyle} 
                    className="px-8 py-4 rounded-full bg-black/40 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 uppercase tracking-widest font-mono text-sm transition-all"
                 >
                    Change Style
                 </button>
                 
                 <div className="flex-1 w-full md:w-auto flex justify-center">
                     {/* Primary CTA - Made Huge for TV */}
                     <button
                        onClick={onShowDownload}
                        className="flex items-center justify-center gap-4 px-12 py-6 bg-white text-black hover:bg-gray-200 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105 rounded-full"
                     >
                        <Download className="w-6 h-6" />
                        <span className="text-xl font-display font-bold uppercase tracking-wide">Save Portrait</span>
                     </button>
                 </div>
                 
                 <button 
                    onClick={onRetake} 
                    className="px-8 py-4 rounded-full bg-black/40 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 uppercase tracking-widest font-mono text-sm transition-all"
                 >
                    Retake Photo
                 </button>
            </div>
        </div>
    </div>
  );
};

export default ResultScreen;
