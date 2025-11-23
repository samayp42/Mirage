
import React from 'react';
import { LucideProps } from 'lucide-react';

interface IconButtonProps {
  Icon: React.ElementType<LucideProps>;
  label: string;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, label, onClick, className = '', variant = 'primary' }) => {
  
  const baseClasses = "flex items-center justify-center gap-3 px-8 py-4 font-display font-medium transition-all duration-300 focus:outline-none active:scale-95 tracking-wide";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/5",
    secondary: "bg-[#1A1A1A] text-white border border-white/10 hover:border-white/30 hover:bg-[#222]",
    ghost: "bg-transparent text-gray-400 hover:text-white"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm uppercase tracking-wider">{label}</span>
    </button>
  );
};

export default IconButton;
