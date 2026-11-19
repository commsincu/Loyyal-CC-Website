import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, FileCheck, Shield, Award } from 'lucide-react';

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  iconType: 'microsoft' | 'meta' | 'mastercard' | 'sheraa' | 'patents' | 'cryptovalley' | 'iso' | 'wattlecorp' | 'kscouter';
}

export const achievementsData: AchievementItem[] = [
  {
    id: 'microsoft-ai',
    title: 'Microsoft AI for Impact Winner',
    organization: 'Microsoft Corporation',
    iconType: 'microsoft',
  },
  {
    id: 'meta-llama',
    title: 'Meta Llama Startup Bootcamp Winner',
    organization: 'Meta AI',
    iconType: 'meta',
  },
  {
    id: 'mastercard-lighthouse',
    title: 'Mastercard Lighthouse Cohort 2026',
    organization: 'Mastercard FINITIV',
    iconType: 'mastercard',
  },
  {
    id: 'k-scouter',
    title: 'K-Scouter Global Innovator',
    organization: 'AGCC Korea',
    iconType: 'kscouter',
  },
  {
    id: 'sheraa-s3',
    title: 'Sheraa S3 Cohort Alumni',
    organization: 'Sheraa Center',
    iconType: 'sheraa',
  },
  {
    id: 'global-patents',
    title: '4 Global Patents Issued',
    organization: 'USPTO & WIPO',
    iconType: 'patents',
  },
  {
    id: 'crypto-valley',
    title: 'Crypto Valley Association Member',
    organization: 'Crypto Valley Zug',
    iconType: 'cryptovalley',
  },
  {
    id: 'iso-certified',
    title: 'ISO:27001 Certified',
    organization: 'ISO International Standard',
    iconType: 'iso',
  },
  {
    id: 'wattlecorp-cyber',
    title: 'Wattlecorp Security Certified',
    organization: 'Wattlecorp Cybersecurity',
    iconType: 'wattlecorp',
  },
];

