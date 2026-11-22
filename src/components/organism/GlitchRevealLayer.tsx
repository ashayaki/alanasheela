'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useHeartbeat } from '@/context/HeartbeatContext';

interface GlitchRevealLayerProps {
  children: React.ReactNode;
}

export const GlitchRevealLayer: React.FC<GlitchRevealLayerProps> = ({ children }) => {
  const { progress } = useHeartbeat();
  const { ratio, stage, isFullEvolution } = progress;

  // Track if 100% was just reached to trigger special reveal shockwave
  const [justReachedFull, setJustReachedFull] = useState(false);

  useEffect(() => {
    if (isFullEvolution) {
      setJustReachedFull(true);
      const timer = setTimeout(() => {
        setJustReachedFull(false);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setJustReachedFull(false);
    }
  }, [isFullEvolution]);

  // Dynamic blur calculation tied to stage specifications for immediate engagement from 1,000+
  const blurAmount = useMemo(() => {
    if (isFullEvolution) return 0;
    return stage.blurAmountPx;
  }, [stage.blurAmountPx, isFullEvolution]);

  // Translucent atmospheric shroud (light veil that clears early to reveal 3D specimen)
  const shroudOpacity = useMemo(() => {
    if (isFullEvolution) return 0;
    // At 0: 0.45; at 1,000+: drops to 0.18; clears continuously
    const base = progress.current === 0n ? 0.45 : Math.max(0, 0.25 * (1 - stage.clarity));
    return base;
  }, [progress.current, stage.clarity, isFullEvolution]);

  // Scanline & static noise intensity
  const noiseOpacity = useMemo(() => {
    if (isFullEvolution) return 0;
    return stage.glitchIntensity * 0.22;
  }, [stage.glitchIntensity, isFullEvolution]);

  // SVG turbulence displacement scale
  const displacementScale = useMemo(() => {
    if (isFullEvolution) return 0;
    return stage.chromaticShiftPx * 1.5;
  }, [stage.chromaticShiftPx, isFullEvolution]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* SVG Filter for procedural digital displacement distortion */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="organism-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.09"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Primary Organism Container with dynamic CSS distortion filter */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-all duration-300"
        style={{
          filter: displacementScale > 0.5 ? 'url(#organism-distortion)' : 'none',
        }}
      >
        {children}
      </div>

      {/* Glitch Overlay 1: Backdrop Blur & Diffusion Shroud */}
      {blurAmount > 0.1 && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300 backdrop-blur-md"
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
          }}
        />
      )}

      {/* Glitch Overlay 2: Synthetic Occlusion Veil (Dense at 0%, clear at 100%) */}
      {shroudOpacity > 0.01 && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 flex items-center justify-center"
          style={{
            opacity: shroudOpacity,
            background: `radial-gradient(circle at center, rgba(3, 7, 10, ${shroudOpacity * 0.7}) 0%, rgba(3, 7, 10, ${shroudOpacity}) 60%, rgba(3, 7, 10, 0.98) 100%)`,
          }}
        >
          {/* Faint static interference blocks when heavily obscured */}
          {stage.glitchIntensity > 0.4 && (
            <div className="w-64 h-64 border border-cyan-500/10 rounded-full animate-pulse opacity-40" />
          )}
        </div>
      )}

      {/* Glitch Overlay 3: Scanlines & CRT Horizontal Noise Grid */}
      {noiseOpacity > 0.01 && (
        <div
          className="absolute inset-0 pointer-events-none select-none mix-blend-overlay transition-opacity duration-300"
          style={{
            opacity: noiseOpacity,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 245, 212, 0.08) 2px,
              rgba(0, 245, 212, 0.08) 4px
            )`,
          }}
        />
      )}

      {/* Glitch Overlay 4: RGB Chromatic Aberration Fringe (Flashes on high glitch) */}
      {stage.glitchIntensity > 0.25 && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-25 animate-glitch-jitter"
          style={{
            transform: `translate(${stage.chromaticShiftPx * 0.5}px, 0)`,
            filter: 'hue-rotate(90deg) contrast(150%)',
          }}
        />
      )}

      {/* Special 100% Reveal Shockwave Ring Animation */}
      {justReachedFull && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-emerald-400 animate-reveal-shockwave shadow-[0_0_80px_rgba(16,185,129,0.8)]" />
          <div className="w-10 h-10 rounded-full bg-emerald-300/30 blur-2xl animate-reveal-flash" />
        </div>
      )}
    </div>
  );
};
