
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Trash2, Download, Maximize2 } from 'lucide-react';
import { getGallery, deleteFromGallery, GalleryItem } from '../services/db';

interface GalleryScreenProps {
  onBack: () => void;
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({ onBack }) => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const items = await getGallery();
      setImages(items);
    } catch (e) {
      console.error("Failed to load gallery", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Delete this image permanently?")) {
        await deleteFromGallery(id);
        setImages(prev => prev.filter(img => img.id !== id));
        if (selectedImage?.id === id) setSelectedImage(null);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#050505] animate-fade-in relative">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 z-20 sticky top-0">
             <div className="flex items-center gap-6">
                <button 
                    onClick={onBack} 
                    className="group p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300"
                >
                    <ArrowLeft size={18} />
                </button>
                <div>
                    <h2 className="text-xl font-display font-medium text-white tracking-wide">Studio Archive</h2>
                    <p className="text-xs text-gray-500 font-mono mt-1 uppercase tracking-widest">
                        {images.length} Captured Moments
                    </p>
                </div>
             </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-xs">LOADING ARCHIVE...</div>
            ) : images.length === 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                    <Maximize2 className="w-12 h-12 mb-4" />
                    <p className="font-mono text-xs tracking-widest">NO IMAGES SAVED YET</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
                    {images.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedImage(item)}
                            className="group relative aspect-[3/4] bg-[#111] border border-white/5 cursor-pointer overflow-hidden rounded-sm hover:border-white/30 transition-all"
                        >
                            <img src={item.dataUrl} alt={item.styleName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                <span className="text-xs font-display text-white">{item.styleName}</span>
                                <span className="text-[10px] font-mono text-gray-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                            </div>
                            <button 
                                onClick={(e) => handleDelete(e, item.id)}
                                className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-red-900 hover:text-white transition-all z-20"
                                aria-label="Delete Image"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 animate-fade-in">
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white hover:text-black transition-colors z-50"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="relative h-full max-h-[85vh] aspect-[3/4]">
                    <img src={selectedImage.dataUrl} alt="Full view" className="w-full h-full object-contain shadow-2xl" />
                </div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
                    <a 
                        href={selectedImage.dataUrl} 
                        download={`mirage-${selectedImage.id}.jpg`}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-mono text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                        <Download size={14} /> Download
                    </a>
                    
                    <button 
                         onClick={(e) => handleDelete(e, selectedImage.id)}
                         className="flex items-center gap-2 px-6 py-3 bg-red-900/20 text-red-400 border border-red-900/50 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-red-900 hover:text-white transition-colors"
                    >
                        <Trash2 size={14} /> Delete
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default GalleryScreen;
