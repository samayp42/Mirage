
import React from 'react';
import { Key, Sparkles, ExternalLink, Lock } from 'lucide-react';

interface ApiKeyScreenProps {
  onSelectKey: () => void;
}

const ApiKeyScreen: React.FC<ApiKeyScreenProps> = ({ onSelectKey }) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-6 animate-fade-in relative z-20">
      <div className="bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl max-w-lg w-full flex flex-col items-center text-center">
        
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
           <Lock className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Pro Studio Access
        </h1>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          To use the high-fidelity <strong>Gemini 3 Pro</strong> model for photo-realistic editing, please connect a Google Cloud API key.
        </p>

        <button
          onClick={onSelectKey}
          className="group w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] shadow-lg mb-6"
        >
           <Key className="w-5 h-5 group-hover:rotate-45 transition-transform" />
           <span>Connect API Key</span>
        </button>

        <p className="text-xs text-gray-500 max-w-xs mx-auto">
           This key is used securely for this session only. 
           <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-purple-400 hover:text-purple-300 ml-1 inline-flex items-center">
             Billing info <ExternalLink size={10} className="ml-1" />
           </a>
        </p>
      </div>
    </div>
  );
};

export default ApiKeyScreen;
