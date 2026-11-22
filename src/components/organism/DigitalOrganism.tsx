'use client';

import React from 'react';
import { OrganismCanvas3D } from './OrganismCanvas3D';
import { GlitchRevealLayer } from './GlitchRevealLayer';
import { useHeartbeat } from '@/context/HeartbeatContext';

export const DigitalOrganism: React.FC = () => {
  const { progress } = useHeartbeat();
  const { stage, isFullEvolution } = progress;

  return (
    <div className="relative w-full max-w-[760px] h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center mx-auto my-auto select-none">
      {/* Dynamic Specimen Ambient Glow (Clean, No Distracting Text) */}
      <div
        className="absolute inset-0 rounded-full transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{
          background: isFullEvolution
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 65%)'
            : `radial-gradient(circle, ${stage.themeColor}18 0%, transparent 60%)`,
          opacity: Math.max(0.4, progress.ratio),
        }}
      />

      {/* 3D Living Organism wrapped in Glitch/Reveal Layer */}
      <GlitchRevealLayer>
        <OrganismCanvas3D />
      </GlitchRevealLayer>
    </div>
  );
};
