import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Ecosystem', href: '#hero-globe' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Products', href: '#products' },
    { name: 'Industries', href: '#industries' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Press', href: '#press-news' },
    { name: 'Inquiry', href: '#inquiry' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <a href="#hero-globe" className="flex items-center gap-3 group cursor-pointer">
          <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
            LOYYAL
          </span>
        </a>

        {/* Desktop Navigation Anchors */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-100/80 p-1.5 rounded-none border border-slate-300 shadow-2xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="px-3.5 py-1.5 rounded-none text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-white transition-all cursor-pointer whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: CTA & Mobile Menu */}
        <div className="flex items-center gap-3">
          
          {/* Book Enterprise Demo CTA */}
          <button
            onClick={onOpenDemo}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-none bg-slate-950 hover:bg-sky-600 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer active:scale-95 shadow-2xs"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white/95 border-b border-slate-200 px-6 py-4 flex flex-col gap-3 shadow-xl backdrop-blur-xl"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="py-2 text-sm font-semibold text-slate-700 hover:text-sky-600 transition-colors border-b border-slate-100 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-2.5 rounded-none bg-slate-950 hover:bg-sky-600 text-white text-xs font-semibold text-center transition-colors cursor-pointer"
            >
              Request Demo
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};
