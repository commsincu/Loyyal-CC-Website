import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { TicTacToeCard } from './TicTacToeCard';

export const InquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    industry: 'Airlines',
    programSize: '1M+ Members',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="inquiry" className="relative w-full py-16 sm:py-24 bg-white text-slate-900 border-y border-slate-200/80 overflow-hidden">
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
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            <span>ENTERPRISE INQUIRY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4"
          >
            Ready to transform <br className="hidden sm:inline" />
            <span className="text-slate-700 font-semibold">your loyalty infrastructure?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 font-medium"
          >
            Schedule a technical deep dive with Loyyal’s solution architects or explore custom deployment models.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact & Global Hubs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 h-full flex flex-col"
          >
            <TicTacToeCard hoverAccent="sky" className="p-6 sm:p-8 flex flex-col justify-between h-full bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-slate-950 tracking-tight mb-2">
                  Enterprise Solutions Desk
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                  Connect with our team to discuss partner onboarding, API specifications, or custom blockchain integration.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-none bg-white border border-slate-300 text-sky-600 shrink-0 shadow-2xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Direct Email
                      </h4>
                      <a href="mailto:sales@loyyal.com" className="text-sm font-semibold text-slate-950 hover:text-sky-600 transition-colors">
                        sales@loyyal.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-none bg-white border border-slate-300 text-emerald-600 shrink-0 shadow-2xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Response SLA
                      </h4>
                      <p className="text-sm font-semibold text-slate-950">
                        Guaranteed response within 24 business hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-none bg-white border border-slate-300 text-indigo-600 shrink-0 shadow-2xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        Global Offices
                      </h4>
                      <p className="text-sm font-semibold text-slate-950">
                        San Francisco · Dubai · London · Singapore
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-4 rounded-none bg-white border border-slate-300 flex items-center gap-3 text-xs text-slate-600 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>SOC2 Type II Certified & GDPR Compliant Security Controls.</span>
              </div>
            </TicTacToeCard>
          </motion.div>

          {/* Right Column: Interactive Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 h-full flex flex-col"
          >
            <TicTacToeCard hoverAccent="sky" className="p-6 sm:p-8 flex flex-col justify-between h-full bg-slate-50/50">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center my-auto">
                  <div className="w-16 h-16 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-950 mb-2">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                    Thank you, <span className="font-semibold text-slate-950">{formData.fullName}</span>. One of Loyyal’s solution architects will reach out to <span className="font-semibold text-slate-950">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-none bg-slate-950 hover:bg-slate-800 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Etihad Airways / ADCB"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Industry Sector
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-none bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors cursor-pointer"
                      >
                        <option value="Airlines">Airlines & Aviation</option>
                        <option value="Banking">Banking & Financial Services</option>
                        <option value="Retail">Retail & E-commerce</option>
                        <option value="Telecom">Telecom & Communications</option>
                        <option value="Shopping Malls">Shopping Malls & Commercial Real Estate</option>
                        <option value="SME">SME Loyalty Network</option>
                        <option value="Other">Other Enterprise Sector</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                      How Can We Help? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Briefly describe your loyalty goals, partner network scope, or integration requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-none bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-none bg-slate-950 hover:bg-sky-600 text-white font-bold text-sm tracking-wide transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Enterprise Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </TicTacToeCard>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
