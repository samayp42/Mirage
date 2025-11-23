
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, Loader2, AlertCircle } from 'lucide-react';
import { uploadImageToImgBB } from '../services/imgbb';
import { QRCodeCanvas } from 'qrcode.react';

interface DownloadScreenProps {
  imageDataUrl: string;
  onBack: () => void;
}

const DownloadScreen: React.FC<DownloadScreenProps> = ({ imageDataUrl, onBack }) => {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Automatically start upload on mount
    const upload = async () => {
      setUploadState('uploading');
      try {
        const url = await uploadImageToImgBB(imageDataUrl);
        setDownloadUrl(url);
        setUploadState('success');
      } catch (err) {
        setUploadState('error');
        if (err instanceof Error) {
            setErrorMessage(err.message);
        } else {
            setErrorMessage("Failed to generate link.");
        }
      }
    };

    upload();
  }, [imageDataUrl]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="p-6 flex items-center z-20">
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <ArrowLeft size={20} />
                </div>
                <span className="font-medium">Back to Result</span>
            </button>
        </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">
        
        {/* Main Card */}
        <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col items-center">
             
             {/* QR Code Section */}
             <div className="w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border-2 border-gray-100 relative">
                {uploadState === 'uploading' && (
                    <div className="flex flex-col items-center text-gray-500">
                        <Loader2 className="w-10 h-10 animate-spin text-purple-600 mb-2" />
                        <span className="text-sm font-medium">Generating QR...</span>
                    </div>
                )}
                
                {uploadState === 'success' && downloadUrl && (
                    <QRCodeCanvas 
                        value={downloadUrl} 
                        size={220}
                        level={"H"}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        includeMargin={true}
                    />
                )}

                {uploadState === 'error' && (
                     <div className="flex flex-col items-center text-red-500 px-4 text-center">
                        <AlertCircle className="w-10 h-10 mb-2" />
                        <span className="text-sm font-medium">Upload Failed</span>
                        <p className="text-xs text-gray-400 mt-1">Check API Configuration</p>
                    </div>
                )}
             </div>
             
             <div className="text-center pb-2">
                 <h3 className="text-slate-900 font-display font-bold text-2xl mb-1">Scan to Save</h3>
                 <p className="text-gray-500 text-sm">Use your phone camera to download your photo.</p>
             </div>
        </div>

        {/* Error Instructions (Only visible if configuration is missing) */}
        {uploadState === 'error' && errorMessage?.includes('configured') && (
            <div className="mt-8 p-4 bg-red-900/50 border border-red-500/30 rounded-lg max-w-md text-center backdrop-blur-md">
                <p className="text-red-200 text-sm mb-2 font-semibold">Missing API Key</p>
                <p className="text-red-200/70 text-xs leading-relaxed">
                    Please open <code className="bg-black/30 px-1 py-0.5 rounded text-red-100">services/imgbb.ts</code> and add your <strong>ImgBB API Key</strong>.
                </p>
            </div>
        )}

        {/* Fallback Manual Download */}
        <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-gray-500 text-xs uppercase tracking-widest">Or download manually</p>
            <a 
                href={imageDataUrl} 
                download="ai-portrait.jpg" 
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded-full font-medium transition-all"
            >
                <Download size={18} />
                Save to this Device
            </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadScreen;
