
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft, RefreshCw, SwitchCamera } from 'lucide-react';
import { Gender, Category } from '../types';

interface CaptureScreenProps {
  onCapture: (imageDataUrl: string) => void;
  styleName: string;
  error: string | null;
  onBack: () => void;
  category: Category | null;
  selectedGender: Gender;
}

const CaptureScreen: React.FC<CaptureScreenProps> = ({ onCapture, styleName, error, onBack, category, selectedGender }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [flash, setFlash] = useState(false);
  const [focusState, setFocusState] = useState<{ x: number; y: number; status: 'focusing' | 'locked' } | null>(null);
  const focusTimeoutRef = useRef<number | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  useEffect(() => {
    async function setupCamera() {
      setIsCameraReady(false);
      try {
        if (videoRef.current && videoRef.current.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: facingMode
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
  }, [facingMode]);

  const toggleCamera = useCallback(() => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
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
        // Only mirror if using front camera
        if (facingMode === 'user') {
            context.scale(-1, 1);
        } else {
            context.scale(1, 1);
        }
        context.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        onCapture(dataUrl);
    }
  }, [onCapture, facingMode]);
  
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
    <div className="relative w-full h-full bg-black overflow-hidden">
      
      {/* HUD Header */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 md:p-6 flex justify-between items-start pointer-events-none">
        <button 
            onClick={onBack} 
            className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-lg"
        >
            <ArrowLeft size={20} />
        </button>
        
        <div className="flex flex-col items-center px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-lg mx-2 max-w-[50%]">
            <span className="text-[8px] md:text-[10px] font-mono text-gray-400 uppercase tracking-[0.2em] mb-1">Preset</span>
            <span className="text-xs md:text-sm font-display font-semibold text-white tracking-wide whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">{styleName}</span>
        </div>

        <button 
            onClick={toggleCamera}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all shadow-lg"
        >
             <SwitchCamera size={20} />
        </button>
      </div>

      {/* Viewfinder (Background Layer) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
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
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }} 
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
            <div className="absolute flex flex-col items-center z-20">
                <RefreshCw className="w-6 h-6 text-white/30 animate-spin mb-4" />
                <p className="text-white/30 font-mono text-xs tracking-widest">INITIALIZING SENSOR</p>
            </div>
        )}

        {flash && <div className="absolute inset-0 bg-white animate-fade-out duration-150 z-50" />}
      </div>

      {/* Controls HUD - Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center justify-end pb-12 pt-16 gap-6">
        
        {/* Technical Indicators */}
        <div className="flex gap-4 md:gap-6 px-4 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/5 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
             <span>ISO AUTO</span>
             <span>RAW</span>
             <span className="text-white font-bold">{selectedGender.toUpperCase()}</span>
        </div>

        {/* Shutter Button */}
        <div className="relative">
            <button
                onClick={handleCapture}
                disabled={!isCameraReady}
                className="relative w-20 h-20 rounded-full border-4 border-white/30 transition-all duration-200 active:scale-95 flex items-center justify-center group bg-white/10 backdrop-blur-sm hover:bg-white/20"
                aria-label="Capture"
            >
                <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-transform group-hover:scale-95"></div>
            </button>
        </div>
      </div>
        
       {error && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-900/90 text-white px-6 py-4 rounded-xl border border-red-500/30 shadow-2xl z-50 backdrop-blur-md w-[90%] max-w-md text-center">
            <p className="font-mono text-sm">{error}</p>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CaptureScreen;
