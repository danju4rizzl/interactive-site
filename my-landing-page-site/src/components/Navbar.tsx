import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SynapseXLogo } from './SynapseXLogo';
import { SquashHamburger } from './SquashHamburger';
import { ScrambleText } from './ScrambleText';

interface NavbarProps {
  entranceComplete: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ entranceComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isDownloadHovered, setIsDownloadHovered] = useState(false);

  const springTransition = {
    type: 'spring' as const,
    stiffness: 350,
    damping: 28,
  };

  const scrollToPosition = (yPos: number) => {
    window.scrollTo({
      top: yPos,
      behavior: 'smooth',
    });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full h-20 z-50 px-4 sm:px-8 flex items-center justify-between pointer-events-none select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* ================= DESKTOP NAVBAR (sm and above) ================= */}
      <div className="hidden sm:flex items-center justify-between w-full pointer-events-auto">
        {/* Left Group */}
        <div className="flex items-center gap-2">
          {/* Logo Pill */}
          <motion.div
            className={`h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] items-center gap-2.5 cursor-pointer ${
              isMenuOpen ? 'hidden md:flex' : 'flex'
            }`}
            onClick={() => scrollToPosition(0)}
            whileHover={{
              scale: 1.02,
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <SynapseXLogo className="w-[18px] h-[18px] text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">
              SynapseX
            </span>
          </motion.div>

          {/* Expanding Menu Pill */}
          <motion.div
            className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
            animate={{ width: isMenuOpen ? 290 : 48 }}
            transition={springTransition}
          >
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`flex items-center justify-center transition-all ${
                isMenuOpen
                  ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5'
                  : 'w-12 h-12 rounded-[14px]'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={false} />
            </button>

            {/* Nav Links */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  className="flex items-center gap-6 ml-6 pr-6"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => scrollToPosition(window.innerHeight)}
                    onMouseEnter={() => setHoveredLink('about')}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-[16px] font-normal text-white/85 hover:text-white cursor-pointer transition-colors"
                  >
                    <ScrambleText
                      text="About"
                      isHovered={hoveredLink === 'about'}
                    />
                  </button>
                  <button
                    onClick={() => scrollToPosition(window.innerHeight * 2)}
                    onMouseEnter={() => setHoveredLink('metrics')}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-[16px] font-normal text-white/85 hover:text-white cursor-pointer transition-colors"
                  >
                    <ScrambleText
                      text="Metrics"
                      isHovered={hoveredLink === 'metrics'}
                    />
                  </button>
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right: Download Button */}
        <motion.button
          onClick={() => {
            alert('SynapseX Neural Core installer download initialized.');
          }}
          onMouseEnter={() => setIsDownloadHovered(true)}
          onMouseLeave={() => setIsDownloadHovered(false)}
          className="h-12 px-6 bg-white rounded-full flex items-center gap-2 text-black cursor-pointer font-medium text-[15px]"
          whileHover={{
            scale: 1.03,
            backgroundColor: '#e2e2e6',
          }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="bi bi-apple text-[17px] leading-none" />
          <ScrambleText text="Download" isHovered={isDownloadHovered} />
        </motion.button>
      </div>

      {/* ================= MOBILE NAVBAR (visible below sm) ================= */}
      <div className="flex sm:hidden items-center justify-between w-full pointer-events-auto gap-2">
        {/* Mobile Left Group */}
        <div className="flex items-center gap-2 flex-1">
          {/* Mobile Logo Pill (collapses to 0 width when open) */}
          <motion.div
            className="h-9 px-3 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-2 cursor-pointer overflow-hidden whitespace-nowrap"
            onClick={() => scrollToPosition(0)}
            animate={{
              width: isMenuOpen ? 0 : 'auto',
              paddingLeft: isMenuOpen ? 0 : 12,
              paddingRight: isMenuOpen ? 0 : 12,
              opacity: isMenuOpen ? 0 : 1,
            }}
            transition={springTransition}
          >
            <SynapseXLogo className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <span className="text-[13px] font-medium tracking-tight text-white">
              SynapseX
            </span>
          </motion.div>

          {/* Mobile Menu Capsule (expands full width when open) */}
          <motion.div
            className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden"
            animate={{
              width: isMenuOpen ? '100%' : '36px',
            }}
            transition={springTransition}
          >
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="w-9 h-9 flex items-center justify-center flex-shrink-0"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <SquashHamburger isOpen={isMenuOpen} isMobile={true} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.nav
                  className="flex items-center gap-4 px-3 flex-1 justify-around"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  <button
                    onClick={() => scrollToPosition(window.innerHeight)}
                    className="text-[13px] text-white/85 hover:text-white cursor-pointer"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToPosition(window.innerHeight * 2)}
                    className="text-[13px] text-white/85 hover:text-white cursor-pointer"
                  >
                    Metrics
                  </button>
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile Download button */}
        <motion.button
          onClick={() => {
            alert('SynapseX Neural Core installer download initialized.');
          }}
          className="h-9 px-3.5 bg-white rounded-full flex items-center gap-1.5 text-black cursor-pointer font-medium text-[13px] flex-shrink-0"
          whileTap={{ scale: 0.95 }}
        >
          <i className="bi bi-apple text-[14px] leading-none" />
          <span>Download</span>
        </motion.button>
      </div>
    </motion.header>
  );
};
