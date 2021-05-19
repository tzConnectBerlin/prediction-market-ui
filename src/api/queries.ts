/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import { MarketCardData, QuestionEntryMDWMap, QuestionMetaData } from '../interfaces';
import { MARKET_ADDRESS } from '../utils/globals';
import { getIPFSDataByKeys } from './market';
import { getAllMarketCard } from './graphql';

export const useIPFSData = (marketData?: QuestionEntryMDWMap, marketAddress = MARKET_ADDRESS) => {
  return useQuery<QuestionMetaData[] | undefined, AxiosError, QuestionMetaData[] | undefined>(
    ['contractMetaData', marketAddress],
    () => {
      return marketData && getIPFSDataByKeys(Object.keys(marketData));
    },
    {
      enabled: !!marketData,
      refetchInterval: 10000,
      staleTime: 3000,
    },
  );
};

export const useMarketCards = () => {
  return useQuery<MarketCardData[], AxiosError, MarketCardData[]>('marketCards', () => {
    return getAllMarketCard();
  });
};
