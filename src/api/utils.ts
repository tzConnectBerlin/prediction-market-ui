import { differenceInDays } from 'date-fns';
import * as R from 'ramda';
import {
  Market as GraphMarket,
  LedgerByOwnerAndTokensSubscription,
  LedgerSubscription,
  MarketBetsSubscription,
  MarketSubscription,
} from '../graphql/graphql';
import {
  Market,
  MarketStateType,
  IPFSMarketData,
  Bet,
  AuctionMarkets,
  Token,
  MarketPricePoint,
  TokenType,
  WeeklyChange,
} from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { divideDown, roundToTwo, roundTwoAndTokenDown, tokenDivideDown } from '../utils/math';
import { getYesTokenId, getNoTokenId } from '../utils/misc';

const groupByTokenIdOwner = (ledger: Token[]): any =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  R.pipe(R.groupBy(R.prop('tokenId')), R.map(R.groupBy(R.prop('owner'))))(ledger);

const includesInsensitive = (child: string) => (parent: string) =>
  R.includes(R.toLower(child), R.toLower(parent));
export const searchMarket = (markets: Market[], search: string): Market[] =>
  R.filter(R.propSatisfies(includesInsensitive(search), 'question'), markets);

export const findBetByOriginator = (bets: Bet[], originator: string): Bet | undefined =>
  R.find(R.propEq('originator', originator))(bets) as Bet | undefined;
export const findBetByMarketId = (bets: Bet[], marketId: string): Bet | undefined =>
  R.find(R.propEq('marketId', marketId))(bets) as Bet | undefined;
export const sortByMarketIdDesc = (markets: Market[]): Market[] => {
  return markets.sort((a, b) => Number(b.marketId) - Number(a.marketId));
};
export const findByMarketId = (markets: Market[], marketId: string): Market | undefined =>
  R.find(R.propEq('marketId', marketId))(markets) as Market | undefined;
const filterAuctionOpen = (market: Market) => market.state === MarketStateType.auctionRunning;
const filterAllMarkets = (market: Market) => market.state === MarketStateType.marketBootstrapped;
const filterAllOpenMarkets = (market: Market) =>
  market.state === MarketStateType.marketBootstrapped && !market.winningPrediction;
const filterMarketClosed = (market: Market) =>
  market.state === MarketStateType.marketBootstrapped && Boolean(market.winningPrediction);

export const getMarkets = (markets: Market[]): Market[] => R.filter(filterAllMarkets, markets);
export const getAuctions = (markets: Market[]): Market[] => R.filter(filterAuctionOpen, markets);
export const getOpenMarkets = (markets: Market[]): Market[] =>
  R.filter(filterAllOpenMarkets, markets);
export const getClosedMarkets = (markets: Market[]): Market[] =>
  R.filter(filterMarketClosed, markets);

const byLevel = R.descend(R.path(['txContext', 'blockInfo', 'block']));
const byOperationNumber = R.descend(R.path(['txContext', 'operationNumber']));
const byOperationGroupNumber = R.descend(R.path(['txContext', 'operationGroupNumber']));
const byContentNumber = R.descend(R.path(['txContext', 'contentNumber']));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const orderByTxContext = (data: T): T =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  R.sortWith([byLevel, byOperationGroupNumber, byOperationNumber, byContentNumber])(data);

