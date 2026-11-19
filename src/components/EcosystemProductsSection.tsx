import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Network,
  Gift,
  Repeat,
  Zap,
  CreditCard,
  Gamepad2,
  Bot,
  Percent,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { TicTacToeCard } from './TicTacToeCard';

interface EcosystemProductsSectionProps {
  onOpenDemo?: () => void;
}

export const EcosystemProductsSection: React.FC<EcosystemProductsSectionProps> = ({ onOpenDemo }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const products = [
    {
      id: 'access-point',
      stage: 'Earn',
      identity: 'Merchant Network Builder',
      name: 'Access Point',
      icon: Network,
      description: 'Build and expand your merchant & partner network with API-first integration and automated settlement.',
      bullets: [
        '200+ merchant partners',
        'Live in days',
        'Merchant-funded revenue',
        'Smart contract settlement',
      ],
      cta: 'Explore Access Point',
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
      hoverAccent: 'sky' as const,
      iconBoxBg: 'bg-slate-950 text-sky-400 border-slate-800',
      dot: 'text-sky-600',
    },
    {
      id: 'reward-point',
      stage: 'Redeem',
      identity: 'Rewards Redemption Marketplace',
      name: 'Reward Point',
      icon: Gift,
      description: 'A global marketplace spanning airlines, hotels, gift cards, and curated experiences for every member.',
      bullets: [
        'Airlines, hotels & experiences',
        'AI-curated rewards',
        'Money Can\'t Buy moments',
        'Reduces point liability',
      ],
      cta: 'Explore Reward Point',
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      hoverAccent: 'indigo' as const,
      iconBoxBg: 'bg-slate-950 text-indigo-400 border-slate-800',
      dot: 'text-indigo-600',
    },
    {
      id: 'xpand-point',
      stage: 'Exchange',
      identity: 'Enterprise Rewards Exchange',
      name: 'Xpand Point',
      icon: Repeat,
      description: 'Real-time cross-program exchange that instantly converts dormant point liability into active member value.',
      bullets: [
        '900+ airlines connected',
        'Real-time exchange',
        'Patented blockchain settlement',
        'Instant liability reduction',
      ],
      cta: 'Explore Xpand Point',
      badge: 'bg-amber-50 text-amber-800 border-amber-200',
      hoverAccent: 'amber' as const,
      iconBoxBg: 'bg-slate-950 text-amber-400 border-slate-800',
      dot: 'text-amber-600',
    },
    {
      id: 'perk-point',
      stage: 'Launch',
      identity: 'Instant Loyalty Launcher',
      name: 'Perk Point',
      icon: Zap,
      description: 'A complete loyalty program for any business — live in under 24 hours with zero code and zero upfront cost.',
      bullets: [
        'Live in 24 hours',
        'Zero upfront cost',
        'Global ecosystem access',
        'SME to enterprise',
      ],
      cta: 'Explore Perk Point',
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      hoverAccent: 'emerald' as const,
      iconBoxBg: 'bg-slate-950 text-emerald-400 border-slate-800',
      dot: 'text-emerald-600',
    },
    {
      id: 'giftos-point',
      stage: 'Digitize',
      identity: 'Gift Card Management',
      name: 'Giftos Point',
      icon: CreditCard,
      description: 'Omnichannel gift card issuance across WhatsApp, email, and in-store POS with real-time inventory management.',
      bullets: [
        'WhatsApp & email delivery',
        'Digital + physical',
        'Enterprise bulk gifting',
        'Real-time tracking',
      ],
      cta: 'Explore Giftos Point',
      badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
      hoverAccent: 'fuchsia' as const,
      iconBoxBg: 'bg-slate-950 text-fuchsia-400 border-slate-800',
      dot: 'text-fuchsia-600',
    },
    {
      id: 'gamepoint',
      stage: 'Engage',
      identity: 'Gamification & Engagement Engine',
      name: 'GamePoint',
      icon: Gamepad2,
      description: 'A gamification engine that turns loyalty into a daily member habit — driving engagement and spend between purchases.',
      bullets: [
        'Daily spins & missions',
        '5–15% spend uplift',
        'API injectable',
        'Leaderboards & streaks',
      ],
      cta: 'Explore GamePoint',
      badge: 'bg-amber-50 text-amber-700 border-amber-200',
      hoverAccent: 'amber' as const,
      iconBoxBg: 'bg-slate-950 text-amber-400 border-slate-800',
      dot: 'text-amber-600',
    },
    {
      id: 'perxi-ai',
      stage: 'Optimize',
      identity: 'Loyalty AI Agent',
      name: 'Perxi AI',
      icon: Bot,
      description: 'LLM-powered loyalty management through a simple WhatsApp conversation — no dashboards, no training required.',
      bullets: [
        'WhatsApp-based management',
        'Meta LLAMA powered',
        'Automated campaign execution',
        'Multi-language support',
      ],
      cta: 'Explore Perxi AI',
      badge: 'bg-sky-50 text-sky-700 border-sky-200',
      hoverAccent: 'sky' as const,
      iconBoxBg: 'bg-slate-950 text-sky-400 border-slate-800',
      dot: 'text-sky-600',
    },
    {
      id: 'offerpoint',
      stage: 'Monetize',
      identity: 'Merchant Offer Aggregator',
      name: 'OfferPoint',
      icon: Percent,
      description: 'Connect merchant-funded offers to your cardholders and members — driving spend at zero cost to the program.',
      bullets: [
        'Merchant-funded offers',
        'Zero program cost',
        '5–15% spend uplift',
        'Real-time optimization',
      ],
      cta: 'Explore OfferPoint',
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      hoverAccent: 'emerald' as const,
      iconBoxBg: 'bg-slate-950 text-emerald-400 border-slate-800',
      dot: 'text-emerald-600',
    },
  ];

  return (
    <section id="products" className="relative w-full py-16 sm:py-24 bg-white border-y border-slate-200/80 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-600 uppercase bg-sky-50 border border-sky-200/80 mb-4 rounded-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>THE ECOSYSTEM</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-3"
            >
              Eight products. <br className="hidden sm:inline" />
              <span className="text-slate-700 font-semibold">One connected loyalty ecosystem.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 font-medium max-w-2xl"
            >
              Each product solves a specific stage of the loyalty lifecycle — together they power the entire ecosystem.
            </motion.p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous products"
              className="p-3 rounded-none bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next products"
              className="p-3 rounded-none bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll Track Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none min-w-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
                className="snap-start shrink-0 w-[310px] sm:w-[380px] lg:w-[420px]"
              >
                <TicTacToeCard
                  hoverAccent={item.hoverAccent}
                  className="p-6 sm:p-7 flex flex-col justify-between h-full hover:-translate-y-1.5 transition-transform duration-300"
                >
                  <div>
                    {/* Top Bar: Stage Tag & Product Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex px-3 py-1 rounded-none text-[10px] font-mono font-bold tracking-widest uppercase border ${item.badge}`}>
                        {item.stage}
                      </span>
                      <div className={`w-10 h-10 rounded-none ${item.iconBoxBg} border flex items-center justify-center shadow-xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Identity & Name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight leading-snug">
                      {item.identity}
                    </h3>
                    <div className="text-xs font-mono text-slate-500 font-semibold mb-3 tracking-wide">
                      {item.name}
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 pb-5 border-b border-slate-100">
                      {item.description}
                    </p>

                    {/* Bullets Grid */}
                    <div className="grid grid-cols-2 gap-2.5 mb-8">
                      {item.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${item.dot} shrink-0`} />
                          <span className="text-xs text-slate-700 font-medium leading-tight">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Link Button */}
                  <div className="pt-2">
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
