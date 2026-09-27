import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { VIDEO_URLS } from '../constants/videos';

export const CinematicSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const opacityValue = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transformStyle = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background Video */}
      <video
        src={VIDEO_URLS.cinematic}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      />

      {/* Top Gradient Overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[180px] pointer-events-none z-10"
        style={{
          background: 'linear-gradient(to bottom, #010103 0%, rgba(1, 1, 3, 0) 100%)',
        }}
      />

      {/* 3D Perspective Container */}
      <div
        className="relative z-20 max-w-5xl px-6 sm:px-12 flex items-center justify-center"
        style={{ perspective: '400px' }}
      >
        <motion.p
          style={{
            transform: transformStyle,
            opacity: opacityValue,
          }}
          className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none text-center"
        >
          A neural-AI interface built on the architecture of the human nervous
          system. SynapseX translates synaptic activity into computational
          intelligence. Every signal becomes measurable, structured, and visible.
          It continuously reconstructs internal state as a dynamic neural map.
          Biological noise is filtered into actionable cognitive patterns.
        </motion.p>
      </div>
    </section>
  );
};
