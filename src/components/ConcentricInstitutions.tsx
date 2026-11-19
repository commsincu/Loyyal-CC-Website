import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { INSTITUTIONS, GLOBE_HOTSPOTS, Institution } from '../data/institutions';
import { ThreeGlobeCanvas } from './ThreeGlobeCanvas';
import { InstitutionModal } from './InstitutionModal';
import {
  Search,
  Globe2,
  Sliders,
  RotateCw,
  Sparkles,
  MapPin,
  Maximize2,
  Check,
  Compass,
  Building2,
  Layers
} from 'lucide-react';

export const ConcentricInstitutions: React.FC = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [themeColor, setThemeColor] = useState<'sapphire' | 'cyan' | 'navy' | 'cobalt'>('sapphire');
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.8);
  const [activeInstitution, setActiveInstitution] = useState<Institution | null>(null);
  const [focusCoordinates, setFocusCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [showControls, setShowControls] = useState(false);
  const [isOrbiting, setIsOrbiting] = useState(true);

  // Region options
  const regions = ['All', 'Middle East', 'Europe', 'Asia Pacific'];

  // Filter institutions based on search and region
  const filteredInstitutions = useMemo(() => {
    return INSTITUTIONS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.curriculum.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  // Handle Logo Click
  const handleLogoClick = (inst: Institution) => {
    setActiveInstitution(inst);
    setFocusCoordinates(inst.coordinates);
  };

  // Handle Hotspot Pill Click
  const handleHotspotClick = (spot: typeof GLOBE_HOTSPOTS[0]) => {
    setFocusCoordinates({ lat: spot.lat, lng: spot.lng });
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-x-hidden flex flex-col items-center justify-between pb-16">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-indigo-300/10 rounded-full blur-2xl" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-sky-300/10 rounded-full blur-2xl" />
      </div>

      {/* Header Section */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 flex flex-col items-center text-center z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide uppercase shadow-xs mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Global Institutions Ecosystem
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-[1.15]"
        >
          Connecting Premier Schools <br className="hidden sm:inline" />
          Across <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Two Concentric Orbits</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed"
        >
          Explore over 500+ top educational institutions arranged in dynamic concentric rings around our interactive 3D global network.
        </motion.p>

        {/* Filter & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 w-full max-w-3xl flex flex-col sm:flex-row items-center gap-3 bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-full shadow-lg shadow-slate-200/60 border border-slate-200/80"
        >
          {/* Search Input */}
          <div className="relative flex-1 w-full flex items-center pl-3">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search school name, city, or curriculum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm font-medium bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 pr-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 pl-0 sm:pl-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === region
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowControls(!showControls)}
            className={`p-2.5 rounded-full transition-colors border ${
              showControls
                ? 'bg-blue-50 text-blue-600 border-blue-200'
                : 'text-slate-500 hover:bg-slate-100 border-slate-200'
            }`}
            title="3D Globe & Theme Settings"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Expandable Controls Panel */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full max-w-2xl mt-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xl overflow-hidden text-left"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
                {/* Theme Palette */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Globe Color Theme
                  </span>
                  <div className="flex items-center gap-1.5">
                    {(['sapphire', 'cyan', 'navy', 'cobalt'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setThemeColor(t)}
                        className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold capitalize transition-all ${
                          themeColor === t
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rotation Toggle */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    3D Auto Rotation
                  </span>
                  <button
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`w-full py-1.5 px-3 rounded-lg border font-semibold flex items-center justify-center gap-2 transition-all ${
                      autoRotate
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
                    {autoRotate ? 'Auto Spin Active' : 'Rotation Paused'}
                  </button>
                </div>

                {/* Orbit Orbit Animation */}
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Orbit Float Animation
                  </span>
                  <button
                    onClick={() => setIsOrbiting(!isOrbiting)}
                    className={`w-full py-1.5 px-3 rounded-lg border font-semibold flex items-center justify-center gap-2 transition-all ${
                      isOrbiting
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    {isOrbiting ? 'Dynamic Pulse On' : 'Static Position'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN 3D GLOBE & CONCENTRIC LOGOS CONTAINER */}
      <main className="relative w-full max-w-[1200px] min-h-[650px] sm:min-h-[750px] md:min-h-[850px] flex items-center justify-center my-4 overflow-visible">
        {/* Aspect Container */}
        <div className="relative w-[900px] sm:w-[1050px] md:w-[1150px] h-[700px] sm:h-[800px] md:h-[850px] scale-[0.65] sm:scale-85 md:scale-95 lg:scale-100 origin-center flex items-center justify-center">
          
          {/* Concentric Circle Orbit Lines (Visual Guidance) */}
          <div className="absolute w-[56%] h-[56%] rounded-full border border-blue-400/20 border-dashed pointer-events-none animate-[spin_120s_linear_infinite]" />
          <div className="absolute w-[86%] h-[86%] rounded-full border border-indigo-400/15 border-dashed pointer-events-none animate-[spin_180s_linear_infinite_reverse]" />

          {/* Central 3D Globe Canvas */}
          <div className="absolute w-[440px] sm:w-[500px] md:w-[560px] h-[440px] sm:h-[500px] md:h-[560px] z-10 rounded-full shadow-2xl shadow-blue-500/10">
            <ThreeGlobeCanvas
              themeColor={themeColor}
              autoRotate={autoRotate}
              rotationSpeed={rotationSpeed}
              activeCoordinates={focusCoordinates}
            />
          </div>

          {/* Concentric Orbiting Logos */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {filteredInstitutions.map((item, index) => {
              // Calculate x, y offsets based on ring angle
              const radians = (item.angleDeg * Math.PI) / 180;
              const radius = item.ring === 'inner' ? 300 : 440; // Pixel radius for 1000px container
              
              const x = radius * Math.cos(radians);
              const y = radius * Math.sin(radians);

              return (
                <div
                  key={item.id}
                  className="absolute left-1/2 top-1/2 pointer-events-auto"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <motion.button
                    initial={{ opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.03,
                      ease: 'easeOut',
                    }}
                    whileHover={{ scale: 1.15, zIndex: 40 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLogoClick(item)}
                    className={`group relative flex flex-col items-center justify-center rounded-full p-2.5 text-center cursor-pointer transition-all shadow-md hover:shadow-2xl border ${
                      item.bg || 'bg-white'
                    } ${item.textColor || 'text-slate-800'} ${
                      item.borderColor || 'border-slate-200'
                    }`}
                    style={{
                      width: item.ring === 'inner' ? 105 : 115,
                      height: item.ring === 'inner' ? 105 : 115,
                    }}
                  >
                    {/* Ring Indicator Dot */}
                    <span
                      className={`absolute -top-1 right-1 w-3 h-3 rounded-full border-2 border-white ${
                        item.ring === 'inner' ? 'bg-blue-500' : 'bg-indigo-500'
                      }`}
                      title={item.ring === 'inner' ? 'Inner Orbit' : 'Outer Orbit'}
                    />

                    {/* Logo Text */}
                    <span className="text-[11px] font-bold tracking-tight leading-tight whitespace-pre-line group-hover:underline decoration-blue-500 decoration-2">
                      {item.shortName}
                    </span>

                    {/* Hover Card Preview Tooltip */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 bg-slate-900 text-white text-[10px] font-medium py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xl">
                      {item.location} • Click to View
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Hotspots Quick Switch Bar */}
      <footer className="w-full max-w-5xl mx-auto px-4 z-20 mt-2">
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            Global Regional Hubs
          </span>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {GLOBE_HOTSPOTS.map((spot) => (
              <button
                key={spot.name}
                onClick={() => handleHotspotClick(spot)}
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs font-semibold shadow-2xs transition-all active:scale-95"
              >
                <MapPin className="w-3 h-3 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>{spot.name}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-500 text-[10px] group-hover:bg-blue-100 group-hover:text-blue-800">
                  {spot.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Institution Details Modal */}
      <InstitutionModal
        institution={activeInstitution}
        onClose={() => setActiveInstitution(null)}
        onFocusGlobe={(lat, lng) => setFocusCoordinates({ lat, lng })}
      />
    </div>
  );
};
