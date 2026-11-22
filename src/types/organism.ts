/**
 * Digital Organism - Type Definitions
 * Evolution pathway across 32 Granular Curated Milestones:
 * 0, 1, 10, 100, 1K, 10K, 100K, 1M, 10M, 50M, 100M, 500M, 1B, 2.5B, 5B, 7.5B,
 * 10B, 15B, 20B, 25B, 30B, 35B, 40B, 45B, 50B, 55B, 60B, 62.5B, 65B, 66B, 66.666B, 66.666...B
 */

export type MorphologyForm =
  | 'PRIMORDIAL_EGG'
  | 'CELLULAR_MITOSIS'
  | 'MORPHOGENESIS'
  | 'EMERGING_MUSE'
  | 'FULL_DIGIMUSE';

export interface EvolutionStageInfo {
  id: string;
  milestoneIndex: number; // 0 to 31
  name: string;
  minHeartbeats: bigint;
  minPercentage: number;
  description: string;
  morphologyForm: MorphologyForm;
  glitchIntensity: number; // 0.0 to 1.0
  blurAmountPx: number;    // blur in pixels
  chromaticShiftPx: number;// chromatic offset
  sliceGlitchRate: number; // frequency of slice glitch
  clarity: number;         // 0.0 to 1.0
  themeColor: string;
}

export interface HeartbeatProgress {
  current: bigint;
  target: bigint;
  ratio: number;             // 0.0 to 1.0 (linear current / target)
  percentage: number;        // 0.0 to 100.0 (linear percentage)
  synergyRatio: number;      // 0.0 to 1.0 (interpolated across the 32 milestone steps)
  synergyPercentage: number; // 0.0 to 100.0 (life energy progress bar)
  milestoneIndex: number;    // active milestone index (0 to 31)
  totalMilestones: number;   // 32
  stage: EvolutionStageInfo;
  isFullEvolution: boolean;
}

export interface HeartbeatPreset {
  label: string;
  value: bigint;
  percentageLabel: string;
  description?: string;
  milestoneIndex?: number;
}

export interface BlockchainConfig {
  networkName: string;
  chainId: number;
  contractAddress: string;
  rpcUrl: string;
  explorerUrl: string;
  currencySymbol: string;
}

/**
 * Data source abstraction interface.
 * Decoupled from blockchain / mock specifics.
 */
export interface IHeartbeatDataSource {
  readonly isSimulated: boolean;
  readonly sourceName: string;
  readonly blockchainConfig?: BlockchainConfig;
  getHeartbeats(): bigint;
  getTarget(): bigint;
  setHeartbeats?(value: bigint): void;
  setContractAddress?(address: string): void;
  subscribe(callback: (heartbeats: bigint) => void): () => void;
  destroy?(): void;
}
