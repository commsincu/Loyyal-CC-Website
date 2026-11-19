import React from 'react';
import { ArrowUp, ShieldCheck, Sparkles } from 'lucide-react';
import { TicTacToeCard } from './TicTacToeCard';

interface FooterProps {
  onOpenDemo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemo }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top CTA Banner in TicTacToe Outline */}
        <div className="relative mb-16">
          <TicTacToeCard hoverAccent="sky" className="p-8 sm:p-12 bg-gradient-to-r from-sky-950 via-slate-950 to-blue-950 border-sky-500/40 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 text-cyan-300 text-xs font-mono font-bold mb-3 border border-cyan-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>MODERNIZE LOYALTY INFRASTRUCTURE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Ready to Upgrade to Real-Time Smart Contract Settlement?
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Connect your loyalty currency to Loyyal's high-speed global network and eliminate back-office reconciliation friction.
                </p>
              </div>

              <button
                onClick={onOpenDemo}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/20 whitespace-nowrap cursor-pointer transition-transform active:scale-95 rounded-none"
              >
                Schedule Partner Onboarding
              </button>
            </div>
          </TicTacToeCard>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold tracking-tight text-white">
                LOYYAL
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Loyyal is the enterprise internet for loyalty. Powering real-time value exchange, automated multi-party clearing, and dynamic liquidity for global airlines, financial institutions, and retail coalitions.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
              <span>Mainnet Ledger Status: Operational</span>
            </div>
          </div>

          {/* Nav Col 1: Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#hero-globe" className="hover:text-cyan-300 transition-colors">Ecosystem</a></li>
              <li><a href="#solutions" className="hover:text-cyan-300 transition-colors">360° Solutions</a></li>
              <li><a href="#products" className="hover:text-cyan-300 transition-colors">Ecosystem Products</a></li>
              <li><a href="#industries" className="hover:text-cyan-300 transition-colors">Industries</a></li>
              <li><a href="#testimonials" className="hover:text-cyan-300 transition-colors">Testimonials</a></li>
              <li><a href="#press-news" className="hover:text-cyan-300 transition-colors">Press & Media</a></li>
              <li><a href="#inquiry" className="hover:text-cyan-300 transition-colors">Enterprise Inquiry</a></li>
            </ul>
          </div>

          {/* Nav Col 2: Corridors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Active Corridors
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><span className="text-slate-300">Etihad Guest</span> (Aviation)</li>
              <li><span className="text-slate-300">ADCB TouchPoints</span> (Banking)</li>
              <li><span className="text-slate-300">Ethiopian ShebaMiles</span> (Airlines)</li>
              <li><span className="text-slate-300">GEMS Rewards</span> (Coalition)</li>
              <li><span className="text-slate-300">ENOC Yes Rewards</span> (Fuel & Retail)</li>
            </ul>
          </div>

          {/* Nav Col 3: Compliance & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Security & Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOC 2 Type II Certified</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>ISO 27001 Compliant</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>AES-256 Zero-Trust Encryption</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>GDPR & Data Privacy Guard</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Loyyal Corporation. All rights reserved. Built for enterprise loyalty interoperability.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer border border-slate-800"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