export const toMarket = async (
  graphMarket: GraphMarket,
  supplyMaps?: Token[],
  prevSupplyMaps?: Token[],
  prevMarket?: GraphMarket,
): Promise<Market> => {
  const state = graphMarket.marketsState.includes('marketBootstrapped')
    ? MarketStateType.marketBootstrapped
    : MarketStateType.auctionRunning;
  const marketDetails =
    state === MarketStateType.auctionRunning
      ? graphMarket.marketInfo.auctionRunning[0]
      : graphMarket.marketInfo.marketBootstrapped[0];
  const ipfsData = (await fetchIPFSData<IPFSMarketData>(graphMarket.metadataIpfsHash)) ?? {};
  const yesTokenId = getYesTokenId(graphMarket.marketId);
  const noTokenId = getNoTokenId(graphMarket.marketId);
  const marketData: Market = {
    marketId: graphMarket.marketId,
    adjudicator: graphMarket.metadataAdjudicator,
    description: graphMarket.metadataDescription,
    ipfsHash: graphMarket.metadataIpfsHash,
    state,
    yesPrice: 0.5,
    ...marketDetails,
    ...ipfsData,
    ...graphMarket.txContext.blockInfo,
  };

  let yesPrice = Number(marketData.bootstrapYesProbability) ?? 0.5;
  let liquidity = 0;
  let prevYesPrice;
  let weekly: WeeklyChange | undefined;
  if (state === MarketStateType.auctionRunning) {
    const yesPreference =
      Number(marketData.auctionRunningYesPreference ?? 1) /
      Number(marketData.auctionRunningQuantity ?? 1);
    yesPrice = roundToTwo(divideDown(yesPreference));
    liquidity = roundTwoAndTokenDown(Number(marketData.auctionRunningQuantity ?? 0));
    if (prevMarket) {
      const prevMarketDetails = prevMarket.marketInfo.auctionRunning[0];
      const prevYesPreference =
        Number(prevMarketDetails.auctionRunningYesPreference ?? 1) /
        Number(prevMarketDetails.auctionRunningQuantity ?? 1);
      prevYesPrice = roundToTwo(divideDown(prevYesPreference));
    }
  }
  if (state === MarketStateType.marketBootstrapped && !marketData.winningPrediction) {
    if (supplyMaps) {
      const yesMarketLedger = R.find(R.propEq('tokenId', String(yesTokenId)), supplyMaps);
      const noMarketLedger = R.find(R.propEq('tokenId', String(noTokenId)), supplyMaps);
      if (yesMarketLedger && noMarketLedger) {
        yesPrice =
          1 -
          Number(yesMarketLedger.quantity) /
            (Number(yesMarketLedger.quantity) + Number(noMarketLedger.quantity));
      }
      if (yesMarketLedger || noMarketLedger) {
        liquidity = roundToTwo(
          tokenDivideDown(
            Number(yesMarketLedger?.quantity ?? 0) + Number(noMarketLedger?.quantity ?? 0),
          ),
        );
      }
    }
    if (prevSupplyMaps) {
      const prevYesMarketLedger = R.find(R.propEq('tokenId', String(yesTokenId)), prevSupplyMaps);
      const prevNoMarketLedger = R.find(R.propEq('tokenId', String(noTokenId)), prevSupplyMaps);
      if (prevYesMarketLedger && prevNoMarketLedger) {
        prevYesPrice = roundToTwo(
          1 -
            Number(prevYesMarketLedger.quantity) /
              (Number(prevYesMarketLedger.quantity) + Number(prevNoMarketLedger.quantity)),
        );
      }
    }
  }
  if (marketData.winningPrediction) {
    yesPrice = marketData.winningPrediction.toLowerCase() === 'yes' ? 1 : 0;
  }

  if (prevYesPrice) {
    const prevNoPrice = roundToTwo(1 - prevYesPrice);
    const currentNoPrice = roundToTwo(1 - yesPrice);
    if (yesPrice > prevYesPrice) {
      weekly = {
        tokenType: TokenType.yes,
        change: roundToTwo((yesPrice - prevYesPrice) * 100),
      };
    }
    if (currentNoPrice > prevNoPrice) {
      weekly = {
        tokenType: TokenType.no,
        change: roundToTwo((currentNoPrice - prevNoPrice) * 100),
      };
    }
  }
  return {
    ...marketData,
    yesPrice,
    liquidity,
    prevYesPrice,
    weekly,
  };
};

export const normalizeAuctionData = async (
  marketNodes: MarketSubscription['markets'],
): Promise<AuctionMarkets> => {
  const groupedMarkets = R.groupBy(R.prop('marketId'), marketNodes);
  return Object.keys(groupedMarkets).reduce(async (accP, marketId) => {
    const prev = await accP;
    const sortedMarkets: GraphMarket[] = orderByTxContext(groupedMarkets[marketId]);
    const filteredMarkets = sortedMarkets.filter((o) => o.marketsState.includes('auctionRunning'));
    const markets = await Promise.all(filteredMarkets.map((item) => toMarket(item)));
    prev[marketId] = markets;
    return prev;
  }, Promise.resolve({} as AuctionMarkets));
};

