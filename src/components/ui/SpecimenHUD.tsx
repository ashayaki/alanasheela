'use client';

import React, { useEffect, useRef } from 'react';
import { useHeartbeat } from '@/context/HeartbeatContext';
import { Volume2, VolumeX, Radio, Cpu, ShieldCheck, ExternalLink, Activity } from 'lucide-react';

export const SpecimenHUD: React.FC = () => {
  const {
    isAudioEnabled,
    toggleAudio,
    progress,
    blockchainConfig,
    contractAddress,
    isLiveListening,
  } = useHeartbeat();

  const { stage, isFullEvolution } = progress;
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio biological heartbeat synthesis
  useEffect(() => {
    if (!isAudioEnabled) return;

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const playThump = () => {
      if (ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(54, now);
      osc.frequency.exponentialRampToValueAtTime(24, now + 0.22);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);

      setTimeout(() => {
        if (ctx.state !== 'running') return;
        const subNow = ctx.currentTime;
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();

        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(44, subNow);
        subOsc.frequency.exponentialRampToValueAtTime(20, subNow + 0.18);

        subGain.gain.setValueAtTime(0.001, subNow);
        subGain.gain.linearRampToValueAtTime(0.12, subNow + 0.03);
        subGain.gain.exponentialRampToValueAtTime(0.0001, subNow + 0.25);

        subOsc.connect(subGain);
        subGain.connect(ctx.destination);

        subOsc.start(subNow);
        subOsc.stop(subNow + 0.3);
      }, 180);
    };

    const interval = setInterval(playThump, 1300);
    return () => {
      clearInterval(interval);
    };
  }, [isAudioEnabled]);

  const shortContract = contractAddress
    ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`
    : '0x8888...c1f7';

  return (
    <>
      {/* Top Futuristic Cyber-Terminal Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-30 px-5 py-4 flex items-center justify-between text-xs font-mono select-none pointer-events-none">
        {/* Specimen Designation & Robinhood L2 Network Feed */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-[0.28em] text-white text-xs sm:text-sm holo-text-glow">
                DIGITAL ORGANISM
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hidden sm:inline flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ROBINHOOD L2 (CHAIN 4663)
              </span>
            </div>
            <span className="text-[10px] text-cyan-400/80 tracking-widest hidden sm:inline flex items-center gap-1.5">
              <span>ARBITRUM ORBIT // TOKEN ON-CHAIN HEARTBEATS</span>
              <span className="text-slate-600">•</span>
              <a
                href={`${blockchainConfig.explorerUrl}/address/${contractAddress}`}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:text-white underline decoration-cyan-500/40 flex items-center gap-0.5"
                title="View contract on Robinhood Chain Explorer"
              >
                <span>{shortContract}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </span>
          </div>
        </div>

        {/* Live On-Chain Telemetry & Audio Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* Robinhood L2 Active Listener Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/90 border border-emerald-500/40 text-[10px] text-emerald-300 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="hidden sm:inline font-semibold">ROBINHOOD L2 LIVE</span>
            <span className="sm:hidden font-semibold">L2 LIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-950/85 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 transition-all backdrop-blur-md cursor-pointer"
            title={isAudioEnabled ? 'Mute Heartbeat Audio' : 'Enable Heartbeat Rhythm Audio'}
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-2.5 bg-cyan-400 animate-pulse" />
                  <span className="w-0.5 h-3.5 bg-cyan-400 animate-pulse delay-75" />
                  <span className="w-0.5 h-2 bg-cyan-400 animate-pulse delay-150" />
                </div>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>
      </header>

      {/* Bottom Corner Futuristic Telemetry */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 px-5 py-3 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono select-none pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-cyan-300 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>ROBINHOOD L2 // 1 TX = 1 HEARTBEAT</span>
          </span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-300 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>ARBITRUM ORBIT // ETH L1 SETTLEMENT</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-emerald-400/90 font-medium">CHAIN ID: 4663</span>
          <span className="text-slate-600">//</span>
          <span className="text-purple-300 font-semibold">{stage.morphologyForm.replace(/_/g, ' ')}</span>
        </div>
      </footer>
    </>
  );
};
