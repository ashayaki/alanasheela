'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#fbf9f5] pt-10 pb-8 sm:pt-14 sm:pb-12 border-b border-[#eae1d4]">
      {/* Soft Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#dbe8de]/30 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10 flex flex-col items-center">
        
        {/* Domain Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#ded5c6] text-[#555d44] text-xs tracking-widest uppercase shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#5c6846]"></span>
          <span>alanasheela.shop</span>
        </div>

        {/* Official ASC Transparent Logo (In place of small text ASC) */}
        <div className="pt-1 pb-1">
          <img
            src="/images/asc-logo.png"
            alt="ASC — Alana Sheela Clarissa Official Logo"
            className="w-auto h-32 sm:h-40 md:h-48 object-contain mx-auto drop-shadow-xs transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Big, Well-Proportioned Typography */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif-luxury font-medium tracking-tight text-[#24291e] leading-[1.08]">
            Lala Style Picks
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg font-bold tracking-[0.2em] uppercase text-[#3e482e] pt-1">
            INSPIRED BY LALA, PICKED FOR YOU
          </p>
          
          <p className="text-base sm:text-xl md:text-2xl text-[#616c54] font-serif-luxury italic">
            Inspirasi Belanja Modis Ala Lala
          </p>
        </div>

        {/* Centered Action Button */}
        <div className="pt-3 flex justify-center">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center justify-center gap-2.5 bg-[#4a5438] hover:bg-[#3b442b] text-white font-medium text-xs tracking-[0.18em] uppercase px-8 py-3.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer group"
          >
            <span>Lihat Koleksi Baju</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
}