export const normalizeGraphBets = (
  betNodes: MarketBetsSubscription['allPmmStorageLiquidityProviderMapLivesList'],
): Bet[] => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const groupedBets = R.groupBy(R.prop('originator'), betNodes);
  return Object.keys(groupedBets).reduce((prev, originator) => {
    const lqtNode = groupedBets[originator][0];
    const bets: any[] = R.pathOr([], ['betDetails', 'bets'], lqtNode);
    if (bets.length > 0) {
      prev.push({
        block: lqtNode.txContext?.blockInfo?.block ?? 0,
        date: lqtNode.txContext?.blockInfo?.bakedAt ?? '',
        quantity: Number(bets[0].quantity),
        originator,
        marketId: lqtNode.marketId,
        probability: roundToTwo(divideDown(Number(bets[0].probability)) * 100),
        txHash: lqtNode?.txContext?.txHash ?? '',
      });
    }
    return prev;
  }, [] as Bet[]);
};

export const normalizeLedgerMaps = (ledgerMaps: Token[]): Token[] => {
  const ledgerData = groupByTokenIdOwner(ledgerMaps);
  const ledgers: Token[] = [];
  Object.keys(ledgerData).forEach((tokenId) => {
    const tokenData = ledgerData[tokenId];
    Object.keys(ledgerData[tokenId]).forEach((owner) => {
      const data = orderByTxContext(tokenData[owner]);
      if (data.length) {
        ledgers.push(data[0] as Token);
      }
    });
  });
  return ledgers;
};

export const normalizeGraphMarkets = async (
  marketNodes: MarketSubscription['markets'],
  ledgers: LedgerSubscription['ledgers'],
): Promise<Market[]> => {
  const latestLedger: Token[] = orderByTxContext(ledgers);
  const groupedMarkets = R.groupBy(R.prop('marketId'), marketNodes);
  const currentDate = new Date();
  let prevSupplyMaps: LedgerSubscription['ledgers'] = [];
  let prevMarket: GraphMarket | undefined;
  const result: Promise<Market>[] = Object.keys(groupedMarkets).reduce((prev, marketId) => {
    const sortedMarkets: GraphMarket[] = orderByTxContext(groupedMarkets[marketId]);
    const market = sortedMarkets[0];
    if (market) {
      if (market.marketsState.includes('marketBootstrapped')) {
        prevSupplyMaps = ledgers.filter((o) => {
          const diff = differenceInDays(currentDate, new Date(o?.txContext?.blockInfo?.bakedAt));
          return diff >= 7;
        });
      } else {
        prevMarket = sortedMarkets.find((o) => {
          const diff = differenceInDays(currentDate, new Date(o.txContext.blockInfo.bakedAt));
          return diff >= 7;
        });
      }
      const normalizedMarket = toMarket(
        market,
        latestLedger,
        orderByTxContext(prevSupplyMaps),
        prevMarket,
      );
      prev.push(normalizedMarket);
    }
    return prev;
  }, [] as Promise<Market>[]);
  const markets = await Promise.all(result);
  return sortByMarketIdDesc(markets) as Market[];
};

export const toMarketPriceData = (
  marketId: string,
  tokens: LedgerByOwnerAndTokensSubscription['ledgers'],
): MarketPricePoint[] => {
  const yesTokenId = getYesTokenId(marketId);
  const noTokenId = getNoTokenId(marketId);
  const result: MarketPricePoint[] = [];
  const groupedTokens = tokens ? R.groupBy(R.prop('tokenId'), tokens) : {};
  const yesTokens: Token[] = orderByTxContext(groupedTokens[yesTokenId]);
  const noTokens: Token[] = orderByTxContext(groupedTokens[noTokenId]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const groupedYesTokens = R.groupBy((item: Token) => {
    return item.txContext.blockInfo.block;
  }, yesTokens);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const groupedNoTokens = R.groupBy((item: Token) => {
    return item.txContext.blockInfo.block;
  }, noTokens);

  return Object.keys(groupedYesTokens).reduce((acc, block) => {
    const lastYesValue: Token | null = R.pathOr(
      null,
      [0],
      orderByTxContext(groupedYesTokens[block]),
    ) as unknown as Token | null;
    const lastNoValue: Token | null = R.pathOr(
      null,
      [0],
      orderByTxContext(groupedNoTokens[block]),
    ) as unknown as Token | null;
    if (lastYesValue !== null && lastNoValue !== null) {
      acc.push({
        bakedAt: lastYesValue.txContext.blockInfo.bakedAt,
        block: lastYesValue.txContext.blockInfo.block,
        yesPrice: roundToTwo(
          1 -
            Number(lastYesValue?.quantity) /
              (Number(lastYesValue.quantity) + Number(lastNoValue.quantity)),
        ),
      });
    }
    return acc;
  }, result);
};
