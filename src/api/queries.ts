import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { getUserBalance } from '../contracts/Market';
import { Bet, LedgerMap, Market, TokenSupplyMap } from '../interfaces';
import { getAllLedgers, getAllMarkets, getAllTokenSupply, getBidsByMarket } from './graphql';
import {
  normalizeGraphBets,
  normalizeGraphMarkets,
  normalizeLedgerMaps,
  normalizeSupplyMaps,
} from './utils';

export const useLedgerData = (): UseQueryResult<LedgerMap[]> => {
  return useQuery<LedgerMap[] | undefined, AxiosError, LedgerMap[]>('allLedgerData', async () => {
    const tokens = await getAllLedgers();
    return normalizeLedgerMaps(tokens);
  });
};

export const useTokenTotalSupply = (): UseQueryResult<TokenSupplyMap[]> => {
  return useQuery<TokenSupplyMap[] | undefined, AxiosError, TokenSupplyMap[]>(
    'allTokenSupplyData',
    async () => {
      const tokens = await getAllTokenSupply();
      return normalizeSupplyMaps(tokens);
    },
  );
};

export const useMarkets = (): UseQueryResult<Market[]> => {
  const { data: ledger } = useLedgerData();
  return useQuery<Market[] | undefined, AxiosError, Market[]>('allMarkets', async () => {
    const allMarkets = await getAllMarkets();
    if (ledger) {
      return normalizeGraphMarkets(allMarkets, ledger);
    }
  });
};

export const useMarketBets = (marketId: string): UseQueryResult<Bet[]> => {
  return useQuery<Bet[] | undefined, AxiosError, Bet[]>(['marketBet', marketId], async () => {
    const allBets = await getBidsByMarket(marketId);
    return normalizeGraphBets(allBets);
  });
};

export const useUserBalance = (userAddress: string | undefined): UseQueryResult<number> => {
  return useQuery<number, AxiosError, number>(['userBalance', userAddress], () => {
    return userAddress ? getUserBalance(userAddress) : 0;
  });
};
