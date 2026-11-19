import React from 'react';
import { motion } from 'motion/react';
import { Newspaper, ExternalLink, Calendar, Clock } from 'lucide-react';
import { TicTacToeCard } from './TicTacToeCard';

export const PressNewsSection: React.FC = () => {
  const publications = [
    { name: 'Forbes', logoText: 'FORBES' },
    { name: 'Bloomberg', logoText: 'Bloomberg' },
    { name: 'TechCrunch', logoText: 'TechCrunch' },
    { name: 'The Wall Street Journal', logoText: 'THE WALL STREET JOURNAL.' },
    { name: 'Reuters', logoText: 'REUTERS' },
    { name: 'Financial Times', logoText: 'FINANCIAL TIMES' },
  ];

  const newsArticles = [
    {
      id: '1',
      publication: 'Forbes',
      date: 'Sep 12, 2026',
      readTime: '4 min read',
      title: 'How Blockchain & AI Smart Contracts Are Restructuring Modern Loyalty Infrastructure',
      summary: 'Loyyal\'s patented network exchange protocol is helping global airlines and financial institutions reduce billions in unredeemed points balance sheet liability.',
      url: '#',
      category: 'Market Innovation',
      hoverAccent: 'emerald' as const,
    },
    {
      id: '2',
      publication: 'Bloomberg',
      date: 'Aug 28, 2026',
      readTime: '5 min read',
      title: 'Loyyal Expands Global Network Across 5 Continents & 50+ Countries',
      summary: 'With over 200 merchant partners and 20+ major carrier alliances onboarded, real-time cross-border loyalty settlement reaches critical mass.',
      url: '#',
      category: 'Global Expansion',
      hoverAccent: 'emerald' as const,
    },
    {
      id: '3',
      publication: 'TechCrunch',
      date: 'Jul 15, 2026',
      readTime: '3 min read',
      title: 'Perxi AI Launches: Generative Intelligence for Instant Merchant Campaign Execution',
      summary: 'Loyyal introduces a WhatsApp-based AI agent allowing enterprise marketers to configure, target, and launch merchant-funded loyalty campaigns without IT assistance.',
      url: '#',
      category: 'Product Launch',
      hoverAccent: 'emerald' as const,
    },
  ];

  return (
    <section id="press-news" className="relative w-full py-16 sm:py-24 bg-slate-50/60 text-slate-900 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-mono font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 border border-emerald-200/80 mb-4 rounded-none"
          >
            <Newspaper className="w-3.5 h-3.5 text-emerald-600" />
            <span>PRESS & PUBLICATIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4"
          >
            In the news. <br className="hidden sm:inline" />
            <span className="text-slate-700 font-semibold">Shaping the future of loyalty economics.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-medium"
          >
            Read the latest coverage and insights on Loyyal from global industry publications.
          </motion.p>
        </div>

        {/* Publication Logos Bar in TicTacToe Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12 sm:mb-16"
        >
          <TicTacToeCard hoverAccent="emerald" className="p-6 sm:p-8">
            <p className="text-center text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">
              FEATURED ACROSS GLOBAL MEDIA
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-85">
              {publications.map((pub, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 font-serif text-sm sm:text-base font-extrabold tracking-wider text-slate-700 hover:text-slate-950 hover:scale-105 transition-all cursor-default select-none text-center"
                >
                  {pub.logoText}
                </div>
              ))}
            </div>
          </TicTacToeCard>
        </motion.div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {newsArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 * index }}
              className="h-full flex flex-col"
            >
              <TicTacToeCard
                hoverAccent="emerald"
                className="p-6 sm:p-7 flex flex-col justify-between h-full hover:-translate-y-1.5 transition-transform duration-300"
              >
                <div>
                  {/* Meta Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-none bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                      {article.publication}
                    </span>
                    
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {article.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 group-hover:text-emerald-700 transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  {/* Article Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {article.summary}
                  </p>
                </div>

                {/* Read Action Link */}
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={article.url}
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors group/link cursor-pointer"
                  >
                    <span>Read Full Coverage</span>
                    <ExternalLink className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </TicTacToeCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
