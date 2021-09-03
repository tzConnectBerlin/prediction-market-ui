import {
  ClosePositionReturn,
  ClosePositionBothReturn,
  TokenType,
  BuyPosition,
} from '../interfaces';
import { tokenMultiplyUp, roundToTwo } from '../utils/math';

const MARKET_FEE = 0.003;
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
  slippage: number,
): ClosePositionReturn => {
  const aToSwap = optimalSwap(aPool, bPool, aHoldings);
  const aToSwapWithSlippage = aToSwap + (aToSwap * slippage) / 100;
  const aLeft = aHoldings - aToSwapWithSlippage;
  const bReceived = fixedInSwap(aPool, bPool, aToSwapWithSlippage);
  return {
    bReceived,
    aLeft,
    aToSwap,
    aToSwapWithSlippage,
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

export const buyTokenCalculation = (
  token: TokenType,
  quantity: number,
  yesPool: number,
  noPool: number,
  yesPrice: number,
  noPrice: number,
  slippage: number,
): BuyPosition => {
  const value = tokenMultiplyUp(Number(quantity));
  const initialToken = TokenType.yes === token ? value * yesPrice : value * noPrice;
  const [aPool, bPool] = TokenType.yes === token ? [noPool, yesPool] : [yesPool, noPool];
  const calculatedSwap = calcSwapOutput(aPool, bPool, initialToken);
  const maxSwap = calculatedSwap - (calculatedSwap * slippage) / 100;
  const [newAPool, newBPool] =
    token === TokenType.yes
      ? [yesPool - calculatedSwap, noPool + initialToken]
      : [noPool - calculatedSwap, yesPool + initialToken];
  const newPrice = roundToTwo(newBPool / (newAPool + newBPool));
  return {
    quantity: value,
    swap: maxSwap,
    price: newPrice,
  };
};

export const tokensToCurrency = (token: number): number => token * 0.95;

export const calculatePoolShare = (userPoolTokens: number, totalPoolTokens: number): number =>
  userPoolTokens / totalPoolTokens;

export const tokensMovedToPool = (tokens: number, poolShare: number): number => {
  return tokens * poolShare;
};

export const minLiquidityTokensRequired = (
  aTokens: number,
  aPoolTokens: number,
  totalLiquidityTokens: number,
): number => {
  return (aTokens * totalLiquidityTokens) / aPoolTokens;
};

export const liquidityToTokens = (
  aPool: number,
  lqtTokensMoved: number,
  totalLqt: number,
): number => aPool * (lqtTokensMoved / totalLqt);
