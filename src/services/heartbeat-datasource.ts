import { TARGET_HEARTBEATS } from '@/lib/constants';
import { IHeartbeatDataSource, BlockchainConfig } from '@/types/organism';

type Listener = (heartbeats: bigint) => void;

export const DEFAULT_ROBINHOOD_CONTRACT = '0x8888b15d2338b7e28945671191cb3427c1f7';

/**
 * Robinhood Chain L2 Data Source Implementation
 * Network: Robinhood Chain (Arbitrum Orbit settling to Ethereum)
 * Chain ID: 4663
 * Default RPC: https://rpc.mainnet.chain.robinhood.com
 * Block Explorer: https://robinhoodchain.blockscout.com
 */
export class RobinhoodL2HeartbeatDataSource implements IHeartbeatDataSource {
  public readonly isSimulated = false;
  public readonly sourceName = 'ROBINHOOD_L2_MAINNET [CHAIN 4663]';

  public readonly blockchainConfig: BlockchainConfig = {
    networkName: 'Robinhood Chain L2 (Arbitrum Orbit)',
    chainId: 4663,
    contractAddress: DEFAULT_ROBINHOOD_CONTRACT,
    rpcUrl: 'https://rpc.mainnet.chain.robinhood.com',
    explorerUrl: 'https://robinhoodchain.blockscout.com',
    currencySymbol: 'ETH',
  };

  private currentHeartbeats: bigint = BigInt(0);
  private targetHeartbeats: bigint = TARGET_HEARTBEATS;
  private listeners: Set<Listener> = new Set();
  private pollTimer: NodeJS.Timeout | null = null;
  private isListeningActive = false;
  private lastPolledBlock = 0;

  constructor(initialHeartbeats: bigint = BigInt(0)) {
    this.currentHeartbeats = initialHeartbeats;
  }

  public getHeartbeats(): bigint {
    return this.currentHeartbeats;
  }

  public getTarget(): bigint {
    return this.targetHeartbeats;
  }

  public setContractAddress(address: string): void {
    if (address && address.trim().startsWith('0x')) {
      this.blockchainConfig.contractAddress = address.trim();
    }
  }

  public setHeartbeats(value: bigint): void {
    const zero = BigInt(0);
    const clamped = value < zero ? zero : value > this.targetHeartbeats ? this.targetHeartbeats : value;
    this.currentHeartbeats = clamped;
    this.notify();
  }

  public subscribe(callback: Listener): () => void {
    this.listeners.add(callback);
    callback(this.currentHeartbeats);
    return () => {
      this.listeners.delete(callback);
    };
  }

  /**
   * Starts live on-chain polling for Robinhood Chain L2 transactions
   */
  public startLiveListening(intervalMs: number = 2500): void {
    this.stopLiveListening();
    this.isListeningActive = true;

    const poll = async () => {
      if (!this.isListeningActive) return;
      try {
        const res = await fetch('/api/robinhood-l2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'query',
            contractAddress: this.blockchainConfig.contractAddress,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data?.success && data?.blockNumber) {
            if (this.lastPolledBlock > 0 && data.blockNumber > this.lastPolledBlock) {
              const newBlocks = BigInt(data.blockNumber - this.lastPolledBlock);
              // Each incoming block generates transactions = +1 to +N heartbeats
              const newHeartbeats = this.currentHeartbeats + (newBlocks > BigInt(10) ? BigInt(1) : newBlocks);
              this.setHeartbeats(newHeartbeats > this.targetHeartbeats ? this.targetHeartbeats : newHeartbeats);
            }
            this.lastPolledBlock = data.blockNumber;
          }
        }
      } catch {
        // Fallback or retry silently
      }

      if (this.isListeningActive) {
        this.pollTimer = setTimeout(poll, intervalMs);
      }
    };

    poll();
  }

  public stopLiveListening(): void {
    this.isListeningActive = false;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
  }

  public isListening(): boolean {
    return this.isListeningActive;
  }

  public destroy(): void {
    this.stopLiveListening();
    this.listeners.clear();
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.currentHeartbeats);
    }
  }
}

/**
 * Mock Simulation Data Source
 */
export class MockHeartbeatDataSource implements IHeartbeatDataSource {
  public readonly isSimulated = true;
  public readonly sourceName = 'SIMULATED_MOCK_HARNESS';

  private currentHeartbeats: bigint = BigInt(0);
  private targetHeartbeats: bigint = TARGET_HEARTBEATS;
  private listeners: Set<Listener> = new Set();
  private autoPulseTimer: NodeJS.Timeout | null = null;
  private pulseIncrement: bigint = BigInt('50000000');

  constructor(initialHeartbeats: bigint = BigInt(0)) {
    this.currentHeartbeats = initialHeartbeats;
  }

  public getHeartbeats(): bigint {
    return this.currentHeartbeats;
  }

  public getTarget(): bigint {
    return this.targetHeartbeats;
  }

  public setHeartbeats(value: bigint): void {
    const zero = BigInt(0);
    const clamped = value < zero ? zero : value > this.targetHeartbeats ? this.targetHeartbeats : value;
    this.currentHeartbeats = clamped;
    this.notify();
  }

  public subscribe(callback: Listener): () => void {
    this.listeners.add(callback);
    callback(this.currentHeartbeats);
    return () => {
      this.listeners.delete(callback);
    };
  }

  public startAutoPulse(intervalMs: number = 200, step: bigint = BigInt('250000000')): void {
    this.stopAutoPulse();
    this.pulseIncrement = step;
    this.autoPulseTimer = setInterval(() => {
      if (this.currentHeartbeats >= this.targetHeartbeats) {
        this.stopAutoPulse();
        return;
      }
      const next = this.currentHeartbeats + this.pulseIncrement;
      this.setHeartbeats(next > this.targetHeartbeats ? this.targetHeartbeats : next);
    }, intervalMs);
  }

  public stopAutoPulse(): void {
    if (this.autoPulseTimer) {
      clearInterval(this.autoPulseTimer);
      this.autoPulseTimer = null;
    }
  }

  public isAutoPulsing(): boolean {
    return this.autoPulseTimer !== null;
  }

  public destroy(): void {
    this.stopAutoPulse();
    this.listeners.clear();
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.currentHeartbeats);
    }
  }
}

// Singleton instances
let globalRobinhoodSource: RobinhoodL2HeartbeatDataSource | null = null;
let globalMockSource: MockHeartbeatDataSource | null = null;

export function getRobinhoodL2DataSource(initialValue: bigint = BigInt(0)): RobinhoodL2HeartbeatDataSource {
  if (!globalRobinhoodSource) {
    globalRobinhoodSource = new RobinhoodL2HeartbeatDataSource(initialValue);
  }
  return globalRobinhoodSource;
}

export function getMockDataSource(initialValue: bigint = BigInt(0)): MockHeartbeatDataSource {
  if (!globalMockSource) {
    globalMockSource = new MockHeartbeatDataSource(initialValue);
  }
  return globalMockSource;
}

export function getActiveHeartbeatDataSource(initialValue: bigint = BigInt(0)): IHeartbeatDataSource {
  return getRobinhoodL2DataSource(initialValue);
}
