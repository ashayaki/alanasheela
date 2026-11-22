'use client';

import React, { useState } from 'react';
import { useHeartbeat } from '@/context/HeartbeatContext';
import { HEARTBEAT_PRESETS } from '@/lib/constants';
import { safeParseBigInt } from '@/lib/heartbeat-math';
import {
  Sliders,
  X,
  Play,
  Square,
  Sparkles,
  Terminal,
  ChevronRight,
  ChevronLeft,
  Cpu,
  Radio,
  ExternalLink,
  Plus,
  Check,
} from 'lucide-react';

export const DevMockPanel: React.FC = () => {
  const {
    heartbeats,
    target,
    progress,
    setHeartbeats,
    setPreset,
    isAutoPulse,
    toggleAutoPulse,
    isDevPanelOpen,
    setIsDevPanelOpen,
    blockchainConfig,
    contractAddress,
    setContractAddress,
    isLiveListening,
    toggleLiveListening,
  } = useHeartbeat();

  const [manualInput, setManualInput] = useState<string>('');
  const [contractInput, setContractInput] = useState<string>(contractAddress);
  const [isContractSaved, setIsContractSaved] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const curMilestoneIndex = progress.milestoneIndex;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    const parsed = safeParseBigInt(manualInput);
    setHeartbeats(parsed);
  };

  const handleContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractInput.trim()) return;
    setContractAddress(contractInput.trim());
    setIsContractSaved(true);
    setTimeout(() => setIsContractSaved(false), 2000);
  };

  const handleSimulateSingleTx = () => {
    const next = heartbeats + BigInt(1);
    setHeartbeats(next > target ? target : next);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const scaled = (target * BigInt(Math.round(val * 1000))) / BigInt(100000);
    setHeartbeats(scaled);
  };

  const handlePrevMilestone = () => {
    const prevIdx = Math.max(0, curMilestoneIndex - 1);
    setPreset(HEARTBEAT_PRESETS[prevIdx]);
  };

  const handleNextMilestone = () => {
    const nextIdx = Math.min(HEARTBEAT_PRESETS.length - 1, curMilestoneIndex + 1);
    setPreset(HEARTBEAT_PRESETS[nextIdx]);
  };

  const currentSliderVal = (Number((heartbeats * BigInt(1000)) / target) / 10).toFixed(1);

  // Filter presets by evolutionary phase
  const filteredPresets = HEARTBEAT_PRESETS.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    const idx = p.milestoneIndex ?? 0;
    if (selectedCategory === 'EGG') return idx <= 11; // 0 to 500M
    if (selectedCategory === 'MITOSIS') return idx >= 12 && idx <= 15; // 1B to 7.5B
    if (selectedCategory === 'MORPHO') return idx >= 16 && idx <= 19; // 10B to 25B
    if (selectedCategory === 'MUSE') return idx >= 20 && idx <= 25; // 30B to 55B
    if (selectedCategory === 'FINAL') return idx >= 26; // 60B to 66.6B
    return true;
  });

  return (
    <>
      {/* Floating Futuristic Toggle Button */}
      <button
        onClick={() => setIsDevPanelOpen(!isDevPanelOpen)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-medium backdrop-blur-xl shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        title="Toggle Developer & Robinhood L2 Controls"
      >
        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
        <span className="font-semibold tracking-wider">ROBINHOOD L2 HARNESS</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono">
          {curMilestoneIndex + 1}/32
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      </button>

      {/* Cyber-Terminal Panel */}
      {isDevPanelOpen && (
        <div className="fixed bottom-16 right-4 z-50 w-[94vw] max-w-[440px] max-h-[85vh] overflow-y-auto rounded-2xl cyber-glass-panel p-4 text-slate-200 font-mono text-xs select-none flex flex-col gap-3.5 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-cyan-500/30">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="font-bold tracking-wider text-white text-sm holo-text-glow">
                ROBINHOOD L2 CONSOLE
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50 font-bold">
                CHAIN 4663
              </span>
            </div>
            <button
              onClick={() => setIsDevPanelOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800/50 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Robinhood L2 Network & Contract Configuration */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>ROBINHOOD L2 (ARBITRUM ORBIT)</span>
              </span>
              <a
                href={`${blockchainConfig.explorerUrl}/address/${contractAddress}`}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] text-emerald-400 hover:text-emerald-200 flex items-center gap-0.5 underline"
              >
                <span>EXPLORER</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Contract Address Input */}
            <form onSubmit={handleContractSubmit} className="space-y-1">
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>TRACKED CONTRACT / TOKEN ADDRESS:</span>
                {isContractSaved && <span className="text-emerald-400 font-bold flex items-center gap-0.5"><Check className="w-3 h-3" /> APPLIED</span>}
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={contractInput}
                  onChange={(e) => setContractInput(e.target.value)}
                  placeholder="0x... contract address"
                  className="flex-1 px-2.5 py-1.5 rounded-md bg-slate-900 border border-emerald-500/40 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-400 text-[10px] font-mono"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 font-semibold text-[10px] cursor-pointer"
                >
                  SET
                </button>
              </div>
            </form>

            {/* Live On-Chain Listener Controls */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isLiveListening ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
                <span className="text-slate-300 font-medium">
                  {isLiveListening ? 'LISTENING (1 TX = 1 HEARTBEAT)' : 'LISTENER PAUSED'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleSimulateSingleTx}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 text-[10px] font-semibold cursor-pointer"
                  title="Simulate 1 incoming token transaction"
                >
                  <Plus className="w-3 h-3" />
                  <span>+1 TX</span>
                </button>
                <button
                  onClick={toggleLiveListening}
                  className={`px-2 py-1 rounded text-[10px] font-semibold border cursor-pointer ${
                    isLiveListening
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  }`}
                >
                  {isLiveListening ? 'PAUSE' : 'RESUME'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Step Navigation: PREV & NEXT Milestone */}
          <div className="p-2.5 rounded-lg bg-slate-900/90 border border-cyan-400/30 flex items-center justify-between gap-2 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <button
              onClick={handlePrevMilestone}
              disabled={curMilestoneIndex === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                curMilestoneIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-950 text-slate-500 border border-slate-800'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 text-cyan-300 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </button>

            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                CURRENT MILESTONE
              </span>
              <span className="text-xs font-bold text-cyan-300 holo-text-glow">
                [{curMilestoneIndex + 1}/32] {HEARTBEAT_PRESETS[curMilestoneIndex]?.label}
              </span>
            </div>

            <button
              onClick={handleNextMilestone}
              disabled={curMilestoneIndex === HEARTBEAT_PRESETS.length - 1}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                curMilestoneIndex === HEARTBEAT_PRESETS.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-slate-950 text-slate-500 border border-slate-800'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 text-cyan-300 hover:scale-105'
              }`}
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Continuous Heartbeat Stream Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-cyan-500/20">
            <div>
              <div className="font-semibold text-slate-100 text-xs">Simulate Rapid Transaction Pulse</div>
              <div className="text-[10px] text-slate-400">Continuous biometric stream</div>
            </div>
            <button
              onClick={toggleAutoPulse}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-[11px] transition-all cursor-pointer ${
                isAutoPulse
                  ? 'bg-rose-500/25 border border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)] animate-pulse'
                  : 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-500/30'
              }`}
            >
              {isAutoPulse ? (
                <>
                  <Square className="w-3 h-3 fill-current" />
                  <span>HALT</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>PULSE</span>
                </>
              )}
            </button>
          </div>

          {/* Scrub Progress Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-300 font-medium">
              <span>SCRUB TIMELINE:</span>
              <span className="text-cyan-300 font-bold holo-text-glow">{currentSliderVal}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={currentSliderVal}
              onChange={handleSliderChange}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-300 font-medium">
              <span>FILTER MILESTONES (32 TOTAL):</span>
              <span className="text-cyan-400">{filteredPresets.length} shown</span>
            </div>
            <div className="flex flex-wrap gap-1 text-[9px]">
              {(['ALL', 'EGG', 'MITOSIS', 'MORPHO', 'MUSE', 'FINAL'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-1 rounded transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_8px_rgba(0,240,255,0.6)]'
                      : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* All 32 Heartbeat Presets Grid */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-2 gap-1.5 max-h-[190px] overflow-y-auto pr-1">
              {filteredPresets.map((preset) => {
                const isActive = heartbeats === preset.value;
                const idx = preset.milestoneIndex ?? 0;
                return (
                  <button
                    key={preset.label}
                    onClick={() => setPreset(preset)}
                    className={`px-2 py-1.5 rounded-md border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.4)] ring-1 ring-cyan-400/50'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold text-[11px] truncate">
                        <span className="text-[9px] text-cyan-500 mr-1">#{idx + 1}</span>
                        {preset.label}
                      </span>
                      <span className="text-[8px] text-cyan-400 font-mono ml-1 flex-shrink-0">
                        {preset.percentageLabel}
                      </span>
                    </div>
                    {preset.description && (
                      <span className="text-[9px] text-slate-400 truncate mt-0.5">
                        {preset.description}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manual Numerical Input */}
          <div className="space-y-1.5 border-t border-cyan-500/20 pt-2">
            <div className="text-[11px] text-slate-300 font-medium">
              MANUAL VALUE INPUT:
            </div>
            <form onSubmit={handleManualSubmit} className="flex gap-1.5">
              <input
                type="text"
                placeholder="e.g. 50,000,000,000"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                className="flex-1 px-2.5 py-1.5 rounded-md bg-slate-950 border border-cyan-500/30 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-md bg-cyan-500/25 hover:bg-cyan-500/35 border border-cyan-400 text-cyan-200 font-semibold text-xs cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              >
                APPLY
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
