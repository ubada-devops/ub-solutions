import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface DashboardVisualProps {
  image: string;
  title: string;
  subtitle: string;
  accentColor?: string;
}

export const DashboardVisual: React.FC<DashboardVisualProps> = ({
  image,
  title,
  subtitle,
  accentColor = 'emerald'
}) => {
  const { isDark } = useTheme();

  return (
    <div className="relative rounded-xl overflow-hidden border border-zinc-800/60 mb-6 group">
      <div className="h-40 sm:h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay - adapts to theme */}
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(to top, #09090b, rgba(9,9,11,0.6), transparent)'
              : 'linear-gradient(to top, #ffffff, rgba(255,255,255,0.6), transparent)'
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mt-1">{subtitle}</p>
      </div>
    </div>
  );
};
