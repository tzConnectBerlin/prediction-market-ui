import BigNumber from 'bignumber.js';
import { ClosePositionReturn, ClosePositionBothReturn } from '../interfaces';

const MARKET_FEE = 0.0003;
const ONE_MINUS_FEE = new BigNumber(1).minus(MARKET_FEE);

export const calcSwapOutput = (
  aPool: BigNumber,
  bPool: BigNumber,
  aToSwap: BigNumber,
): BigNumber => {
  const num = aToSwap.multipliedBy(ONE_MINUS_FEE).multipliedBy(bPool);
  const denom = aPool.plus(aToSwap.multipliedBy(ONE_MINUS_FEE));
  return num.dividedBy(denom);
};

export const fixedInSwap = (aPool: BigNumber, bPool: BigNumber, fixedAIn: BigNumber): BigNumber => {
  const k = aPool.multipliedBy(bPool);
  return k.dividedBy(aPool.plus(ONE_MINUS_FEE).multipliedBy(fixedAIn).minus(bPool)).negated();
};

export const optimalSwap = (
  aPool: BigNumber,
  bPool: BigNumber,
  aHoldings: BigNumber,
): BigNumber => {
  const b = aPool
    .plus(bPool)
    .multipliedBy(ONE_MINUS_FEE)
    .minus(aHoldings)
    .multipliedBy(ONE_MINUS_FEE);
  const c = aPool.multipliedBy(aHoldings).negated();
  return b
    .negated()
    .plus(b.pow(2).minus(new BigNumber(4).multipliedBy(ONE_MINUS_FEE).multipliedBy(c)).sqrt())
    .dividedBy(ONE_MINUS_FEE.multipliedBy(2));
};

export const optimalSwapBoth = (
  aPool: BigNumber,
  bPool: BigNumber,
  aHoldings: BigNumber,
  bHoldings: BigNumber,
): BigNumber => {
  const b = aPool
    .plus(bPool)
    .multipliedBy(ONE_MINUS_FEE)
    .minus(aHoldings)
    .multipliedBy(ONE_MINUS_FEE)
    .plus(bHoldings)
    .multipliedBy(ONE_MINUS_FEE);
  const c = aPool.multipliedBy(bHoldings.minus(aHoldings));
  return b
    .negated()
    .plus(b.pow(2).minus(new BigNumber(4).multipliedBy(ONE_MINUS_FEE).multipliedBy(c)).sqrt())
    .dividedBy(ONE_MINUS_FEE.multipliedBy(2));
};

export const closePosition = (
  aPool: BigNumber,
  bPool: BigNumber,
  aHoldings: BigNumber,
): ClosePositionReturn => {
  const aToSwap = optimalSwap(aPool, bPool, aHoldings);
  const aLeft = aHoldings.minus(aToSwap);
  const bReceived = fixedInSwap(aPool, bPool, aToSwap);
  return {
    bReceived,
    aLeft,
    aToSwap,
  };
};

export const closePositionBoth = (
  aPool: BigNumber,
  bPool: BigNumber,
  aHoldings: BigNumber,
  bHoldings: BigNumber,
): ClosePositionBothReturn => {
  const aToSwap = optimalSwapBoth(aPool, bPool, aHoldings, bHoldings);
  const aLeft = aHoldings.minus(aToSwap);
  const bReceived = fixedInSwap(aPool, bPool, aToSwap);
  const bHeld = bHoldings.plus(bReceived);
  return { aToSwap, aLeft, bHeld };
};
