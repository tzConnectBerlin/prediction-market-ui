import { OneTimeActions } from '../interfaces';
import { MARKET_ADDRESS } from './globals';

export const setUserActionComplete = (
  userAddress: string,
  marketId: string,
  action: OneTimeActions,
): void => {
  localStorage.setItem(`${MARKET_ADDRESS}:${marketId}:${userAddress}:${action}`, 'true');
};

export const isActionComplete = (
  userAddress: string,
  marketId: string,
  action: OneTimeActions,
): boolean => {
  return localStorage.getItem(`${MARKET_ADDRESS}:${marketId}:${userAddress}:${action}`) === 'true';
};
