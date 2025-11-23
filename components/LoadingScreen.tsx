
import React, { useEffect } from 'react';
import { Style } from '../types';
import { generateStyledImage } from '../services/geminiService';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  capturedImage: string;
  style: Style;
  onComplete: (generatedImage: string) => void;
  onError: (errorMessage: string) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ capturedImage, style, onComplete, onError }) => {
  useEffect(() => {
    const generateImage = async () => {
      try {
        const result = await generateStyledImage(capturedImage, style.prompt);
        onComplete(result);
      } catch (error) {
        console.error("Generation failed:", error);
        onError(error instanceof Error ? error.message : "An unknown error occurred.");
      }
    };
    generateImage();
  }, [capturedImage, style, onComplete, onError]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
        <div 
            className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20 scale-105 grayscale" 
            style={{ backgroundImage: `url(${capturedImage})` }}
        ></div>
        
        <div className="relative z-10 flex flex-col items-center w-full max-w-md px-8">
            <Loader2 className="w-8 h-8 text-white animate-spin mb-8 opacity-80" />
            
            <h2 className="text-4xl font-display font-light text-white mb-2 text-center tracking-tight">Processing</h2>
            <p className="text-xs font-mono text-gray-500 text-center uppercase tracking-[0.2em] mb-12">
                Applying {style.name} Matrix
            </p>

            <div className="w-full h-[1px] bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-white w-1/2 animate-[shimmer_2s_infinite_ease-in-out]"></div>
            </div>
            <div className="mt-4 flex justify-between w-full text-[10px] font-mono text-gray-600">
                <span>0010110</span>
                <span>RENDERING</span>
                <span>1011011</span>
            </div>
        </div>
        
        <style>{`
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(200%); }
            }
        `}</style>
    </div>
  );
};

export default LoadingScreen;
