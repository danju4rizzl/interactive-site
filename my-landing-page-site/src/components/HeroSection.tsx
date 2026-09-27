import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { VIDEO_URLS } from '../constants/videos';
import { ScrambleIn } from './ScrambleIn';

interface HeroSectionProps {
  entranceComplete: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ entranceComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number | null>(null);

  // Setup video scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure paused on start
    video.pause();
    video.currentTime = 0;

    const handleSeeked = () => {
      if (!video) return;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
        video.currentTime = targetTimeRef.current;
      } else {
        isSeekingRef.current = false;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      if (!video || !video.duration || Number.isNaN(video.duration)) return;

      if (lastMouseXRef.current === null) {
        lastMouseXRef.current = e.clientX;
        return;
      }

      const deltaX = e.clientX - lastMouseXRef.current;
      lastMouseXRef.current = e.clientX;

      // Delta based scrubbing with sensitivity factor 0.8
      const scrubDelta = (deltaX / window.innerWidth) * video.duration * 0.8;
      targetTimeRef.current = Math.min(
        Math.max(targetTimeRef.current + scrubDelta, 0),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!video || !video.duration || Number.isNaN(video.duration) || e.touches.length === 0) return;
      const clientX = e.touches[0].clientX;

      if (lastMouseXRef.current === null) {
        lastMouseXRef.current = clientX;
        return;
      }

      const deltaX = clientX - lastMouseXRef.current;
      lastMouseXRef.current = clientX;

      const scrubDelta = (deltaX / window.innerWidth) * video.duration * 0.8;
      targetTimeRef.current = Math.min(
        Math.max(targetTimeRef.current + scrubDelta, 0),
        video.duration
      );

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    const handleTouchEnd = () => {
      lastMouseXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 justify-between">
      {/* Background Video (Mouse Scrubbed, paused on load) */}
      <video
        ref={videoRef}
        src={VIDEO_URLS.hero}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />

      {/* Dot Grid Overlay (radial-gradient 24x24px grid, opacity 0.05) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5 z-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Large Background Watermark Text: TRANSCENDENCE in Anton SC */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-[50px] pointer-events-none select-none font-anton uppercase text-[clamp(120px,30vw,521px)] leading-none opacity-10 z-10 whitespace-nowrap text-center"
        style={{
          background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-4px',
        }}
        aria-hidden="true"
      >
        TRANSCENDENCE
      </div>

      {/* Spacer to push content to bottom */}
      <div className="flex-1" />

      {/* Bottom Content Area */}
      <motion.div
        className="relative z-20 w-full flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        {/* Left Column: Heading and Description */}
        <div className="flex flex-col gap-4">
          <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
            <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
          </h1>

          <motion.p
            className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed font-sans"
            initial={{ y: 25, opacity: 0 }}
            animate={
              entranceComplete
                ? { y: 0, opacity: 1 }
                : { y: 25, opacity: 0 }
            }
            transition={{
              duration: 0.9,
              ease: [0.215, 0.61, 0.355, 1],
              delay: 0.2,
            }}
          >
            Built at the intersection of neuroscience and artificial intelligence.
            SynapseX continuously maps neural pathways, cognitive load, and
            physiological states into a single adaptive intelligence layer.
          </motion.p>
        </div>

        {/* Right Column: Heading */}
        <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)] text-left md:text-right">
          <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
          <br />
          <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
        </h1>
      </motion.div>
    </section>
  );
};
