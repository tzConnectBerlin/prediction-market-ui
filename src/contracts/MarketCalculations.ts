import { ClosePositionReturn, ClosePositionBothReturn } from '../interfaces';

const MARKET_FEE = 0.0003;
const ONE_MINUS_FEE = 1 - MARKET_FEE;

export const calcSwapOutput = (aPool: number, bPool: number, aToSwap: number): number => {
  const num = aToSwap * ONE_MINUS_FEE * bPool;
  const denom = aPool + aToSwap * ONE_MINUS_FEE;
  return num / denom;
};

export const fixedInSwap = (aPool: number, bPool: number, fixedAIn: number): number => {
  const k = aPool * bPool;
  return (k / (aPool + ONE_MINUS_FEE * fixedAIn) - bPool) * -1.0;
};

export const optimalSwap = (aPool: number, bPool: number, aHoldings: number): number => {
  const b = aPool + bPool * ONE_MINUS_FEE - aHoldings * ONE_MINUS_FEE;
  const c = -1.0 * aPool * aHoldings;
  return (-b + Math.sqrt(b ** 2.0 - 4.0 * ONE_MINUS_FEE * c)) / (2.0 * ONE_MINUS_FEE);
};

export const optimalSwapBoth = (
  aPool: number,
  bPool: number,
  aHoldings: number,
  bHoldings: number,
): number => {
  const b = aPool + bPool * ONE_MINUS_FEE - aHoldings * ONE_MINUS_FEE + bHoldings * ONE_MINUS_FEE;
  const c = aPool * (bHoldings - aHoldings);
  return (-b + Math.sqrt(b ** 2.0 - 4.0 * ONE_MINUS_FEE * c)) / (2.0 * ONE_MINUS_FEE);
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
  const bHeld = bHoldings - bReceived;
  return { aToSwap, aLeft, bHeld };
};
