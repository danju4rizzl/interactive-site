import React from 'react';
import { motion } from 'framer-motion';
import { VIDEO_URLS } from '../constants/videos';
import type { MetricItem } from '../types';

const METRICS_DATA: MetricItem[] = [
  { value: '2.4ms', label: 'Synaptic Latency' },
  { value: '99.7%', label: 'Signal Accuracy' },
  { value: '140B', label: 'Neural Parameters' },
];

export const MetricsSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video */}
      <video
        src={VIDEO_URLS.metrics}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
      />

      {/* Subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-6xl mx-auto pt-32 pb-32 px-6 flex flex-col items-center justify-center">
        {/* Subtitle */}
        <motion.h3
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center font-normal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          Performance Metrics
        </motion.h3>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 w-full text-center">
          {METRICS_DATA.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
            >
              <div className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                {item.value}
              </div>
              <div className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
