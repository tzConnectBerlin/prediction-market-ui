import { ClosePositionReturn, ClosePositionBothReturn } from '../interfaces';

const MARKET_FEE = 0.0003;

export const fixedInSwap = (aPool: number, bPool: number, fixedAIn: number): number => {
  const k = aPool * bPool;
  return (k / (aPool + (1 - MARKET_FEE) * fixedAIn) - bPool) * -1;
};

export const optimalSwap = (aPool: number, bPool: number, aHoldings: number): number => {
  const a = 1 - MARKET_FEE;
  const b = aPool + bPool * (1 - MARKET_FEE) - aHoldings * (1 - MARKET_FEE);
  const c = -1 * aPool * aHoldings;
  const deltaA = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  return deltaA;
};

export const optimalSwapBoth = (
  aPool: number,
  bPool: number,
  aHoldings: number,
  bHoldings: number,
): number => {
  const a = 1 - MARKET_FEE;
  const b =
    aPool + bPool * (1 - MARKET_FEE) - aHoldings * (1 - MARKET_FEE) + bHoldings * (1 - MARKET_FEE);
  const c = aPool * (bHoldings - aHoldings);
  const deltaA = (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  return deltaA;
};

export const closePosition = (
  aPool: number,
  bPool: number,
  aHoldings: number,
): ClosePositionReturn => {
  const aToSwap = optimalSwap(aPool, bPool, aHoldings);
  const aLeft = aHoldings - aToSwap;
  const bReceived = fixedInSwap(aPool, bPool, aToSwap);
  return {
    bReceived,
    aLeft,
    aToSwap,
  };
};

export const closePositionBoth = (
  aPool: number,
  bPool: number,
  aHoldings: number,
  bHoldings: number,
): ClosePositionBothReturn => {
  const aToSwap = optimalSwapBoth(aPool, bPool, aHoldings, bHoldings);
  const aLeft = aHoldings - aToSwap;
  const bReceived = fixedInSwap(aPool, bPool, aToSwap);
  const bHeld = bHoldings + bReceived;
  return { aToSwap, aLeft, bHeld };
};
