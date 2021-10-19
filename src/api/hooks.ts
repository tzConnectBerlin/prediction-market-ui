import * as React from 'react';
import { getUserBalance } from '../contracts/Market';
import { AuctionMarkets, Bet, Market } from '../interfaces';
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
  normalizeAuctionData,
  normalizeGraphBets,
  normalizeGraphMarkets,
  normalizeLedgerMaps,
  toMarketPriceData,
  findBetByMarketId,
} from './utils';
import { calculatePoolShare } from '../contracts/MarketCalculations';
import {
  LiveLedgerSubscription,
  Token,
  useLedgerByOwnerAndTokensSubscription,
  useLedgerByOwnerSubscription,
  useLedgerSubscription,
  useLiveLedgerSubscription,
  useMarketBetsSubscription,
  useMarketSubscription,
  useTokenSupplyByTokenIdSubscription,
  useUserBetsSubscription,
} from '../graphql/graphql';

interface UseMarkets {
  data?: Market[];
  isLoading: boolean;
}

interface UseUserBalance {
  balance: number;
  isLoading: boolean;
}

export const useAllLedgerData = (): Token[] | undefined => {
  const [state, setState] = React.useState<Token[] | undefined>(undefined);
  const { data } = useLedgerSubscription({ variables: { owner: MARKET_ADDRESS } });
  React.useEffect(() => {
    if (data?.ledgers) {
      setState(normalizeLedgerMaps(data?.ledgers));
    }
  }, [data]);
  return state;
};

export const useTotalSupplyForMarkets = (marketsOrBets?: Market[] | Bet[]) => {
  const LQTTokenIds = marketsOrBets?.map((item) => getLQTTokenId(item.marketId));
  const skip = typeof marketsOrBets === 'undefined' || LQTTokenIds?.length === 0;
  return useTokenSupplyByTokenIdSubscription({ variables: { tokens: LQTTokenIds }, skip });
};

export const useTokenByAddress = (tokens: number[], owner: string) => {
  return useLedgerByOwnerSubscription({ variables: { tokens, owner } });
};

export const useMarkets = (): UseMarkets => {
  const { data: marketData, loading: marketLoading } = useMarketSubscription();
  const { data: ledgerData, loading: marketLedgerLoading } = useLedgerSubscription({
    variables: { owner: MARKET_ADDRESS },
  });
  const [data, setData] = React.useState<Market[] | undefined>(undefined);

  const transformToMarket = async () => {
    if (marketData?.markets && ledgerData?.ledgers) {
      const newData = await normalizeGraphMarkets(marketData.markets, ledgerData.ledgers);
      setData(newData);
    }
  };

  React.useEffect(() => {
    transformToMarket();
  }, [marketLoading, marketLedgerLoading]);
  return { data, isLoading: marketLoading && marketLedgerLoading && !data };
};

export const useMarketBets = (marketId: string): Bet[] | undefined => {
  const [state, setState] = React.useState<Bet[] | undefined>(undefined);
  const { data } = useMarketBetsSubscription({ variables: { marketId } });
  React.useEffect(() => {
    if (data) {
      setState(normalizeGraphBets(data.allPmmStorageLiquidityProviderMapLivesList));
    }
  }, [data]);
  return state;
};

export const useAuctionPriceChartData = () => {
  const { data, loading, error } = useMarketSubscription();
  const [auctionMarkets, setAuctionMarkets] = React.useState<AuctionMarkets | undefined>(undefined);
  React.useEffect(() => {
    const processMarkets = async () => {
      if (data?.markets) {
        const innerData = await normalizeAuctionData(data.markets);
        setAuctionMarkets(innerData);
      }
    };
    processMarkets();
  }, [data?.markets]);
  return { data: auctionMarkets, loading, error };
};

export const useMarketPriceChartData = (marketId: string, tokens: number[]) => {
  const { data, loading, error } = useLedgerByOwnerAndTokensSubscription({
    variables: { owner: MARKET_ADDRESS, tokens },
  });
  if (data) {
    const innerData = toMarketPriceData(marketId, data.ledgers);
    return { loading, error, data: innerData };
  }
  return { data, loading, error };
};

export const useAllBetsByAddress = (userAddress?: string) => {
  const skip = typeof userAddress === 'undefined';
  const { data, loading, error } = useUserBetsSubscription({
    variables: { originator: userAddress ?? '' },
    skip,
  });
  if (!data) {
    return { data, loading, error };
  }
  const bets = normalizeGraphBets(data.allPmmStorageLiquidityProviderMapLivesList);
  return { data: bets, loading, error };
};

export const useUserBalance = (userAddress: string | undefined): UseUserBalance => {
  const [balanceState, setBalanceState] = React.useState<UseUserBalance>({
    balance: 0,
    isLoading: true,
  });

  const fetchBalance = React.useCallback(async () => {
    const balance = userAddress ? await getUserBalance(userAddress) : 0;
    const normalizedBalance = tokenDivideDown(balance);
    setBalanceState({ balance: normalizedBalance, isLoading: false });
  }, [userAddress]);

  React.useEffect(() => {
    fetchBalance();
  }, [userAddress]);

  return balanceState;
};

export const poolTokensByAddress = async (
  liveLedger: LiveLedgerSubscription['ledgers'],
  tokenList: number[],
  address: string,
): Promise<Token[]> => {
  const results = tokenList.reduce((acc: Token[], item: number) => {
    const token = liveLedger.find((o) => o.tokenId === String(item) && o.owner === address);
    if (token) {
      acc.push(token as Token);
    }
    return acc;
  }, [] as Token[]);
  return results;
};

export const useOpenPositions = (address?: string): number => {
  let openPositions = 0;
  const { data } = useMarkets();
  const { data: allBets } = useAllBetsByAddress(address);
  const { data: liveLedger } = useLiveLedgerSubscription();
  const { data: auctionSupply } = useTotalSupplyForMarkets(data);
  if (data && allBets) {
    data.forEach((item) => {
      const noToken = getNoTokenId(item.marketId);
      const yesToken = getYesTokenId(item.marketId);
      const lqtToken = getLQTTokenId(item.marketId);
      const tokens = liveLedger?.ledgers?.filter(
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
        const tokenTotalSupply = auctionSupply?.supplyMaps?.find(
          (i) => i.tokenId === lqtToken.toString(),
        );
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
