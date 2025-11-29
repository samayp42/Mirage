
import React, { useEffect, useRef, useState } from 'react';
import { Style } from '../types';
import { generateStyledImage } from '../services/geminiService';
import { Scan, Zap, Cpu } from 'lucide-react';

interface LoadingScreenProps {
  capturedImage: string;
  style: Style;
  onComplete: (generatedImage: string) => void;
  onError: (errorMessage: string) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ capturedImage, style, onComplete, onError }) => {
  const hasStartedGeneration = useRef(false);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING NEURAL NET");

  useEffect(() => {
    // Fake progress bar for visual feedback
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 5;
        });
    }, 200);

    // Dynamic Text
    const texts = ["MAPPING FACIAL GEOMETRY", "ANALYZING LIGHTING", "APPLYING STYLE MATRIX", "RENDERING TEXTURES", "FINALIZING COMPOSITE"];
    let textIdx = 0;
    const textInterval = setInterval(() => {
        textIdx = (textIdx + 1) % texts.length;
        setLoadingText(texts[textIdx]);
    }, 1500);

    return () => {
        clearInterval(interval);
        clearInterval(textInterval);
    };
  }, []);

  useEffect(() => {
    if (hasStartedGeneration.current) return;
    hasStartedGeneration.current = true;

    const generateImage = async () => {
      try {
        const result = await generateStyledImage(capturedImage, style.prompt);
        setProgress(100);
        setTimeout(() => onComplete(result), 500); // Short delay to show 100%
      } catch (error) {
        console.error("Generation failed:", error);
        onError(error instanceof Error ? error.message : "An unknown error occurred.");
      }
    };
    generateImage();
  }, [capturedImage, style, onComplete, onError]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-black">
        
        {/* Background Image with GLITCH effect */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-pulse" 
            style={{ backgroundImage: `url(${capturedImage})` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Chromatic Aberration Layers (Glitch) */}
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen animate-[glitch_2s_infinite]" 
            style={{ backgroundImage: `url(${capturedImage})`, backgroundPosition: '2px 0', filter: 'hue-rotate(90deg)' }}
        ></div>
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen animate-[glitch_3s_infinite_reverse]" 
            style={{ backgroundImage: `url(${capturedImage})`, backgroundPosition: '-2px 0', filter: 'hue-rotate(-90deg)' }}
        ></div>

        {/* SCANNER LINE */}
        <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="w-full h-[50vh] bg-gradient-to-b from-transparent via-green-500/30 to-transparent border-b-2 border-green-400 animate-[scan_3s_ease-in-out_infinite]"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 flex flex-col items-center w-full max-w-xl px-8">
            
            {/* Tech Hexagon Spinner */}
            <div className="relative mb-12">
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
                <Scan className="w-24 h-24 text-green-400 animate-spin-slow" />
                <Cpu className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white animate-pulse" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4 text-center tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                Generating
            </h2>
            
            <p className="text-sm md:text-base font-mono text-green-200/80 text-center uppercase tracking-[0.3em] mb-12 h-6">
                {loadingText}
            </p>

            {/* Tech Progress Bar */}
            <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800 relative shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                <div 
                    className="h-full bg-green-500 relative transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/50 skew-x-12"></div>
                </div>
            </div>
            
            <div className="flex justify-between w-full mt-2 font-mono text-[10px] text-green-500/60">
                <span>SYS_READY</span>
                <span>{Math.round(progress)}%</span>
            </div>

            {/* Random Matrix Code */}
            <div className="mt-12 grid grid-cols-4 gap-4 opacity-30 text-[10px] font-mono text-green-500">
                <span className="animate-pulse">0xF3A2</span>
                <span>DATA_STREAM</span>
                <span className="animate-pulse delay-75">V_MATRIX</span>
                <span>Render_Core</span>
            </div>
        </div>
        
        <style>{`
            @keyframes scan {
                0% { transform: translateY(-100%); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(200%); opacity: 0; }
            }
            @keyframes glitch {
                0% { transform: translate(0, 0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0, 0); }
            }
            .animate-spin-slow {
                animation: spin 8s linear infinite;
            }
        `}</style>
    </div>
  );
};

export default LoadingScreen;
