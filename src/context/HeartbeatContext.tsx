'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { HeartbeatProgress, HeartbeatPreset, IHeartbeatDataSource, BlockchainConfig } from '@/types/organism';
import { TARGET_HEARTBEATS } from '@/lib/constants';
import { calculateHeartbeatProgress } from '@/lib/heartbeat-math';
import { getRobinhoodL2DataSource, DEFAULT_ROBINHOOD_CONTRACT } from '@/services/heartbeat-datasource';

interface HeartbeatContextValue {
  heartbeats: bigint;
  displayedHeartbeats: bigint;
  target: bigint;
  progress: HeartbeatProgress;
  displayedProgress: HeartbeatProgress;
  isSimulated: boolean;
  sourceName: string;
  blockchainConfig: BlockchainConfig;
  contractAddress: string;
  setContractAddress: (address: string) => void;
  isLiveListening: boolean;
  toggleLiveListening: () => void;
  isAutoPulse: boolean;
  isDevPanelOpen: boolean;
  setIsDevPanelOpen: (open: boolean) => void;
  setHeartbeats: (val: bigint) => void;
  setPreset: (preset: HeartbeatPreset) => void;
  toggleAutoPulse: () => void;
  isAudioEnabled: boolean;
  toggleAudio: () => void;
}

const HeartbeatContext = createContext<HeartbeatContextValue | null>(null);

export function HeartbeatProvider({ children }: { children: React.ReactNode }) {
  const [robinhoodSource] = useState(() => getRobinhoodL2DataSource(BigInt(0)));
  const [heartbeats, setInternalHeartbeats] = useState<bigint>(BigInt(0));
  const [displayedHeartbeats, setDisplayedHeartbeats] = useState<bigint>(BigInt(0));
  const [contractAddress, setContractAddressState] = useState<string>(DEFAULT_ROBINHOOD_CONTRACT);
  const [isLiveListening, setIsLiveListening] = useState<boolean>(true);
  const [isAutoPulse, setIsAutoPulse] = useState<boolean>(false);
  const [isDevPanelOpen, setIsDevPanelOpen] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const pulseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Subscribe to Robinhood L2 data source
  useEffect(() => {
    const unsubscribe = robinhoodSource.subscribe((val) => {
      setInternalHeartbeats(val);
    });

    // Start live on-chain polling on Robinhood Chain L2 by default
    robinhoodSource.startLiveListening(2000);
    setIsLiveListening(true);

    return () => {
      unsubscribe();
      robinhoodSource.stopLiveListening();
    };
  }, [robinhoodSource]);

  // Smooth numeric interpolation for counter display (spring-like lerp loop)
  useEffect(() => {
    let animId: number;
    const step = () => {
      setDisplayedHeartbeats((prev) => {
        if (prev === heartbeats) return prev;
        
        const diff = heartbeats - prev;
        const zero = BigInt(0);
        const absDiff = diff < zero ? -diff : diff;
        
        if (absDiff <= BigInt(5)) {
          return heartbeats;
        }
        
        const delta = diff / BigInt(7);
        const minStep = diff > zero ? BigInt(1) : BigInt(-1);
        const safeStep = delta === zero ? minStep : delta;
        
        return prev + safeStep;
      });
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [heartbeats]);

  const progress = useMemo(
    () => calculateHeartbeatProgress(heartbeats, TARGET_HEARTBEATS),
    [heartbeats]
  );

  const displayedProgress = useMemo(
    () => calculateHeartbeatProgress(displayedHeartbeats, TARGET_HEARTBEATS),
    [displayedHeartbeats]
  );

  const setHeartbeats = useCallback((val: bigint) => {
    robinhoodSource.setHeartbeats(val);
  }, [robinhoodSource]);

  const setContractAddress = useCallback((addr: string) => {
    setContractAddressState(addr);
    robinhoodSource.setContractAddress(addr);
  }, [robinhoodSource]);

  const setPreset = useCallback((preset: HeartbeatPreset) => {
    setHeartbeats(preset.value);
  }, [setHeartbeats]);

  const toggleLiveListening = useCallback(() => {
    if (robinhoodSource.isListening()) {
      robinhoodSource.stopLiveListening();
      setIsLiveListening(false);
    } else {
      robinhoodSource.startLiveListening(2000);
      setIsLiveListening(true);
    }
  }, [robinhoodSource]);

  const toggleAutoPulse = useCallback(() => {
    if (pulseTimerRef.current) {
      clearInterval(pulseTimerRef.current);
      pulseTimerRef.current = null;
      setIsAutoPulse(false);
    } else {
      setIsAutoPulse(true);
      pulseTimerRef.current = setInterval(() => {
        setInternalHeartbeats((prev) => {
          if (prev >= TARGET_HEARTBEATS) return prev;
          const next = prev + BigInt('250000000');
          const clamped = next > TARGET_HEARTBEATS ? TARGET_HEARTBEATS : next;
          robinhoodSource.setHeartbeats(clamped);
          return clamped;
        });
      }, 180);
    }
  }, [robinhoodSource]);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled((prev) => !prev);
  }, []);

  return (
    <HeartbeatContext.Provider
      value={{
        heartbeats,
        displayedHeartbeats,
        target: TARGET_HEARTBEATS,
        progress,
        displayedProgress,
        isSimulated: robinhoodSource.isSimulated,
        sourceName: robinhoodSource.sourceName,
        blockchainConfig: robinhoodSource.blockchainConfig,
        contractAddress,
        setContractAddress,
        isLiveListening,
        toggleLiveListening,
        isAutoPulse,
        isDevPanelOpen,
        setIsDevPanelOpen,
        setHeartbeats,
        setPreset,
        toggleAutoPulse,
        isAudioEnabled,
        toggleAudio,
      }}
    >
      {children}
    </HeartbeatContext.Provider>
  );
}

export function useHeartbeat(): HeartbeatContextValue {
  const ctx = useContext(HeartbeatContext);
  if (!ctx) {
    throw new Error('useHeartbeat must be used within a HeartbeatProvider');
  }
  return ctx;
}
