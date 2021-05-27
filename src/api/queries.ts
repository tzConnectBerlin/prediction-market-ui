import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { getUserBalance } from '../contracts/Market';
import { Bet, Market } from '../interfaces';
import { getAllMarkets, getBidsByMarket } from './graphql';

export const useMarkets = (): UseQueryResult<Market[]> => {
  return useQuery<Market[], AxiosError, Market[]>('allMarkets', () => {
    return getAllMarkets();
  });
};

export const useMarketBets = (marketId: string): UseQueryResult<Bet[]> => {
  return useQuery<Bet[], AxiosError, Bet[]>(['marketBet', marketId], () => {
    return getBidsByMarket(marketId);
  });
};

export const useUserBalance = (userAddress: string | undefined): UseQueryResult<number> => {
  return useQuery<number, AxiosError, number>(['userBalance', userAddress], () => {
    return userAddress ? getUserBalance(userAddress) : 0;
  });
};
