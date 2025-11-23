
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft, RefreshCw, Aperture, Grid3X3 } from 'lucide-react';
import { Gender, Category } from '../types';

interface CaptureScreenProps {
  onCapture: (imageDataUrl: string, gender: Gender) => void;
  styleName: string;
  error: string | null;
  onBack: () => void;
  category: Category | null;
}

const CaptureScreen: React.FC<CaptureScreenProps> = ({ onCapture, styleName, error, onBack, category }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flash, setFlash] = useState(false);
  const [focusState, setFocusState] = useState<{ x: number; y: number; status: 'focusing' | 'locked' } | null>(null);
  const focusTimeoutRef = useRef<number | null>(null);
  
  const [selectedGender, setSelectedGender] = useState<Gender>('female');

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: "user"
          },
          audio: false
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => setIsCameraReady(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      if (focusTimeoutRef.current) window.clearTimeout(focusTimeoutRef.current);
    };
  }, []);

  const handleCapture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if(context){
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        onCapture(dataUrl, selectedGender);
    }
  }, [onCapture, selectedGender]);
  
  const handleFocus = useCallback((event: React.MouseEvent<HTMLVideoElement>) => {
    if (!videoRef.current) return;
    const rect = videoRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (focusTimeoutRef.current) window.clearTimeout(focusTimeoutRef.current);
    setFocusState({ x, y, status: 'focusing' });
    focusTimeoutRef.current = window.setTimeout(() => {
        setFocusState(prev => prev ? { ...prev, status: 'locked' } : null);
        focusTimeoutRef.current = window.setTimeout(() => {
            setFocusState(null);
        }, 1000); 
    }, 600);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col bg-black overflow-hidden">
      
      {/* HUD Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button 
            onClick={onBack} 
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all"
        >
            <ArrowLeft size={18} />
        </button>
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] mb-1">Selected Preset</span>
            <span className="text-sm font-display font-semibold text-white tracking-wide">{styleName}</span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center">
             <Grid3X3 size={18} className="text-white/30" />
        </div>
      </div>

      {/* Viewfinder */}
      <div className="relative flex-1 bg-[#050505] flex items-center justify-center overflow-hidden">
        {/* Rule of Thirds Grid */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
             <div className="w-full h-full border-x border-white/50 flex">
                <div className="flex-1 border-r border-white/50"></div>
                <div className="flex-1 border-r border-white/50"></div>
             </div>
             <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 border-b border-white/50"></div>
                <div className="flex-1 border-b border-white/50"></div>
                <div className="flex-1"></div>
             </div>
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ transform: 'scaleX(-1)' }} 
          className={`h-full w-full object-cover transition-opacity duration-700 ${isCameraReady ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleFocus}
        />
        
        {focusState && (
            <div
                className={`absolute w-16 h-16 border border-white/80 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 animate-focus-lock`}
                style={{ left: focusState.x, top: focusState.y }}
            >
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white transform -translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute left-0 top-1/2 w-1 h-1 bg-white transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-1 h-1 bg-white transform translate-x-1/2 -translate-y-1/2"></div>
            </div>
        )}

        {!isCameraReady && (
            <div className="absolute flex flex-col items-center">
                <RefreshCw className="w-6 h-6 text-white/30 animate-spin mb-4" />
                <p className="text-white/30 font-mono text-xs tracking-widest">INITIALIZING SENSOR</p>
            </div>
        )}

        {flash && <div className="absolute inset-0 bg-white animate-fade-out duration-150 z-50" />}
      </div>

      {/* Controls HUD */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center justify-end z-20 pb-10 gap-8">
        
        {/* Technical Indicators */}
        <div className="flex gap-8 text-[10px] font-mono text-gray-500 uppercase tracking-widest opacity-60">
             <span>ISO 200</span>
             <span>f/2.8</span>
             <span>1/125</span>
             <span>AWB</span>
        </div>

        {/* Gender Toggle */}
        {category !== 'couple' && (
            <div className="flex gap-6">
                 <button 
                    onClick={() => setSelectedGender('female')}
                    className={`text-xs font-medium tracking-widest uppercase px-2 py-1 border-b border-transparent transition-all ${selectedGender === 'female' ? 'text-white border-white' : 'text-gray-600'}`}
                 >
                    Female
                 </button>
                 <button 
                    onClick={() => setSelectedGender('male')}
                    className={`text-xs font-medium tracking-widest uppercase px-2 py-1 border-b border-transparent transition-all ${selectedGender === 'male' ? 'text-white border-white' : 'text-gray-600'}`}
                 >
                    Male
                 </button>
            </div>
        )}

        {/* Shutter Button */}
        <div className="relative">
            <button
                onClick={handleCapture}
                disabled={!isCameraReady}
                className="relative w-20 h-20 rounded-full border border-white transition-all duration-200 active:scale-95 flex items-center justify-center group hover:bg-white/10"
                aria-label="Capture"
            >
                <div className="w-16 h-16 rounded-full bg-white"></div>
            </button>
        </div>
      </div>
        
       {error && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900/90 text-white px-8 py-4 rounded-none border border-red-500/30 shadow-2xl z-50">
            <p className="font-mono text-sm">{error}</p>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CaptureScreen;
