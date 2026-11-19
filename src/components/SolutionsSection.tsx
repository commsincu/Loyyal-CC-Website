import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, Sparkles, TrendingUp, BarChart3, Users, DollarSign, ArrowRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { TicTacToeCard } from './TicTacToeCard';

interface SolutionsSectionProps {
  onOpenDemo?: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onOpenDemo }) => {
  // Chart data definitions
  const acquireData = [
    { month: 'Jan', velocity: 120 },
    { month: 'Feb', velocity: 240 },
    { month: 'Mar', velocity: 380 },
    { month: 'Apr', velocity: 520 },
    { month: 'May', velocity: 740 },
    { month: 'Jun', velocity: 980 },
  ];

  const engageData = [
    { day: 'M', activity: 45 },
    { day: 'T', activity: 60 },
    { day: 'W', activity: 85 },
    { day: 'T', activity: 70 },
    { day: 'F', activity: 95 },
    { day: 'S', activity: 110 },
    { day: 'S', activity: 130 },
  ];

  const scaleData = [
    { quarter: 'Q1', volume: 1.2 },
    { quarter: 'Q2', volume: 2.8 },
    { quarter: 'Q3', volume: 4.5 },
    { quarter: 'Q4', volume: 8.2 },
  ];

  const solutions = [
    {
      id: 'acquire',
      stage: 'ACQUIRE',
      subtitle: 'Expand partner networks instantly with zero IT friction.',
      chartType: 'area',
      chartData: acquireData,
      chartLabel: 'Network Member Velocity',
      metric: '10x Faster Partner Onboarding',
      icon: UserPlus,
      accentGlow: 'hover:border-sky-500',
      pulseRing: 'border-sky-300 text-sky-600 bg-sky-50',
      hoverAccent: 'sky' as const,
      description: 'Connect to over 200 merchant partners, global airlines, and retail coalitions through a single API connection. Eliminate legacy onboarding timelines.',
      ctaText: 'Explore Partner Onboarding',
    },
    {
      id: 'engage',
      stage: 'ENGAGE',
      subtitle: 'Turn point balance into daily member habits.',
      chartType: 'bar-day',
      chartData: engageData,
      chartLabel: 'Daily Member Touchpoints',
      metric: '4.2x Higher Member Retention',
      icon: Sparkles,
      accentGlow: 'hover:border-purple-500',
      pulseRing: 'border-purple-300 text-purple-600 bg-purple-50',
      hoverAccent: 'purple' as const,
      description: 'Deploy WhatsApp-native Perxi AI campaigns, instant gamification wheels, and personalized rewards that keep members active between purchases.',
      ctaText: 'Explore Engagement Tools',
    },
    {
      id: 'scale',
      stage: 'SCALE',
      subtitle: 'Automate multi-party clearing and point liquidity.',
      chartType: 'bar-quarter',
      chartData: scaleData,
      chartLabel: 'Settlement Volume ($M)',
      metric: '0% Balance Sheet Liability',
      icon: TrendingUp,
      accentGlow: 'hover:border-emerald-500',
      pulseRing: 'border-emerald-300 text-emerald-600 bg-emerald-50',
      hoverAccent: 'emerald' as const,
      description: 'Patented blockchain ledger clears cross-border point transactions in real-time. Turn unredeemed point liability into active revenue.',
      ctaText: 'Explore Settlement Engine',
    },
  ];

  return (
    <section id="solutions" className="relative w-full py-12 sm:py-20 lg:py-24 bg-slate-50/60 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-600 uppercase bg-sky-50 border border-sky-200/80 mb-4 rounded-none"
          >
            <span>360° LOYALTY SOLUTIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4"
          >
            Solving for every stage <br className="hidden sm:inline" />
            <span className="text-slate-700 font-semibold">of the loyalty lifecycle.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-lg text-slate-600 font-medium"
          >
            One ecosystem. Three outcomes. Every business.
          </motion.p>
        </div>

        {/* Extended Tic-Tac-Toe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="h-full flex flex-col"
              >
                <TicTacToeCard
                  hoverAccent={item.hoverAccent}
                  className="p-5 sm:p-6 lg:p-8 flex flex-col justify-between h-full hover:-translate-y-1.5 transition-transform duration-300"
                >
                  <div>
                    {/* Top Row: Stage Name & Custom Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                        {item.stage}
                      </span>
                      
                      <div className={`relative w-10 h-10 sm:w-12 sm:h-12 ${item.pulseRing} flex items-center justify-center border rounded-none shadow-xs`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 leading-snug mb-5">
                      {item.subtitle}
                    </h3>

                    {/* Micro Visualization Container */}
                    <div className="mb-6 p-3 bg-slate-900/5 border border-slate-900/10 min-w-0 overflow-hidden rounded-none">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 truncate">
                          {item.chartLabel}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-600 font-bold shrink-0">
                          +140% LIFT
                        </span>
                      </div>

                      <div className="h-28 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          {item.chartType === 'area' ? (
                            <AreaChart data={item.chartData as any} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                              <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                              <Area type="monotone" dataKey="velocity" stroke="#0284c7" fill="#0284c7" fillOpacity={0.15} strokeWidth={2} />
                            </AreaChart>
                          ) : item.chartType === 'bar-day' ? (
                            <BarChart data={item.chartData as any} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                              <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
                              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                              <Bar dataKey="activity" fill="#9333ea" radius={[0, 0, 0, 0]} />
                            </BarChart>
                          ) : (
                            <BarChart data={item.chartData as any} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                              <XAxis dataKey="quarter" stroke="#94a3b8" fontSize={10} tickLine={false} />
                              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                              <Bar dataKey="volume" fill="#059669" radius={[0, 0, 0, 0]} />
                            </BarChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      onClick={onOpenDemo}
                      className="w-full inline-flex items-center justify-between px-4 py-3 bg-slate-950 hover:bg-sky-600 text-white font-semibold text-xs sm:text-sm tracking-wide rounded-none transition-colors duration-200 group/btn cursor-pointer"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </TicTacToeCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
