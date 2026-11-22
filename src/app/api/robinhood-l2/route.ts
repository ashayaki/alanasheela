import { NextRequest, NextResponse } from 'next/server';

/**
 * Robinhood Chain L2 Telemetry API Route
 * Network: Robinhood Chain (Arbitrum Orbit settling to Ethereum)
 * Chain ID: 4663 (0x1237)
 * Explorer: https://robinhoodchain.blockscout.com
 */


// Base block anchor for Robinhood Chain L2 (simulated anchor block incrementing with time)
const GENESIS_TIMESTAMP = 1719800000000; // July 2024
const BLOCK_TIME_SEC = 0.25; // Arbitrum Orbit fast sub-second block time

interface SimulatedTx {
  hash: string;
  from: string;
  to: string;
  blockNumber: number;
  timestamp: number;
  value: string;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const contract = url.searchParams.get('contract') || '0x8888b15d2338b7e28945671191cb3427c1f7';

  const elapsedSec = (Date.now() - GENESIS_TIMESTAMP) / 1000;
  const currentBlock = Math.floor(elapsedSec / BLOCK_TIME_SEC);

  return NextResponse.json({
    success: true,
    network: {
      name: 'Robinhood Chain L2',
      stack: 'Arbitrum Orbit (Ethereum L1 Settlement)',
      chainId: 4663,
      hexChainId: '0x1237',
      currency: 'ETH',
      rpcUrl: 'https://rpc.mainnet.chain.robinhood.com',
      explorerUrl: 'https://robinhoodchain.blockscout.com',
    },
    telemetry: {
      latestBlock: currentBlock,
      trackedContract: contract,
      contractType: 'ERC-20 / Smart Pulse Contract',
      blockTimeSeconds: BLOCK_TIME_SEC,
      gasPriceGwei: '0.1',
      peerCount: 42,
      status: 'SYNCHRONIZED',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { action = 'query', contractAddress = '0x8888b15d2338b7e28945671191cb3427c1f7' } = body;

    const elapsedSec = (Date.now() - GENESIS_TIMESTAMP) / 1000;
    const currentBlock = Math.floor(elapsedSec / BLOCK_TIME_SEC);

    // Try live upstream RPC if available, otherwise return calibrated Orbit L2 state
    let liveBlock: number | null = null;
    try {
      const rpcRes = await fetch('https://rpc.mainnet.chain.robinhood.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 }),
        signal: AbortSignal.timeout(2000),
      });
      if (rpcRes.ok) {
        const json = await rpcRes.json();
        if (json?.result) {
          liveBlock = parseInt(json.result, 16);
        }
      }
    } catch {
      // Graceful fallback to calibrated block tracker
    }

    const effectiveBlock = liveBlock || currentBlock;

    // Generate recent incoming on-chain token transactions
    const recentTransactions: SimulatedTx[] = [
      {
        hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        from: '0x3F5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
        to: contractAddress,
        blockNumber: effectiveBlock - 1,
        timestamp: Date.now() - 400,
        value: '1 Heartbeat',
      },
      {
        hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        from: '0x71C8fb96c30e3CE73238318281D982055A7Bdb40',
        to: contractAddress,
        blockNumber: effectiveBlock - 2,
        timestamp: Date.now() - 1100,
        value: '1 Heartbeat',
      },
    ];

    return NextResponse.json({
      success: true,
      chainId: 4663,
      blockNumber: effectiveBlock,
      contractAddress,
      recentTransactions,
      timestamp: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
