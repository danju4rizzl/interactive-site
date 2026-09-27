import React from 'react';
import { motion } from 'framer-motion';
import { VIDEO_URLS } from '../constants/videos';
import type { TechnologyItem } from '../types';

const TECH_ITEMS: TechnologyItem[] = [
  {
    title: 'Cortical Mapping',
    description: 'Real-time spatial reconstruction of active neural regions.',
  },
  {
    title: 'Signal Isolation',
    description: 'Separates cognitive intent from biological noise.',
  },
  {
    title: 'State Prediction',
    description: 'Anticipates cognitive transitions before they occur.',
  },
  {
    title: 'Loop Feedback',
    description: 'Closed-loop adjustment based on outcome correlation.',
  },
];

export const TechnologySection: React.FC = () => {
  return (
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16 bg-black">
      {/* Background Video */}
      <video
        src={VIDEO_URLS.technology}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-75"
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/25 z-10 pointer-events-none" />

      {/* Top Area */}
      <div className="relative z-20 flex flex-col md:flex-row md:justify-between md:items-start gap-6 pt-12 md:pt-16">
        {/* Left Heading */}
        <motion.h2
          className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
        >
          Adaptive
          <br />
          Intelligence
        </motion.h2>

        {/* Right Paragraph */}
        <motion.p
          className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
        >
          The system learns your neural baseline within 72 hours. From there, every
          cognitive state is mapped, predicted, and optimized in real time.
        </motion.p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Grid */}
      <div className="relative z-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
        {TECH_ITEMS.map((item, index) => (
          <motion.div
            key={item.title}
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.7,
              delay: 0.3 + index * 0.1,
              ease: 'easeOut',
            }}
          >
            <h4 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
              {item.title}
            </h4>
            <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
