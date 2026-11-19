import React from 'react';
import { motion } from 'motion/react';

export const MeshGradientBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
      {/* Soft Ambient Radial Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,rgba(224,242,254,0.5)_0%,rgba(243,244,246,0.3)_50%,transparent_100%)]" />

      {/* Central Mesh Container */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[780px] overflow-hidden">
        
        {/* Subtle Tech Grid Network Layer */}
        <div 
          className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(rgba(14, 165, 233, 0.25) 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 65% 65% at 50% 45%, black 20%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 45%, black 20%, transparent 80%)'
          }}
        />

        {/* Mesh Gradient Blob 1: Electric Cyan Central Core */}
        <motion.div
          className="absolute top-[10%] left-[25%] w-[550px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-400/25 via-sky-300/30 to-blue-500/20 blur-[110px]"
          animate={{
            x: [-35, 45, -20, -35],
            y: [-25, 30, 20, -25],
            scale: [1, 1.18, 0.92, 1],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Mesh Gradient Blob 2: Deep Indigo / Royal Blue Depth */}
        <motion.div
          className="absolute top-[20%] left-[45%] w-[600px] h-[480px] rounded-full bg-gradient-to-br from-indigo-500/18 via-sky-400/22 to-cyan-300/25 blur-[125px]"
          animate={{
            x: [40, -50, 25, 40],
            y: [30, -35, -15, 30],
            scale: [1.12, 0.88, 1.22, 1.12],
            rotate: [360, 240, 120, 0],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Mesh Gradient Blob 3: Ethereal Teal / Emerald Highlight */}
        <motion.div
          className="absolute top-[5%] left-[35%] w-[480px] h-[400px] rounded-full bg-gradient-to-r from-teal-300/20 via-cyan-400/25 to-sky-300/20 blur-[100px]"
          animate={{
            x: [-20, 35, -30, -20],
            y: [35, -25, 25, 35],
            scale: [0.92, 1.2, 0.98, 0.92],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Mesh Gradient Blob 4: Soft Sapphire Outer Atmosphere */}
        <motion.div
          className="absolute top-[30%] left-[20%] w-[520px] h-[420px] rounded-full bg-gradient-to-bl from-blue-600/15 via-sky-400/20 to-indigo-400/15 blur-[120px]"
          animate={{
            x: [30, -30, 45, 30],
            y: [-20, 35, -25, -20],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Dynamic Light Sweep / Shimmer Line */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-[80%] h-[350px] opacity-30 blur-2xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25) 0%, rgba(255, 255, 255, 0) 70%)'
          }}
          animate={{
            opacity: [0.2, 0.38, 0.2],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

      </div>
    </div>
  );
};
