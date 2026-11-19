import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { OrbitingConcentricLayout } from './components/OrbitingConcentricLayout';
import { AchievementsSection } from './components/AchievementsSection';
import { SolutionsSection } from './components/SolutionsSection';
import { EcosystemProductsSection } from './components/EcosystemProductsSection';
import { IndustriesSection } from './components/IndustriesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PressNewsSection } from './components/PressNewsSection';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { DemoRequestModal } from './components/DemoRequestModal';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemo = () => setIsDemoModalOpen(true);
  const handleCloseDemo = () => setIsDemoModalOpen(false);

  // Reusable motion wrapper props for scroll fade-in & slide-up
  const sectionAnimation = {
    initial: { opacity: 0, y: 35 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-sky-100 selection:text-sky-900 scroll-smooth">
      {/* Sticky Glassmorphic Header Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} />

      <main className="w-full flex flex-col items-center overflow-x-clip">
        {/* Stage 1: Hero Interactive 3D Globe Network */}
        <section className="w-full">
          <OrbitingConcentricLayout />
        </section>

        {/* Industry Recognition, Awards & Certifications */}
        <motion.section {...sectionAnimation} className="w-full flex justify-center">
          <AchievementsSection />
        </motion.section>

        {/* Section 3: 360° Loyalty Solutions (Acquire, Engage, Scale) */}
        <motion.section {...sectionAnimation} className="w-full flex justify-center">
          <SolutionsSection onOpenDemo={handleOpenDemo} />
        </motion.section>

        {/* Section 4: Eight Ecosystem Products */}
        <motion.section {...sectionAnimation} className="w-full flex justify-center">
          <EcosystemProductsSection onOpenDemo={handleOpenDemo} />
        </motion.section>

        {/* Section 5: Industries (Airlines, Banking, Retail, Telecom, Malls, SMEs) */}
        <motion.section {...sectionAnimation} className="w-full flex justify-center">
          <IndustriesSection onOpenDemo={handleOpenDemo} />
        </motion.section>

        {/* Section 6: Testimonials & Executive Reviews */}
        <motion.section {...sectionAnimation} className="w-full flex justify-center">
          <TestimonialsSection />
        </motion.section>

        {/* Section 7: Media, News Coverage & Publication Logos */}
        <motion.section {...sectionAnimation} className="w-full flex justify-center">
          <PressNewsSection />
        </motion.section>

        {/* Section 8: Enterprise Inquiry & Contact Form */}
        <motion.section {...sectionAnimation} className="w-full flex justify-center">
          <InquirySection />
        </motion.section>
      </main>

      {/* Enterprise Footer */}
      <Footer onOpenDemo={handleOpenDemo} />

      {/* Interactive Enterprise Demo Request Modal */}
      <DemoRequestModal isOpen={isDemoModalOpen} onClose={handleCloseDemo} />
    </div>
  );
}
