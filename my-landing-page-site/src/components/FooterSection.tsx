import React from 'react';
import { SynapseXLogo } from './SynapseXLogo';
import { VIDEO_URLS } from '../constants/videos';

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full bg-black overflow-hidden border-t border-white/5">
      <div className="flex flex-col md:flex-row min-h-[400px] w-full">
        {/* Left: CloudFront Ambient Video */}
        <div className="w-full md:w-1/2 h-[300px] md:min-h-[400px] md:h-auto relative overflow-hidden">
          <video
            src={VIDEO_URLS.footer}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-black/80 pointer-events-none" />
        </div>

        {/* Right: Brand and Copyright Info */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-10 sm:p-16">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <SynapseXLogo className="w-[18px] h-[18px] text-white/70" />
              <span className="text-[15px] font-medium text-white/70 tracking-tight">
                SynapseX
              </span>
            </div>
            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm font-sans">
              The next evolution of human-machine interaction. Built for those who
              refuse to be limited by biology alone.
            </p>
          </div>

          <div className="text-white/25 text-[12px] mt-12 font-mono">
            &copy; 2026 SynapseX Labs. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
