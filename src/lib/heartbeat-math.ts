import { EVOLUTION_STAGES, TARGET_HEARTBEATS } from './constants';
import { EvolutionStageInfo, HeartbeatProgress } from '@/types/organism';

/**
 * Scale factor for BigInt division to maintain 9 decimals of precision
 * without JavaScript IEEE-754 double precision loss.
 */
const PRECISION_SCALE = BigInt('1000000000');

/**
 * Finds the corresponding evolution stage for a given BigInt heartbeat count.
 * Evaluates against the 32 granular curated milestones.
 */
export function getStageForHeartbeats(heartbeats: bigint): EvolutionStageInfo {
  const zeroBig = BigInt(0);
  const safeCurrent = heartbeats < zeroBig ? zeroBig : heartbeats;

  for (let i = EVOLUTION_STAGES.length - 1; i >= 0; i--) {
    if (safeCurrent >= EVOLUTION_STAGES[i].minHeartbeats) {
      return EVOLUTION_STAGES[i];
    }
  }
  return EVOLUTION_STAGES[0];
}

/**
 * Calculates accurate progress ratio (0.0 to 1.0), linear percentage (0.0 to 100.0),
 * and evolutionary synergy ratio (smoothly interpolated across the 32 milestones).
 */
export function calculateHeartbeatProgress(
  currentHeartbeats: bigint,
  target: bigint = TARGET_HEARTBEATS
): HeartbeatProgress {
  const zeroBig = BigInt(0);
  const safeCurrent = currentHeartbeats < zeroBig ? zeroBig : currentHeartbeats;
  const clampedCurrent = safeCurrent > target ? target : safeCurrent;

  // Scale by 10^9 before dividing to preserve ultra-fine sub-decimal precision
  const scaledNumerator = clampedCurrent * PRECISION_SCALE;
  const scaledQuotient = scaledNumerator / target;
  
  const ratio = Number(scaledQuotient) / Number(PRECISION_SCALE);
  const percentage = ratio * 100;
  const isFullEvolution = clampedCurrent >= target;

  const stage = getStageForHeartbeats(clampedCurrent);
  const totalMilestones = EVOLUTION_STAGES.length; // 32 milestones
  const curIdx = stage.milestoneIndex;

  // Calculate smooth life energy synergy progress across the 32 milestones
  let synergyRatio: number;
  if (clampedCurrent >= target) {
    synergyRatio = 1.0;
  } else if (curIdx < totalMilestones - 1) {
    const lowVal = EVOLUTION_STAGES[curIdx].minHeartbeats;
    const nextVal = EVOLUTION_STAGES[curIdx + 1].minHeartbeats;
    const span = nextVal - lowVal;
    let fraction = 0;
    if (span > BigInt(0)) {
      const offset = clampedCurrent - lowVal;
      fraction = Number((offset * PRECISION_SCALE) / span) / Number(PRECISION_SCALE);
    }
    synergyRatio = (curIdx + Math.max(0, Math.min(1, fraction))) / (totalMilestones - 1);
  } else {
    synergyRatio = 1.0;
  }

  const synergyPercentage = Math.min(100, Math.max(0, synergyRatio * 100));

  return {
    current: safeCurrent,
    target,
    ratio,
    percentage,
    synergyRatio,
    synergyPercentage,
    milestoneIndex: curIdx,
    totalMilestones,
    stage,
    isFullEvolution,
  };
}

/**
 * For backwards compatibility with percentage inputs.
 */
export function getStageForPercentage(percentage: number): EvolutionStageInfo {
  for (let i = EVOLUTION_STAGES.length - 1; i >= 0; i--) {
    if (percentage >= EVOLUTION_STAGES[i].minPercentage - 0.0001) {
      return EVOLUTION_STAGES[i];
    }
  }
  return EVOLUTION_STAGES[0];
}

/**
 * Formats a BigInt or number into locale string with commas (e.g. 66,666,666,666).
 */
export function formatHeartbeats(value: bigint | number): string {
  const bigVal = typeof value === 'bigint' ? value : BigInt(Math.round(value));
  return bigVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Safely parses a string input into BigInt, defaulting to 0 on invalid input.
 */
export function safeParseBigInt(input: string): bigint {
  try {
    const sanitized = input.replace(/[^0-9]/g, '');
    if (!sanitized) return BigInt(0);
    return BigInt(sanitized);
  } catch {
    return BigInt(0);
  }
}

/**
 * Linear interpolation between two numbers.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}
