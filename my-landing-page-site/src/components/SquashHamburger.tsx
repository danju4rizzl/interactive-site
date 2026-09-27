import React from 'react';
import { motion } from 'framer-motion';
import type { SquashHamburgerProps } from '../types';

export const SquashHamburger: React.FC<SquashHamburgerProps> = ({
  isOpen,
  isMobile = false,
}) => {
  const containerWidth = isMobile ? 15 : 18;
  const containerHeight = isMobile ? 10 : 12;
  const barHeight = isMobile ? 1.2 : 1.5;
  const translateY = (containerHeight - barHeight) / 2;

  const springTransition = {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  };

  return (
    <div
      className="relative flex flex-col justify-between items-center cursor-pointer"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      role="button"
      tabIndex={0}
    >
      {/* Top bar */}
      <motion.span
        className="w-full bg-white rounded-full absolute left-0 top-0 origin-center"
        style={{ height: `${barHeight}px` }}
        animate={{
          y: isOpen ? translateY : 0,
          rotate: isOpen ? 45 : 0,
        }}
        transition={springTransition}
      />

      {/* Middle bar */}
      <motion.span
        className="w-full bg-white rounded-full absolute left-0 origin-center"
        style={{
          height: `${barHeight}px`,
          top: `${translateY}px`,
        }}
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0 : 1,
        }}
        transition={springTransition}
      />

      {/* Bottom bar */}
      <motion.span
        className="w-full bg-white rounded-full absolute left-0 bottom-0 origin-center"
        style={{ height: `${barHeight}px` }}
        animate={{
          y: isOpen ? -translateY : 0,
          rotate: isOpen ? -45 : 0,
        }}
        transition={springTransition}
      />
    </div>
  );
};
