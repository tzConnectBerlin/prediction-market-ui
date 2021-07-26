import { AxiosError } from 'axios';
import * as R from 'ramda';
import { useQuery, UseQueryResult } from 'react-query';
import { getUserBalance } from '../contracts/Market';
import {
  AllMarketsLedgers,
  AuctionMarkets,
  Bet,
  LedgerMap,
  Market,
  Token,
  TokenSupplyMap,
} from '../interfaces';
import { tokenDivideDown } from '../utils/math';
import {
  getAllLedgers,
  getAllMarkets,
  getAllTokenSupply,
  getBetsByAddress,
  getBidsByMarket,
  getTokenLedger,
} from './graphql';
import {
  normalizeAuctionData,
  normalizeGraphBets,
  normalizeGraphBetSingleOriginator,
  normalizeGraphMarkets,
  normalizeLedgerMaps,
  normalizeSupplyMaps,
} from './utils';

export const useLedgerData = (): UseQueryResult<LedgerMap[]> => {
  return useQuery<LedgerMap[] | undefined, AxiosError, LedgerMap[]>('allLedgerData', async () => {
    const tokens = await getAllLedgers();
    return normalizeLedgerMaps(tokens.ledgers.ledgerMaps);
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

export const useTokenByAddress = (
  tokenList: number[],
  address?: string,
): UseQueryResult<Token[]> => {
  return useQuery<Token[] | undefined, AxiosError, Token[]>(
    ['tokenByAddress', address, tokenList],
    async () => {
      if (address) {
        const tokens = await getTokenLedger(tokenList, tokenList.length, address);
        return R.sortBy(R.prop('tokenId'), tokens.tokenQuantity.token);
      }
    },
    { enabled: !!address },
  );
};

const useAllMarkets = (): UseQueryResult<AllMarketsLedgers> => {
  return useQuery<AllMarketsLedgers | undefined, AxiosError, AllMarketsLedgers>(
    'allMarketsLedgers',
    async () => {
      return getAllMarkets();
    },
  );
};

export const useMarkets = (): UseQueryResult<Market[]> => {
  const { data } = useAllMarkets();
  return useQuery<Market[] | undefined, AxiosError, Market[]>(
    'allMarkets',
    async () => {
      if (data) {
        const ledger = normalizeLedgerMaps(data.ledgers.ledgerMaps);
        return normalizeGraphMarkets(data.markets.marketNodes, ledger);
      }
    },
    {
      enabled: Boolean(data),
    },
  );
};

export const useMarketBets = (marketId: string): UseQueryResult<Bet[]> => {
  return useQuery<Bet[] | undefined, AxiosError, Bet[]>(['marketBet', marketId], async () => {
    const allBets = await getBidsByMarket(marketId);
    return normalizeGraphBets(allBets);
  });
};

export const useChartData = (state = 'auctionRunning'): UseQueryResult<AuctionMarkets> => {
  const { data } = useAllMarkets();
  return useQuery<AuctionMarkets | undefined, AxiosError, AuctionMarkets>(
    'allAuctionMarkets',
    async () => {
      if (data) {
        const ledger = normalizeLedgerMaps(data.ledgers.ledgerMaps);
        return normalizeAuctionData(data.markets.marketNodes, state, ledger);
      }
    },
    {
      enabled: Boolean(data),
    },
  );
};

export const useAllMarketByAddress = (userAddress?: string): UseQueryResult<Bet[]> => {
  return useQuery<Bet[] | undefined, AxiosError, Bet[]>(
    ['allMarketBetByAddress', userAddress],
    async () => {
      const allBets = await getBidsByMarket(undefined, userAddress);
      return normalizeGraphBets(allBets);
    },
  );
};

export const useAllBetsByAddress = (userAddress?: string): UseQueryResult<Bet[]> => {
  return useQuery<Bet[] | undefined, AxiosError, Bet[]>(
    ['allMarketBetByAddress', userAddress],
    async () => {
      const allBets = await getBetsByAddress(userAddress);
      return normalizeGraphBetSingleOriginator(allBets);
    },
  );
};

export const useUserBalance = (userAddress: string | undefined): UseQueryResult<number> => {
  return useQuery<number, AxiosError, number>(['userBalance', userAddress], async () => {
    const balance = userAddress ? await getUserBalance(userAddress) : 0;
    return tokenDivideDown(balance);
  });
};
