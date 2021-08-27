import { AxiosError } from 'axios';
import * as R from 'ramda';
import { useQuery, UseQueryResult } from 'react-query';
import { getUserBalance } from '../contracts/Market';
import {
  AllMarketsLedgers,
  AllTokens,
  AuctionMarkets,
  Bet,
  Market,
  MarketPricePoint,
  StorageSupplyMaps,
  Token,
  TokenSupplyMap,
} from '../interfaces';
import { MARKET_ADDRESS } from '../globals';
import { tokenDivideDown } from '../utils/math';
import { getYesTokenId, getNoTokenId, getLQTTokenId } from '../utils/misc';
import {
  getAllLedgers,
  getAllMarkets,
  getAllTokenSupply,
  getBetsByAddress,
  getBidsByMarket,
  getTokenLedger,
  getTotalSupplyByMarket,
  getTotalSupplyForMarkets,
} from './graphql';
import {
  normalizeAuctionData,
  normalizeGraphBets,
  normalizeGraphBetSingleOriginator,
  normalizeGraphMarkets,
  normalizeLedgerMaps,
  normalizeSupplyMaps,
  toMarketPriceData,
  normalizeMarketSupplyMaps,
  orderByTxContext,
} from './utils';

export const useLedgerData = (): UseQueryResult<Token[]> => {
  return useQuery<Token[] | undefined, AxiosError, Token[]>('allLedgerData', async () => {
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

export const useTotalSupplyByMarket = (marketId: string): UseQueryResult<TokenSupplyMap> => {
  const LQTTokenId = getLQTTokenId(marketId);
  return useQuery<TokenSupplyMap | undefined, AxiosError, TokenSupplyMap>(
    ['marketTotalSupplyData', LQTTokenId],
    async () => {
      const liquidityTotalSupply = await getTotalSupplyByMarket(LQTTokenId);
      return normalizeMarketSupplyMaps(liquidityTotalSupply);
    },
  );
};

export const useTotalSupplyForMarkets = (markets?: Market[]): UseQueryResult<TokenSupplyMap[]> => {
  const LQTTokenIds = markets?.map((item) => getLQTTokenId(item.marketId));
  return useQuery<TokenSupplyMap[] | undefined, AxiosError, TokenSupplyMap[]>(
    ['marketTotalSupplyData', LQTTokenIds],
    async () => {
      if (LQTTokenIds) {
        const liquidityTotalSupply = await getTotalSupplyForMarkets(LQTTokenIds);
        return liquidityTotalSupply.storageSupplyMaps.supplyMaps;
      }
      return undefined;
    },
    { enabled: !!(markets?.length ?? 0 > 0), refetchInterval: 1000 * 100 },
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
        const tokens = await getTokenLedger(tokenList, address);
        const newTokens: Token[] = orderByTxContext(tokens.tokenQuantity.token);
        const results = tokenList.reduce((acc: Token[], item: number) => {
          const token = newTokens.find((o) => o.tokenId === String(item));
          if (token) {
            acc.push(token);
          }
          return acc;
        }, [] as Token[]);
        return results;
      }
    },
    { enabled: !!address, refetchInterval: 1000 * 10 },
  );
};

const useAllMarkets = (): UseQueryResult<AllMarketsLedgers> => {
  return useQuery<AllMarketsLedgers | undefined, AxiosError, AllMarketsLedgers>(
    'allMarketsLedgers',
    async () => {
      return getAllMarkets();
    },
    {
      refetchInterval: 1000 * 10,
    },
  );
};

export const useMarkets = (): UseQueryResult<Market[]> => {
  const { data } = useAllMarkets();
  return useQuery<Market[] | undefined, AxiosError, Market[]>(
    'allMarkets',
    async () => {
      if (data) {
        return normalizeGraphMarkets(data.markets.marketNodes, data.ledgers.ledgerMaps);
      }
    },
    {
      enabled: Boolean(data),
      refetchInterval: 1000 * 10,
    },
  );
};

export const useMarketBets = (marketId: string): UseQueryResult<Bet[]> => {
  return useQuery<Bet[] | undefined, AxiosError, Bet[]>(['marketBet', marketId], async () => {
    const allBets = await getBidsByMarket(marketId);
    return normalizeGraphBets(allBets);
  });
};

export const useAuctionPriceChartData = (): UseQueryResult<AuctionMarkets> => {
  const { data } = useAllMarkets();
  return useQuery<AuctionMarkets | undefined, AxiosError, AuctionMarkets>(
    'allAuctionMarkets',
    async () => {
      if (data) {
        return normalizeAuctionData(data.markets.marketNodes);
      }
    },
    {
      enabled: Boolean(data),
    },
  );
};

export const useMarketPriceChartData = (marketId: string): UseQueryResult<MarketPricePoint[]> => {
  const yesTokenId = getYesTokenId(marketId);
  const noTokenId = getNoTokenId(marketId);
  return useQuery<MarketPricePoint[] | undefined, AxiosError, MarketPricePoint[]>(
    ['marketTokensLedger', yesTokenId, noTokenId],
    async () => {
      const tokens = await getTokenLedger([yesTokenId, noTokenId], MARKET_ADDRESS);
      return toMarketPriceData(marketId, tokens.tokenQuantity.token);
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
