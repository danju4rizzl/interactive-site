import React from 'react';
import { motion } from 'framer-motion';
import type { ArchitectureLayer } from '../types';

const LAYERS: ArchitectureLayer[] = [
  { layerNumber: 'Layer 1', title: 'Capture' },
  { layerNumber: 'Layer 2', title: 'Process' },
  { layerNumber: 'Layer 3', title: 'Interface' },
];

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen min-h-[100dvh] bg-black flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <div className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">
            Architecture
          </div>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Three layers. Zero friction.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Sensor layer captures raw bioelectric signals. Processing layer
            isolates intent. Interface layer delivers structured output to any
            connected system.
          </p>
        </motion.div>

        {/* Layer Cards */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-4 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
        >
          {LAYERS.map((layer) => (
            <div
              key={layer.layerNumber}
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 bg-white/[0.02] transition-colors hover:border-white/20"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase font-mono">
                {layer.layerNumber}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">
                {layer.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
