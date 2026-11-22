'use client';

import React from 'react';
import { useHeartbeat } from '@/context/HeartbeatContext';
import { formatHeartbeats } from '@/lib/heartbeat-math';
import { Activity } from 'lucide-react';

export const HeartbeatCounter: React.FC = () => {
  const { displayedHeartbeats, target, progress } = useHeartbeat();
  const { isFullEvolution } = progress;

  const formattedCurrent = formatHeartbeats(displayedHeartbeats);
  const formattedTarget = formatHeartbeats(target);

  return (
    <div className="flex flex-col items-center justify-center text-center select-none font-mono">
      {/* Futuristic Telemetry Header */}
      <div className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-cyan-400 font-semibold mb-1.5 flex items-center gap-2">
        <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span className="holo-text-glow">HEARTBEATS MATRIX</span>
        <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
      </div>

      {/* Futuristic Holographic Value Display */}
      <div className="relative flex items-center justify-center">
        {/* Subtle decorative tech brackets */}
        <span className="text-cyan-500/40 text-2xl sm:text-3xl font-light select-none mr-2">
          [
        </span>

        <div
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums transition-all duration-500 ${
            isFullEvolution
              ? 'text-emerald-300 holo-text-emerald'
              : 'text-white holo-text-glow'
          }`}
        >
          {formattedCurrent}
        </div>

        <span className="text-cyan-500/40 text-2xl sm:text-3xl font-light select-none ml-2">
          ]
        </span>
      </div>

      {/* Separator / */}
      <div className="text-xs sm:text-sm font-light text-cyan-400/50 my-0.5 select-none tracking-widest">
        /
      </div>

      {/* Target: 66,666,666,666 */}
      <div className="text-xs sm:text-sm md:text-base font-medium text-slate-400 tracking-widest tabular-nums">
        {formattedTarget}
      </div>
    </div>
  );
};
