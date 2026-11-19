import React, { useState } from 'react';

interface TicTacToeCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverAccent?: 'sky' | 'emerald' | 'purple' | 'amber' | 'slate' | 'indigo' | 'fuchsia';
  enableMouseGlow?: boolean;
}

export const TicTacToeCard: React.FC<TicTacToeCardProps> = ({
  children,
  className = '',
  onClick,
  hoverAccent = 'sky',
  enableMouseGlow = true,
}) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseGlow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColorMap = {
    sky: 'rgba(56, 189, 248, 0.16)',
    emerald: 'rgba(52, 211, 153, 0.16)',
    purple: 'rgba(192, 132, 252, 0.16)',
    amber: 'rgba(251, 191, 36, 0.16)',
    slate: 'rgba(148, 163, 184, 0.16)',
    indigo: 'rgba(129, 140, 248, 0.16)',
    fuchsia: 'rgba(232, 121, 249, 0.16)',
  };

  const borderGlowColorMap = {
    sky: 'rgba(14, 165, 233, 0.85)',
    emerald: 'rgba(16, 185, 129, 0.85)',
    purple: 'rgba(168, 85, 247, 0.85)',
    amber: 'rgba(245, 158, 11, 0.85)',
    slate: 'rgba(71, 85, 105, 0.85)',
    indigo: 'rgba(99, 102, 241, 0.85)',
    fuchsia: 'rgba(217, 70, 239, 0.85)',
  };

  const accentColorMap = {
    sky: 'group-hover:bg-sky-500',
    emerald: 'group-hover:bg-emerald-500',
    purple: 'group-hover:bg-purple-500',
    amber: 'group-hover:bg-amber-500',
    slate: 'group-hover:bg-slate-800',
    indigo: 'group-hover:bg-indigo-500',
    fuchsia: 'group-hover:bg-fuchsia-500',
  };

  const lineHover = accentColorMap[hoverAccent];
  const glowColor = glowColorMap[hoverAccent];
  const borderGlowColor = borderGlowColorMap[hoverAccent];

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white group transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Interactive Mouse Tracking Soft Radial Surface Glow */}
      {enableMouseGlow && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0 opacity-0 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 75%)`
              : undefined,
          }}
        />
      )}

      {/* Mouse Tracking Illuminated Border Spotlight */}
      {enableMouseGlow && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-20 opacity-0 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(240px circle at ${mousePos.x}px ${mousePos.y}px, ${borderGlowColor}, transparent 80%)`
              : undefined,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
      )}

      {/* Extended Top Line */}
      <div
        className={`absolute -top-px -left-3 -right-3 h-px bg-slate-300/90 ${lineHover} transition-colors duration-300 pointer-events-none z-10`}
      />

      {/* Extended Bottom Line */}
      <div
        className={`absolute -bottom-px -left-3 -right-3 h-px bg-slate-300/90 ${lineHover} transition-colors duration-300 pointer-events-none z-10`}
      />

      {/* Extended Left Line */}
      <div
        className={`absolute -left-px -top-3 -bottom-3 w-px bg-slate-300/90 ${lineHover} transition-colors duration-300 pointer-events-none z-10`}
      />

      {/* Extended Right Line */}
      <div
        className={`absolute -right-px -top-3 -bottom-3 w-px bg-slate-300/90 ${lineHover} transition-colors duration-300 pointer-events-none z-10`}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {children}
      </div>
    </div>
  );
};
