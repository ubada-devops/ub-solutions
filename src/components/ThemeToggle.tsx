import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-btn group relative w-14 h-7 rounded-full transition-all duration-500 cursor-pointer overflow-hidden border ${
        isDark
          ? 'bg-zinc-900 border-zinc-700 hover:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
          : 'bg-gradient-to-r from-amber-100 to-sky-200 border-amber-300/60 hover:border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
      } ${className}`}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Stars (visible in dark mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
        <div className="absolute top-3 left-4 w-[3px] h-[3px] bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-zinc-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Clouds (visible in light mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute top-1 right-5 w-3 h-1.5 bg-white/70 rounded-full" />
        <div className="absolute bottom-1.5 right-3 w-4 h-1.5 bg-white/50 rounded-full" />
      </div>

      {/* Toggle Knob */}
      <div
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] flex items-center justify-center ${
          isDark
            ? 'left-[3px] bg-zinc-800 shadow-[0_0_10px_rgba(16,185,129,0.2),inset_0_0_4px_rgba(16,185,129,0.1)] border border-zinc-700'
            : 'left-[calc(100%-25px)] bg-gradient-to-br from-amber-300 to-orange-400 shadow-[0_0_12px_rgba(251,191,36,0.4)] border border-amber-400/50'
        }`}
      >
        {isDark ? (
          <Moon size={11} className="text-emerald-400 transition-all duration-300" />
        ) : (
          <Sun size={12} className="text-white transition-all duration-300 animate-[spin_8s_linear_infinite]" />
        )}
      </div>
    </button>
  );
};