const renderSharpBrandSymbol = (type: AchievementItem['iconType'], size: 'md' | 'xl' = 'md') => {
  const containerSize = size === 'xl' ? 'w-24 h-24 sm:w-32 sm:h-32' : 'w-10 h-10';
  const iconSize = size === 'xl' ? 'w-12 h-12 sm:w-16 sm:h-16' : 'w-5 h-5';

  switch (type) {
    case 'microsoft':
      return (
        <div className={`${containerSize} bg-slate-950 p-2 sm:p-3 flex items-center justify-center border border-slate-800 shrink-0`}>
          <div className="grid grid-cols-2 gap-1 w-full h-full">
            <div className="bg-[#F25022]" />
            <div className="bg-[#7FBA00]" />
            <div className="bg-[#00A4EF]" />
            <div className="bg-[#FFB900]" />
          </div>
        </div>
      );
    case 'meta':
      return (
        <div className={`${containerSize} bg-blue-600 p-2 sm:p-3 flex items-center justify-center text-white border border-blue-500 shrink-0`}>
          <svg viewBox="0 0 24 24" fill="currentColor" className={iconSize}>
            <path d="M12 15.5c-1.8 0-3.2-1.1-4.2-2.6-1-1.5-1.8-3.4-2.8-3.4-1.2 0-2 1-2 2.5 0 2.2 1.6 4.5 4 4.5 1.8 0 3.2-1.1 4.2-2.6 1-1.5 1.8-3.4 2.8-3.4 1.2 0 2 1 2 2.5 0 2.2-1.6 4.5-4 4.5zm-5-10C4.3 5.5 2 7.8 2 11c0 3.8 3 7 7 7 2.4 0 4.3-1.4 5.6-3.3 1.3 1.9 3.2 3.3 5.6 3.3 4 0 7-3.2 7-7 0-3.2-2.3-5.5-5-5.5-2.4 0-4.3 1.4-5.6 3.3C10.3 6.9 8.4 5.5 7 5.5z" />
          </svg>
        </div>
      );
    case 'mastercard':
      return (
        <div className={`${containerSize} bg-slate-950 p-2 sm:p-3 flex items-center justify-center border border-slate-800 shrink-0`}>
          <div className="flex items-center -space-x-2.5 sm:-space-x-3.5">
            <div className={`${size === 'xl' ? 'w-10 h-10 sm:w-14 sm:h-14' : 'w-5 h-5'} rounded-full bg-[#EB001B]`} />
            <div className={`${size === 'xl' ? 'w-10 h-10 sm:w-14 sm:h-14' : 'w-5 h-5'} rounded-full bg-[#F79E1B] mix-blend-screen`} />
          </div>
        </div>
      );
    case 'sheraa':
      return (
        <div className={`${containerSize} bg-amber-600 flex items-center justify-center text-white font-black ${size === 'xl' ? 'text-3xl sm:text-4xl' : 'text-sm'} leading-none border border-amber-500 shrink-0`}>
          S3
        </div>
      );
    case 'patents':
      return (
        <div className={`${containerSize} bg-purple-700 p-2 sm:p-3 flex items-center justify-center text-white border border-purple-500 shrink-0`}>
          <FileCheck className={iconSize} />
        </div>
      );
    case 'cryptovalley':
      return (
        <div className={`${containerSize} bg-slate-950 p-2 sm:p-3 flex items-center justify-center border border-slate-800 text-red-500 shrink-0`}>
          <svg viewBox="0 0 24 24" className={`${iconSize} fill-none stroke-current stroke-[2.2]`}>
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
            <line x1="12" y1="2" x2="12" y2="22" />
          </svg>
        </div>
      );
    case 'iso':
      return (
        <div className={`${containerSize} bg-teal-700 p-2 sm:p-3 flex items-center justify-center text-white border border-teal-500 shrink-0`}>
          <ShieldCheck className={iconSize} />
        </div>
      );
    case 'wattlecorp':
      return (
        <div className={`${containerSize} bg-cyan-950 p-2 sm:p-3 flex items-center justify-center text-cyan-400 border border-cyan-800 shrink-0`}>
          <Shield className={`${iconSize} fill-cyan-950`} />
        </div>
      );
    case 'kscouter':
      return (
        <div className={`${containerSize} bg-slate-950 p-2 sm:p-3 flex items-center justify-center border border-slate-800 text-white font-black shrink-0 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-2 h-2 bg-red-500" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-600" />
          <span className={`${size === 'xl' ? 'text-2xl sm:text-3xl' : 'text-xs'} font-mono tracking-tighter text-slate-100 font-extrabold`}>
            K<span className="text-sky-400">S</span>
          </span>
        </div>
      );
    default:
      return <Award className={`${iconSize} text-sky-600`} />;
  }
};

export const AchievementsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Sequential 1-by-1 auto cycling animation with extended pause for relaxed reading
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % achievementsData.length);
    }, 4800);

    return () => clearInterval(interval);
  }, []);

  const activeItem = achievementsData[activeIndex];

  // Ultra-smooth, premium 1-second flight transition
  const flightTransition = {
    duration: 1.05,
    ease: [0.16, 1, 0.3, 1],
  };

  return (
    <section id="achievements" className="achievements-grid-container relative w-full mt-8 sm:mt-14 pt-16 sm:pt-24 pb-12 sm:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: Tic-Tac-Toe Intersecting Grid Matrix */}
          <div className="lg:col-span-5 flex justify-center py-2">
            <div className="relative p-2">
              {/* Intersecting Tic-Tac-Toe Hash Lines */}
              <div className="absolute inset-0 pointer-events-none">
                {/* 2 Vertical Hash Lines extending slightly */}
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-slate-300/80 -my-2" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-slate-300/80 -my-2" />
                {/* 2 Horizontal Hash Lines extending slightly */}
                <div className="absolute top-1/3 left-0 right-0 h-px bg-slate-300/80 -mx-2" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-slate-300/80 -mx-2" />
              </div>

              {/* 3x3 Cells */}
              <div className="grid grid-cols-3 relative z-10">
                {achievementsData.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center transition-all duration-500 cursor-pointer hover:bg-slate-100/40"
                    >
                      {/* Icon floats to the right panel when active, cell remains cleanly open when away */}
                      {!isActive && (
                        <motion.div
                          layoutId={`brand-fly-${item.id}`}
                          transition={flightTransition}
                          className="flex items-center justify-center"
                        >
                          {renderSharpBrandSymbol(item.iconType, 'md')}
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Floating Enlarged Logo Stage & Minimalist Showcase */}
          <div className="lg:col-span-7 min-h-[180px] flex items-center justify-center lg:justify-start lg:pl-8">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left"
              >
                {/* Floating Enlarged Brand Symbol (Framer Motion layoutId shared flight) */}
                <motion.div
                  layoutId={`brand-fly-${activeItem.id}`}
                  transition={flightTransition}
                  className="shrink-0 drop-shadow-lg"
                >
                  {renderSharpBrandSymbol(activeItem.iconType, 'xl')}
                </motion.div>

                {/* Associated Minimalist Title */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <span className="text-[11px] font-mono font-bold tracking-widest text-sky-600 uppercase mb-1.5">
                    {activeItem.organization}
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-950 tracking-tight leading-tight max-w-md">
                    {activeItem.title}
                  </h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
