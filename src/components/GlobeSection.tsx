import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Logo {
  id: string;
  name: string;
  x: number; // offset from center X
  y: number; // offset from center Y
  size: number;
  bg?: string;
  text?: string;
  opacity?: number;
  icon?: string;
}

const logos: Logo[] = [
  // Outer-ish Ring (Left side)
  { id: 'reach', name: 'Reach\nBritish School', x: -380, y: -40, size: 120, text: 'text-slate-500' },
  { id: 'cis', name: 'COLLEGIATE\nINTERNATIONAL\nSCHOOL', x: -280, y: 10, size: 120, bg: 'bg-[#313f56]', text: 'text-white' },
  { id: 'sharjah', name: 'SHARJAH\nINDIAN SCHOOL', x: -350, y: 150, size: 110 },
  { id: 'albasma', name: 'AL BASMA\nBRITISH SCHOOL', x: -250, y: 250, size: 120, text: 'text-yellow-700' },
  { id: 'amity-dubai', name: 'AMITY\nSCHOOL\nDUBAI', x: -160, y: 350, size: 110, text: 'text-blue-900' },
  
  // Outer-ish Ring (Bottom)
  { id: 'sun', name: 'SUN\nSCHOOL', x: -40, y: 400, size: 100, text: 'text-yellow-600' },
  { id: 'kids', name: 'KIDS\nACADEMY', x: 80, y: 420, size: 100, text: 'text-red-500' },
  { id: 'primus', name: 'P R I M U S\nPRIVATE SCHOOL', x: 200, y: 380, size: 110, text: 'text-blue-900' },
  
  // Outer-ish Ring (Right side)
  { id: 'apple', name: 'Apple\nInternational', x: 300, y: 280, size: 110, text: 'text-red-700' },
  { id: 'northgate', name: 'NORTH GATE', x: 380, y: 160, size: 120, text: 'text-green-800' },
  { id: 'nlcs', name: 'North London\nCollegiate School', x: 280, y: 30, size: 120, text: 'text-amber-900' },
  { id: 'red', name: 'EXCELLENCE\nACADEMY', x: 420, y: -20, size: 110, text: 'text-red-800' },
  { id: 'faded', name: 'INTERNATIONAL\nSCHOOLS', x: 280, y: -120, size: 100, opacity: 0.4 },

  // Inner-ish Ring (Left to Right)
  { id: 'repton', name: 'REPTON\nDUBAI', x: -150, y: 150, size: 120, text: 'text-slate-800' },
  { id: 'nordanglia', name: 'NORD\nANGLIA\nEDUCATION', x: -60, y: 240, size: 110 },
  { id: 'amity-ad', name: 'AMITY\nINTERNATIONAL', x: 60, y: 270, size: 110, text: 'text-blue-800' },
  { id: 'arbor', name: 'ARBOR', x: 180, y: 210, size: 120, bg: 'bg-[#009b48]', text: 'text-white' },
  { id: 'hartland', name: 'hartland\ninternational', x: 260, y: 120, size: 110, text: 'text-gray-500' },
];

export function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
      phi: 0,
      theta: 0.1,
      dark: 0, // Light mode
      diffuse: 1.2,
      mapSamples: 24000,
      mapBrightness: 5,
      baseColor: [0.42, 0.25, 0.6], // Purple globe
      markerColor: [1, 1, 1],
      glowColor: [0.95, 0.95, 1], // Soft white glow
      markers: [
        { location: [25.2048, 55.2708], size: 0.05 }, // Dubai
        { location: [24.4539, 54.3773], size: 0.05 }, // Abu Dhabi
        { location: [28.6139, 77.2090], size: 0.05 }, // New Delhi
        { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
        { location: [51.5074, -0.1278], size: 0.05 }, // London
      ],
    });

    let req: number;
    const render = () => {
      phi += 0.002;
      globe.update({ phi });
      req = requestAnimationFrame(render);
    };
    req = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(req);
      globe.destroy();
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#F4F3F0]">
      {/* Container for Globe and Logos to maintain aspect and scaling */}
      <div className="relative w-[1000px] h-[900px] scale-75 md:scale-90 lg:scale-100 origin-center">
        
        {/* Globe Wrapper */}
        <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] z-10 pointer-events-none">
          <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: '100%', aspectRatio: 1 }}
          />
        </div>

        {/* Logos */}
        <div className="absolute left-1/2 top-[35%] z-20">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: logo.opacity ?? 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.04,
                ease: [0.23, 1, 0.32, 1],
              }}
              className={`absolute flex flex-col items-center justify-center rounded-full p-3 text-center transition-transform hover:scale-110 cursor-pointer shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)]
                ${logo.bg || 'bg-white'} 
                ${logo.text || 'text-slate-800'}
              `}
              style={{
                width: logo.size,
                height: logo.size,
                left: logo.x,
                top: logo.y,
                // Center the logo exactly on its coordinate
                transform: 'translate(-50%, -50%)', 
              }}
            >
              <span className="text-[11px] font-bold tracking-tight whitespace-pre-line leading-tight">
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
