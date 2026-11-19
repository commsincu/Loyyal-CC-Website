import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOYALTY_PARTNERS, LoyaltyPartner } from '../data/schools';
import { HollowGlobe3D } from './HollowGlobe3D';
import { MeshGradientBackground } from './MeshGradientBackground';
import { LogoWithSkeleton } from './LogoWithSkeleton';
import {
  Search,
  RotateCw,
  Pause,
  Play,
  MapPin,
  X,
  Users,
  Calendar,
  Globe,
  Sparkles,
  CreditCard,
  Building2,
  Activity,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const OrbitingConcentricLayout: React.FC = () => {
  // Animation State
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [orbitSpeedFactor, setOrbitSpeedFactor] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [activePartner, setActivePartner] = useState<LoyaltyPartner | null>(null);
  const [focusedCoords, setFocusedCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Time Ref for Orbit Calculations
  const timeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const [, setTick] = useState<number>(0);

  // Orbit loop
  useEffect(() => {
    let lastTime = performance.now();

    const updateOrbit = (now: number) => {
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      if (isOrbiting) {
        timeRef.current += deltaTime * orbitSpeedFactor;
        setTick((prev) => prev + 1);
      }

      requestRef.current = requestAnimationFrame(updateOrbit);
    };

    requestRef.current = requestAnimationFrame(updateOrbit);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isOrbiting, orbitSpeedFactor]);

  // Filtered Partners (Only include partners with assigned logo URLs)
  const filteredPartners = LOYALTY_PARTNERS.filter((partner) => {
    const hasLogo = Boolean(partner.logoUrl);

    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.partnerType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.industry.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustry === 'All' || partner.industry === selectedIndustry;

    return hasLogo && matchesSearch && matchesIndustry;
  });

  const industries = ['All', 'Airlines', 'Hospitality', 'Banking & Cards', 'Coalition & Retail', 'Travel & Mobility'];

  // Handle click on partner badge
  const handlePartnerClick = (partner: LoyaltyPartner) => {
    setActivePartner(partner);
    setFocusedCoords(partner.coordinates);
  };

  return (
    <div id="hero-globe" className="relative w-full py-6 sm:py-10 bg-gradient-to-b from-slate-50/90 via-sky-50/30 to-white text-slate-900 font-sans flex flex-col items-center justify-between selection:bg-sky-100 selection:text-sky-900">
      
      {/* Animated Slow-Moving Mesh Gradient & Atmospheric Background */}
      <MeshGradientBackground />

      {/* TOP HEADER */}
      <header className="w-full max-w-7xl mx-auto px-6 pt-2 md:pt-4 flex flex-col md:flex-row items-center justify-between gap-4 z-30">
        
        {/* Left Side: Brand Tagline & Title */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 bg-clip-text text-transparent drop-shadow-xs">
              Global Network of Loyalty
            </span>
          </motion.h1>
        </div>
      </header>

      {/* CENTRAL MAIN CANVAS & ORBITING CONCENTRIC CIRCLES */}
      <div className="relative w-full max-w-[1100px] h-[480px] sm:h-[560px] md:h-[620px] flex items-center justify-center my-1 sm:my-2">
        
        {/* Scale Wrapper for smaller screens */}
        <div className="relative w-[1000px] sm:w-[1080px] h-[650px] sm:h-[720px] scale-[0.45] min-[420px]:scale-[0.54] sm:scale-[0.70] md:scale-[0.80] lg:scale-85 origin-center flex items-center justify-center">

          {/* Central 3D Hollow Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-[420px] h-[420px] z-10 rounded-full shadow-2xl shadow-sky-500/20"
          >
            <HollowGlobe3D
              autoRotate={isOrbiting}
              rotationSpeed={0.6 * orbitSpeedFactor}
              focusedCoordinates={focusedCoords}
            />
          </motion.div>

          {/* INNER REVOLVING ORBIT CIRCLE LAYER (Track Line + Inner Logos + Glowing Trails) */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            {/* Visual Orbit Track Line (Inner) with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[580px] h-[580px] rounded-full border border-cyan-400/40 border-dashed pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            />

            {/* Inner Orbiting Logos & Glowing Trails */}
            <div className="absolute inset-0 pointer-events-none">
              {(() => {
                const innerPartners = filteredPartners.filter((p) => p.orbit === 'inner');
                return innerPartners.map((partner) => {
                  const speed = 0.08;
                  const radius = 290;
                  const currentAngleRad =
                    ((partner.angleDeg + timeRef.current * speed * 25) * Math.PI) / 180;

                  const x = radius * Math.cos(currentAngleRad);
                  const y = radius * Math.sin(currentAngleRad);

                  const orbitSubIndex = innerPartners.findIndex((p) => p.id === partner.id);
                  const staggerDelay = 0.45 + Math.max(0, orbitSubIndex) * 0.05;
                  const circleSize = 114;

                  return (
                    <div
                      key={partner.id}
                      className="absolute left-1/2 top-1/2 pointer-events-auto transition-transform duration-75 ease-linear"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      <motion.button
                        initial={{ opacity: 0, scale: 0.2, y: 12, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: 0.65,
                          delay: staggerDelay,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        onClick={() => handlePartnerClick(partner)}
                        className={`group relative flex flex-col items-center justify-center rounded-full text-center transition-all duration-200 cursor-pointer shadow-md hover:shadow-2xl hover:scale-110 active:scale-95 border ${
                          partner.bg
                        } ${partner.textColor} ${partner.borderColor}`}
                        style={{
                          width: circleSize,
                          height: circleSize,
                        }}
                      >
                        {/* Orbit Ring Indicator Dot */}
                        <span
                          className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs bg-cyan-400"
                          title="INNER Orbit Circle"
                        />

                        {/* Logo Content */}
                        {partner.logoUrl ? (
                          <div className="w-[88%] h-[74%] flex items-center justify-center p-0.5">
                            <LogoWithSkeleton
                              src={partner.logoUrl}
                              alt={partner.name}
                              fallbackText={partner.shortName}
                            />
                          </div>
                        ) : (
                          <>
                            <span className="text-[10px] font-black tracking-wider uppercase opacity-40 mb-0.5">
                              {partner.logoLetter}
                            </span>
                            <span className="text-[11px] font-bold leading-tight tracking-tight whitespace-pre-line px-1">
                              {partner.shortName}
                            </span>
                          </>
                        )}

                        {/* Hover Info Tag */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 bg-slate-900 text-white text-[10px] font-medium py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl">
                          {partner.location} • {partner.members}
                        </div>
                      </motion.button>
                    </div>
                  );
                });
              })()}
            </div>
          </motion.div>

          {/* OUTER REVOLVING ORBIT CIRCLE LAYER (Track Line + Outer Logos + Glowing Trails) */}
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          >
            {/* Visual Orbit Track Line (Outer) with Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-[840px] h-[840px] rounded-full border border-sky-400/35 border-dashed pointer-events-none shadow-[0_0_18px_rgba(56,189,248,0.2)]"
            />

            {/* Outer Orbiting Logos & Glowing Trails */}
            <div className="absolute inset-0 pointer-events-none">
              {(() => {
                const outerPartners = filteredPartners.filter((p) => p.orbit === 'outer');
                return outerPartners.map((partner) => {
                  const speed = -0.045;
                  const radius = 420;
                  const currentAngleRad =
                    ((partner.angleDeg + timeRef.current * speed * 25) * Math.PI) / 180;

                  const x = radius * Math.cos(currentAngleRad);
                  const y = radius * Math.sin(currentAngleRad);

                  const orbitSubIndex = outerPartners.findIndex((p) => p.id === partner.id);
                  const staggerDelay = 0.75 + Math.max(0, orbitSubIndex) * 0.05;
                  const circleSize = 122;

                  return (
                    <div
                      key={partner.id}
                      className="absolute left-1/2 top-1/2 pointer-events-auto transition-transform duration-75 ease-linear"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      <motion.button
                        initial={{ opacity: 0, scale: 0.2, y: 12, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: 0.65,
                          delay: staggerDelay,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        onClick={() => handlePartnerClick(partner)}
                        className={`group relative flex flex-col items-center justify-center rounded-full text-center transition-all duration-200 cursor-pointer shadow-md hover:shadow-2xl hover:scale-110 active:scale-95 border ${
                          partner.bg
                        } ${partner.textColor} ${partner.borderColor}`}
                        style={{
                          width: circleSize,
                          height: circleSize,
                        }}
                      >
                        {/* Orbit Ring Indicator Dot */}
                        <span
                          className="absolute -top-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-xs bg-sky-500"
                          title="OUTER Orbit Circle"
                        />

                        {/* Logo Content */}
                        {partner.logoUrl ? (
                          <div className="w-[88%] h-[74%] flex items-center justify-center p-0.5">
                            <LogoWithSkeleton
                              src={partner.logoUrl}
                              alt={partner.name}
                              fallbackText={partner.shortName}
                            />
                          </div>
                        ) : (
                          <>
                            <span className="text-[10px] font-black tracking-wider uppercase opacity-40 mb-0.5">
                              {partner.logoLetter}
                            </span>
                            <span className="text-[11px] font-bold leading-tight tracking-tight whitespace-pre-line px-1">
                              {partner.shortName}
                            </span>
                          </>
                        )}

                        {/* Hover Info Tag */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 bg-slate-900 text-white text-[10px] font-medium py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl">
                          {partner.location} • {partner.members}
                        </div>
                      </motion.button>
                    </div>
                  );
                });
              })()}
            </div>
          </motion.div>

        </div>
      </div>

      {/* LOYYAL PARTNER DETAILS MODAL */}
      <AnimatePresence>
        {activePartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-7"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePartner(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Loyalty Partner Header */}
              <div className="flex items-start gap-4 pr-8">
                <div
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center p-1.5 text-center shadow-md font-extrabold text-xs leading-tight whitespace-pre-line shrink-0 overflow-hidden ${activePartner.bg} ${activePartner.textColor}`}
                >
                  {activePartner.logoUrl ? (
                    <LogoWithSkeleton
                      src={activePartner.logoUrl}
                      alt={activePartner.name}
                      fallbackText={activePartner.shortName}
                    />
                  ) : (
                    activePartner.shortName
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                      {activePartner.industry}
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
                      Loyyal Verified
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-extrabold text-slate-900 leading-snug">
                    {activePartner.name}
                  </h3>
                </div>
              </div>

              {/* Partner Stats Grid */}
              <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">HQ Location</span>
                    <span className="font-bold text-slate-800">{activePartner.location}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-cyan-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Member Base</span>
                    <span className="font-bold text-slate-800">{activePartner.members}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <Activity className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Monthly Volume</span>
                    <span className="font-bold text-slate-800 truncate">{activePartner.volume}</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ecosystem Role</span>
                    <span className="font-bold text-slate-800 truncate">{activePartner.partnerType}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-2.5">
                <button
                  onClick={() => {
                    setFocusedCoords(activePartner.coordinates);
                    setActivePartner(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white font-bold text-xs tracking-wide transition-all shadow-md shadow-sky-500/25 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  Focus on 3D Globe
                </button>
                <button
                  onClick={() => setActivePartner(null)}
                  className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
