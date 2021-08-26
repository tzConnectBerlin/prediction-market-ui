import { AxiosError } from 'axios';
import * as React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { useSubscription } from '@apollo/client';
import { getUserBalance } from '../contracts/Market';
import {
  AuctionMarkets,
  Bet,
  Market,
  MarketPricePoint,
  Token,
  TokenSupplyMap,
} from '../interfaces';
import { MARKET_ADDRESS } from '../globals';
import { tokenDivideDown } from '../utils/math';
import { getYesTokenId, getNoTokenId, getLQTTokenId } from '../utils/misc';
import {
  ALL_MARKETS_SUBSCRIPTIONS,
  getAllLedgers,
  getAllTokenSupply,
  getBetsByAddress,
  getBidsByMarket,
  getTokenLedger,
  getTotalSupplyByMarket,
  MARKET_LEDGERS,
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

interface UseMarkets {
  data: Market[];
  isLoading: boolean;
}

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

const useAllMarkets = () => {
  return useSubscription(ALL_MARKETS_SUBSCRIPTIONS);
};

const useMarketLedgers = () => {
  return useSubscription(MARKET_LEDGERS);
};

export const useMarkets = (): UseMarkets => {
  const { data: marketData, loading: marketLoading } = useSubscription(ALL_MARKETS_SUBSCRIPTIONS);
  const { data: ledgerData, loading: marketLedgerLoading } = useSubscription(MARKET_LEDGERS);
  const [data, setData] = React.useState<Market[]>([]);
  React.useEffect(() => {
    const transformToMarket = async () => {
      if (marketData && ledgerData) {
        const newData = await normalizeGraphMarkets(
          marketData.markets.marketNodes,
          ledgerData.ledgers.ledgerMaps,
        );
        setData(newData);
      }
    };
    transformToMarket();
  }, [marketData, ledgerData]);
  return { data, isLoading: marketLoading && marketLedgerLoading };
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
