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

/**
 * How many LQT is equal to yes/no tokens
 * @param aPool total amount of token a in the pool
 * @param lqtTokensMoved amount of liquidity tokens (LQT) to convert
 * @param totalLqt total liquidity tokens
 * @returns
 */
export const liquidityToTokens = (
  aPool: number,
  lqtTokensMoved: number,
  totalLqt: number,
): number => aPool * (lqtTokensMoved / totalLqt);

/**
 * Calculate Swap token A to B
 * @param quantity of tokens to swap
 * @param aPool amount of token a in the pool For example: yes/no tokens in the pool
 * @param bPool amount of token b in the pool
 * @param slippage slippage number in the setting
 * @returns swapOutput, exchangeRate and swapSlippage
 */
export const swapTokenCalculations = (
  quantity: number,
  aPool: number,
  bPool: number,
  slippage: number,
) => {
  const swapOutput = optimalSwap(aPool, bPool, quantity);
  const exchangeRate = swapOutput / quantity;
  const swapSlippage = swapOutput - swapOutput * (slippage / 100);

  return { swapOutput, exchangeRate, swapSlippage };
};

/**
 * How many are there yes/no tokens after swap?
 * @param yesTokens user yesTokens
 * @param newYes new yesToken
 * @param noTokens user noTokens
 * @param newNo new noTokens
 * @param aToSwap token type that is swaped
 * @returns totalYes and totalNo based on swapedToken
 */
export const tokenAmountAfterSwap = (
  yesTokens: number,
  newYes: number,
  noTokens: number,
  newNo: number,
  aToSwap: TokenType,
) => {
  if (aToSwap === TokenType.yes) {
    return {
      totalYes: yesTokens - newYes,
      totalNo: noTokens + newNo,
    };
  }
  return {
    totalYes: yesTokens + newYes,
    totalNo: noTokens - newNo,
  };
};

/**
 * How much tokens user has (PMM)?
 * @param aTokens user aToken amount
 * @param aPrice
 * @param bTokens user bToken amount
 * @param bPrice
 * @returns value as PMM
 */
export const totalTokensValue = (
  aTokens: number,
  aPrice: number,
  bTokens: number,
  bPrice: number,
) => {
  return aTokens * aPrice + bTokens * bPrice;
};

/**
 * @param aTokens token amount in the pool
 * @param totalValue total tokens in the pool
 * @returns price value for aTokens
 */
export const priceValueCalculation = (aTokens: number, totalValue: number) => {
  if (totalValue === 0) return 0;
  return aTokens / totalValue;
};

export const add = (a: number, b: number): number => a + b;
