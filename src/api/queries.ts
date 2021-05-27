import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
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
