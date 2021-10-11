import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { getUserBalance } from '../contracts/Market';
import {
  AllMarketsLedgers,
  AuctionMarkets,
  Bet,
  Market,
  MarketPricePoint,
  Token,
  TokenSupplyMap,
} from '../interfaces';
import { MARKET_ADDRESS } from '../globals';
import { roundToTwo, roundTwoAndTokenDown, tokenDivideDown } from '../utils/math';
import {
  getYesTokenId,
  getNoTokenId,
  getLQTTokenId,
  getTokenQuantityById,
  getRoundedDividedTokenQuantityById,
} from '../utils/misc';
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
  findBetByMarketId,
} from './utils';
import { calculatePoolShare } from '../contracts/MarketCalculations';

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

export const poolTokensByAddress = async (
  tokenList: number[],
  address?: string,
): Promise<Token[]> => {
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

export const useOpenPositions = (address?: string): number => {
  let openPositions = 0;
  const { data } = useMarkets();
  const { data: allBets } = useAllBetsByAddress(address);
  const { data: ledgers } = useLedgerData();
  const { data: auctionSupply } = useTotalSupplyForMarkets(data);
  if (data && allBets) {
    data.forEach((item) => {
      const noToken = getNoTokenId(item.marketId);
      const yesToken = getYesTokenId(item.marketId);
      const lqtToken = getLQTTokenId(item.marketId);
      const tokens = ledgers?.filter(
        (o) =>
          o.owner === address &&
          (o.tokenId === String(lqtToken) ||
            o.tokenId === String(noToken) ||
            o.tokenId === String(yesToken)),
      );

      const currentBet = findBetByMarketId(allBets, item.marketId);
      if (currentBet) {
        const liquidityTotal = tokenDivideDown(currentBet?.quantity);
        openPositions = roundToTwo(openPositions + liquidityTotal);
      }
      if (tokens) {
        const yesHoldings = getRoundedDividedTokenQuantityById(tokens, yesToken);
        const noHoldings = getRoundedDividedTokenQuantityById(tokens, noToken);
        const yesTotal = roundToTwo(yesHoldings * item.yesPrice);
        const noTotal = roundToTwo(noHoldings * roundToTwo(1 - item.yesPrice));
        const yesPool = getTokenQuantityById(tokens, yesToken);
        const noPool = getTokenQuantityById(tokens, noToken);
        const tokenTotalSupply = auctionSupply?.find((i) => i.tokenId === lqtToken.toString());
        const lqtHoldings = getTokenQuantityById(tokens, lqtToken);
        if (lqtHoldings && tokenTotalSupply) {
          const poolShare = calculatePoolShare(
            lqtHoldings,
            Number(tokenTotalSupply?.totalSupply) ?? 0,
          );
          const totalValue =
            poolShare * yesPool * item.yesPrice + poolShare * noPool * (1 - item.yesPrice);
          const liquidityTotal = roundTwoAndTokenDown(totalValue);
          openPositions = roundToTwo(openPositions + liquidityTotal);
        }
        if (yesHoldings || noHoldings) {
          openPositions = roundToTwo(openPositions + noTotal + yesTotal);
        }
      }
    });
  }

  return openPositions;
};
