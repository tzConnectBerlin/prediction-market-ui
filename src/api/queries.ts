import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { getUserBalance } from '../contracts/Market';
import { Bet, Market, AllTokens } from '../interfaces';
import { getAllMarkets, getAllTokenSupply, getBidsByMarket } from './graphql';
import { normalizeGraphBets, normalizeGraphMarkets } from './utils';

export const useTokenTotalSupply = (): UseQueryResult<AllTokens> => {
  return useQuery<AllTokens | undefined, AxiosError, AllTokens>('allTokenSupplyData', () => {
    return getAllTokenSupply();
  });
};

export const useMarkets = (): UseQueryResult<Market[]> => {
  return useQuery<Market[] | undefined, AxiosError, Market[]>('allMarkets', async () => {
    const allMarkets = await getAllMarkets();
    if (allMarkets) {
      const supplyMaps = await getAllTokenSupply();
      return normalizeGraphMarkets(allMarkets, supplyMaps);
    }
  });
};

export const useMarketBets = (marketId: string): UseQueryResult<Bet[]> => {
  return useQuery<Bet[] | undefined, AxiosError, Bet[]>(['marketBet', marketId], async () => {
    const allBets = await getBidsByMarket(marketId);
    if (allBets) {
      return normalizeGraphBets(allBets);
    }
  });
};

export const useUserBalance = (userAddress: string | undefined): UseQueryResult<number> => {
  return useQuery<number, AxiosError, number>(['userBalance', userAddress], () => {
    return userAddress ? getUserBalance(userAddress) : 0;
  });
};
