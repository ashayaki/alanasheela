'use client';

import React from 'react';
import { useHeartbeat } from '@/context/HeartbeatContext';
import { Zap, Cpu } from 'lucide-react';

export const LifeEnergyProgress: React.FC = () => {
  const { progress, displayedProgress } = useHeartbeat();
  const { stage, isFullEvolution } = progress;
  const synergyPercent = displayedProgress.synergyPercentage;
  const rawPercentage = displayedProgress.percentage;
  const milestoneIdx = displayedProgress.milestoneIndex;
  const totalMilestones = displayedProgress.totalMilestones;

  let formattedRawPercent: string;
  if (rawPercentage >= 100) {
    formattedRawPercent = '100.00%';
  } else if (rawPercentage === 0) {
    formattedRawPercent = '0.00%';
  } else if (rawPercentage < 0.0001) {
    formattedRawPercent = `${rawPercentage.toFixed(6)}%`;
  } else if (rawPercentage < 0.01) {
    formattedRawPercent = `${rawPercentage.toFixed(4)}%`;
  } else {
    formattedRawPercent = `${rawPercentage.toFixed(2)}%`;
  }

  return (
    <div className="w-full max-w-[500px] mx-auto flex flex-col items-center gap-2 select-none font-mono">
      {/* Telemetry Header */}
      <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300 tracking-wider">
        <span className="flex items-center gap-1.5 truncate max-w-[65%]">
          <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse flex-shrink-0" />
          <span className="font-semibold text-slate-100 truncate">{stage.name}</span>
        </span>
        <span className="text-cyan-300 font-bold tracking-wider tabular-nums holo-text-glow flex-shrink-0">
          [{milestoneIdx + 1}/{totalMilestones}] {synergyPercent.toFixed(1)}%
        </span>
      </div>

      {/* Holographic Plasma Conduit Track (Driven by 32 Curated Milestones) */}
      <div className="relative w-full h-3 rounded-md bg-slate-950/90 border border-cyan-500/40 p-[2px] overflow-hidden shadow-[inset_0_1px_6px_rgba(0,0,0,0.9),0_0_12px_rgba(0,240,255,0.15)]">
        {/* Holographic Matrix Grid Ticks */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0, 240, 255, 0.6) 10px, rgba(0, 240, 255, 0.6) 11px)',
          }}
        />

        {/* Dynamic Plasma Energy Fill */}
        <div
          className="relative h-full rounded-sm transition-all duration-300 ease-out flex items-center justify-end"
          style={{
            width: `${Math.min(100, Math.max(1.2, synergyPercent))}%`,
            background: isFullEvolution
              ? 'linear-gradient(90deg, #0284c7 0%, #00f0ff 40%, #00f5a0 80%, #ffffff 100%)'
              : 'linear-gradient(90deg, #4338ca 0%, #bf5af2 40%, #00f0ff 100%)',
            boxShadow: isFullEvolution
              ? '0 0 18px rgba(0, 245, 160, 0.95), 0 0 35px rgba(0, 240, 255, 0.5)'
              : '0 0 14px rgba(0, 240, 255, 0.9), 0 0 28px rgba(191, 90, 242, 0.4)',
          }}
        >
          {/* Energy Surge Spark at Leading Edge */}
          <div
            className={`w-3 h-3 rounded-full -mr-1 flex-shrink-0 animate-ping ${
              isFullEvolution
                ? 'bg-white shadow-[0_0_12px_#00f5a0]'
                : 'bg-white shadow-[0_0_10px_#00f0ff]'
            }`}
          />
        </div>
      </div>

      {/* Futuristic Telemetry Sub-caption */}
      <div className="w-full flex items-center justify-between text-[9px] text-slate-400 tracking-wider">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>FORM // {stage.morphologyForm.replace(/_/g, ' ')}</span>
        </span>
        <span className="text-cyan-400/80 font-mono">
          TARGET PROGRESS // {formattedRawPercent}
        </span>
      </div>
    </div>
  );
};
