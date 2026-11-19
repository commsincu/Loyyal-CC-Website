import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star, Building2, Plane, ShoppingBag, ShieldCheck } from 'lucide-react';
import { TicTacToeCard } from './TicTacToeCard';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      id: '1',
      quote: "Loyyal's real-time points exchange allowed us to expand our earning partners tenfold without increasing balance sheet liabilities. Our members engage far more frequently between flights now.",
      author: 'Marcus Vance',
      role: 'VP of Loyalty & Customer Value',
      company: 'Global Airline Alliance',
      category: 'Airlines',
      categoryIcon: Plane,
      hoverAccent: 'sky' as const,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      quote: 'Merchant-funded offers powered by OfferPoint enabled our credit card division to boost daily transaction volumes by 28% at zero cost to our rewards program operations.',
      author: 'Sarah Chen',
      role: 'Head of Consumer Cards & Rewards',
      company: 'Leading Middle East Financial Group',
      category: 'Banking',
      categoryIcon: Building2,
      hoverAccent: 'purple' as const,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      quote: 'By unifying our tenant merchants under Loyyal\'s instant loyalty launcher, we created a single digital gift card ecosystem that raised footfall and dwell time across 400+ retail outlets.',
      author: 'Tariq Al-Mansoor',
      role: 'Chief Commercial Officer',
      company: 'Premier Mall & Retail Group',
      category: 'Retail & Malls',
      categoryIcon: ShoppingBag,
      hoverAccent: 'emerald' as const,
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <section id="testimonials" className="relative w-full py-16 sm:py-24 bg-white text-slate-900 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-sky-600 uppercase bg-sky-50 border border-sky-200/80 mb-4 rounded-none"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>TESTIMONIALS & TRUST</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4"
          >
            Trusted by visionary leaders <br className="hidden sm:inline" />
            <span className="text-slate-700 font-semibold">across the global loyalty spectrum.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-medium"
          >
            Discover how enterprise leaders leverage Loyyal to unlock real-time settlement and partner liquidity.
          </motion.p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, index) => {
            const CategoryIcon = item.categoryIcon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 * index }}
                className="h-full flex flex-col"
              >
                <TicTacToeCard
                  hoverAccent={item.hoverAccent}
                  className="p-6 sm:p-8 flex flex-col justify-between h-full hover:-translate-y-1.5 transition-transform duration-300"
                >
                  <div>
                    {/* Category Tag & Rating */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-none bg-white border border-slate-300 text-xs text-slate-700 font-medium shadow-2xs">
                        <CategoryIcon className="w-3.5 h-3.5 text-sky-600" />
                        <span>{item.category}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-sky-500/30 mb-4 group-hover:text-sky-600/50 transition-colors" />

                    {/* Quote text */}
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-8 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author Metadata */}
                  <div className="pt-6 border-t border-slate-200/80 flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-12 h-12 rounded-none object-cover border border-slate-300 shadow-2xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-950 tracking-wide">
                        {item.author}
                      </h4>
                      <p className="text-xs text-sky-600 font-semibold">
                        {item.role}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {item.company}
                      </p>
                    </div>
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
