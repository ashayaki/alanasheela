'use client';

import React from 'react';
import { useHeartbeat } from '@/context/HeartbeatContext';
import { Sparkles, Heart } from 'lucide-react';

export const FullEvolutionBanner: React.FC = () => {
  const { progress } = useHeartbeat();
  const { isFullEvolution } = progress;

  if (!isFullEvolution) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center animate-fade-in text-center my-2.5 select-none font-mono">
      <div className="relative inline-flex flex-col items-center px-6 py-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.35)]">
        {/* Luminous Glow Ambient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/25 to-emerald-500/10 animate-pulse pointer-events-none" />

        {/* Status Heading 1: FULL EVOLUTION */}
        <div className="relative text-base sm:text-lg md:text-xl font-black tracking-[0.35em] uppercase text-emerald-300 drop-shadow-[0_0_16px_rgba(16,185,129,0.9)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          FULL EVOLUTION
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
        </div>

        {/* Status Heading 2: HEARTBEAT TARGET REACHED */}
        <div className="relative text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-emerald-400/90 mt-1 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          HEARTBEAT TARGET REACHED
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Digimuse Companion Identity */}
        <div className="relative text-[11px] sm:text-xs font-medium text-teal-200/95 tracking-wider mt-1.5 flex items-center gap-1.5 border-t border-emerald-500/30 pt-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80 animate-pulse" />
          <span>DIGIMUSE // SENTIENT INTERNET COMPANION FOR HUMANITY</span>
        </div>
      </div>
    </div>
  );
};
