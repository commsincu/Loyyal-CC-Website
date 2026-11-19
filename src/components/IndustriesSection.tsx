import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { TicTacToeCard } from './TicTacToeCard';

import iconAirlines from '../assets/images/icon_airlines_1790119340524.jpg';
import iconBanking from '../assets/images/icon_banking_1790119359885.jpg';
import iconRetail from '../assets/images/icon_retail_1790119375950.jpg';
import iconTelecom from '../assets/images/icon_telecom_1790119388031.jpg';
import iconMalls from '../assets/images/icon_malls_1790119404101.jpg';
import iconSme from '../assets/images/icon_sme_1790119417412.jpg';

interface IndustriesSectionProps {
  onOpenDemo?: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onOpenDemo }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for parallax depth effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered parallax transforms
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [-70, 70]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [85, -85]);
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [-110, 110]);
  const parallaxRotate1 = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const parallaxRotate2 = useTransform(scrollYProgress, [0, 1], [15, -15]);

  const industries = [
    {
      id: 'airlines',
      name: 'Airlines',
      image: iconAirlines,
      challenge: 'Frequent flyer programs limited by partner networks and low engagement between flights.',
      cta: 'Explore for Airlines',
      hoverAccent: 'sky' as const,
      bullets: [
        'Connect to 900+ airlines and expand earning partners instantly',
        'Real-time points exchange across global alliances reduces liability',
        'Richer redemption options keep members engaged between journeys',
      ],
    },
    {
      id: 'banking',
      name: 'Banking & Financial Services',
      image: iconBanking,
      challenge: 'Unredeemed point liability growing on balance sheets while card rewards fail to drive real engagement.',
      cta: 'Explore for Banking',
      hoverAccent: 'purple' as const,
      bullets: [
        'Reduce balance sheet liability through real-time points exchange',
        'Merchant-funded offers drive card spend at zero cost to the program',
        'AI-personalised rewards increase satisfaction and long-term retention',
      ],
    },
    {
      id: 'retail',
      name: 'Retail & E-commerce',
      image: iconRetail,
      challenge: 'Building merchant coalitions that consistently drive repeat purchases and basket size at scale.',
      cta: 'Explore for Retail',
      hoverAccent: 'emerald' as const,
      bullets: [
        'Build a merchant partner network without long IT timelines',
        'Gamification drives daily member engagement between purchase moments',
        'Coalition loyalty programs connect customers across brands and locations',
      ],
    },
    {
      id: 'telecom',
      name: 'Telecom',
      image: iconTelecom,
      challenge: 'Subscriber loyalty limited to billing discounts with no lifestyle relevance or daily engagement.',
      cta: 'Explore for Telecom',
      hoverAccent: 'amber' as const,
      bullets: [
        'Connect subscribers to merchants, travel, and lifestyle rewards',
        'Merchant-funded offers add value without increasing program cost',
        'AI-powered personalisation keeps subscribers engaged across every touchpoint',
      ],
    },
    {
      id: 'shopping-malls',
      name: 'Shopping Malls',
      image: iconMalls,
      challenge: 'Driving cross-merchant loyalty that increases footfall, dwell time, and return visit frequency.',
      cta: 'Explore for Shopping Malls',
      hoverAccent: 'fuchsia' as const,
      bullets: [
        'Unified loyalty ecosystem connecting every tenant and merchant in the mall',
        'Digital gift cards create instant value exchange across all stores',
        'Gamified challenges drive shoppers between merchants on every visit',
      ],
    },
    {
      id: 'smes',
      name: 'SMEs',
      image: iconSme,
      challenge: 'Enterprise loyalty infrastructure has always been too expensive, too complex, and too slow for smaller businesses.',
      cta: 'Explore for SMEs',
      hoverAccent: 'sky' as const,
      bullets: [
        'Full loyalty program live in 24 hours — zero code, zero upfront cost',
        'Instant access to LOYYAL\'s global partner and rewards ecosystem from day one',
        'Manage the entire program through WhatsApp — no technical team required',
      ],
    },
  ];

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/80 text-slate-900 overflow-hidden"
    >
      {/* 3D Parallax Background Depth Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Parallax Layer 1: Ambient Glowing Orbs */}
        <motion.div
          style={{ y: parallaxY1 }}
          className="absolute -top-16 -left-16 w-96 h-96 rounded-full bg-gradient-to-br from-sky-200/50 via-cyan-100/30 to-transparent blur-3xl opacity-80"
        />
        <motion.div
          style={{ y: parallaxY2 }}
          className="absolute top-1/2 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-purple-200/40 via-indigo-100/30 to-transparent blur-3xl opacity-75"
        />
        <motion.div
          style={{ y: parallaxY3 }}
          className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-200/40 via-sky-100/30 to-transparent blur-3xl opacity-70"
        />

        {/* Parallax Layer 2: Floating 3D Architectural Blueprint Rings & Grid Lines */}
        <motion.div
          style={{ y: parallaxY1, rotate: parallaxRotate1 }}
          className="absolute top-12 right-12 w-72 h-72 rounded-full border border-sky-300/30 border-dashed pointer-events-none hidden lg:block"
        />
        <motion.div
          style={{ y: parallaxY2, rotate: parallaxRotate2 }}
          className="absolute bottom-16 left-8 w-96 h-96 rounded-full border border-indigo-300/25 border-dashed pointer-events-none hidden lg:block"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-600 uppercase bg-sky-50 border border-sky-200/80 mb-4 rounded-none"
          >
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>INDUSTRIES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4"
          >
            Built for every industry <br className="hidden sm:inline" />
            <span className="text-slate-700 font-semibold">where loyalty drives growth.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto"
          >
            From global airlines to corner shops — the LOYYAL ecosystem is designed to work at any scale, in any sector, anywhere in the world.
          </motion.p>
        </div>

        {/* 6 Industry Cards Grid with TicTacToe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industries.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="h-full flex flex-col"
            >
              <TicTacToeCard
                hoverAccent={item.hoverAccent}
                className="p-6 sm:p-8 flex flex-col justify-between h-full hover:-translate-y-1.5 transition-transform duration-300 bg-white/95 backdrop-blur-xs group"
              >
                <div>
                  {/* Top Block: 3D Isometric Icon & Title */}
                  <div className="pb-5 border-b border-slate-100 mb-5">
                    <div className="w-16 h-16 rounded-none bg-slate-900 border border-slate-800 p-1 mb-4 shadow-sm flex items-center justify-center relative overflow-hidden group-hover:border-sky-500/80 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight mb-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-500 italic leading-relaxed">
                      {item.challenge}
                    </p>
                  </div>

                  {/* Bullets List */}
                  <ul className="space-y-3 mb-8">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sector CTA */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={onOpenDemo}
                    className="w-full inline-flex items-center justify-between px-4 py-3 bg-slate-950 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm tracking-wide rounded-none transition-colors duration-200 group/btn cursor-pointer"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </TicTacToeCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

