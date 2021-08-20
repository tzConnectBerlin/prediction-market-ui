import { differenceInDays } from 'date-fns/esm';
import * as R from 'ramda';
import {
  GraphMarket,
  Market,
  MarketStateType,
  IPFSMarketData,
  AllBets,
  LqtProviderNode,
  Bet,
  AllTokens,
  TokenSupplyMap,
  BetEdge,
  AuctionMarkets,
  Token,
  MarketPricePoint,
  AuctionNode,
  TokenType,
  WeeklyChange,
} from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { divideDown, roundToTwo, tokenDivideDown } from '../utils/math';
import { getYesTokenId, getNoTokenId } from '../utils/misc';

const groupByTokenIdOwner = (ledger: Token[]): any =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  R.pipe(R.groupBy(R.prop('tokenId')), R.map(R.groupBy(R.prop('owner'))))(ledger);

const includesInsensitive = (child: string) => (parent: string) =>
  R.includes(R.toLower(child), R.toLower(parent));
export const searchMarket = (markets: Market[], search: string): Market[] =>
  R.filter(R.propSatisfies(includesInsensitive(search), 'question'), markets);

export const sortById = R.sortBy(R.prop('id'));
export const sortByBlock = R.sortBy(R.prop('txContext.blockInfo.block'));
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

export const toMarket = async (
  graphMarket: GraphMarket,
  supplyMaps?: Token[],
  prevSupplyMaps?: Token[],
  prevMarket?: GraphMarket,
): Promise<Market> => {
  const state = graphMarket.state.includes('marketBootstrapped')
    ? MarketStateType.marketBootstrapped
    : MarketStateType.auctionRunning;
  const marketDetails =
    state === MarketStateType.auctionRunning
      ? graphMarket.storageMarketMapAuctionRunnings.nodes[0]
      : graphMarket.storageMarketMapMarketBootstrappeds.nodes[0];
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
    liquidity = roundToTwo(tokenDivideDown(Number(marketData.auctionRunningQuantity ?? 0)));
    if (prevMarket) {
      const prevMarketDetails = prevMarket.storageMarketMapAuctionRunnings
        .nodes[0] as unknown as AuctionNode;
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
        yesPrice = roundToTwo(
          1 -
            Number(yesMarketLedger.quantity) /
              (Number(yesMarketLedger.quantity) + Number(noMarketLedger.quantity)),
        );
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

export const normalizeAuctionData = async (marketNodes: GraphMarket[]): Promise<AuctionMarkets> => {
  const groupedMarkets = R.groupBy(R.prop('marketId'), marketNodes);
  return Object.keys(groupedMarkets).reduce(async (accP, marketId) => {
    const prev = await accP;
    const sortedMarkets = sortByBlock(groupedMarkets[marketId]);
    const filteredMarkets = sortedMarkets.filter((o) => o.state.includes('auctionRunning'));
    const markets = await Promise.all(filteredMarkets.map((item) => toMarket(item)));
    prev[marketId] = markets;
    return prev;
  }, Promise.resolve({} as AuctionMarkets));
};

export const normalizeGraphBets = ({
  storageLiquidityProviderMaps: { lqtProviderEdge },
}: AllBets): Bet[] => {
  const betNodes: LqtProviderNode[] = R.pluck('lqtProviderNode', lqtProviderEdge);
  const groupedBets = R.groupBy(R.prop('originator'), betNodes);
  return Object.keys(groupedBets).reduce((prev, originator) => {
    const lqtNode = R.last(sortById(groupedBets[originator]));
    const edges: BetEdge[] = R.pathOr([], ['bets', 'betEdges'], lqtNode);
    if (lqtNode && edges.length > 0) {
      prev.push({
        block: lqtNode.txContext.blockInfo.block,
        quantity: Number(edges[0].bet.quantity),
        originator,
        marketId: lqtNode.marketId,
        probability: roundToTwo(divideDown(Number(edges[0].bet.probability)) * 100),
      });
    }
    return prev;
  }, [] as Bet[]);
};

export const normalizeGraphBetSingleOriginator = ({
  storageLiquidityProviderMaps: { lqtProviderEdge },
}: AllBets): Bet[] => {
  const betNodes: LqtProviderNode[] = R.pluck('lqtProviderNode', lqtProviderEdge);
  const groupedBets = R.groupBy(R.prop('marketId'), betNodes);
  const address = betNodes[0].originator;
  return Object.keys(groupedBets).reduce((prev, marketId) => {
    const lqtNode = R.reduce(
      (acc, cur) =>
        cur.bets.betEdges[0]?.bet?.quantity > acc?.bets?.betEdges?.[0]?.bet?.quantity ? cur : acc,
      sortByBlock(groupedBets[marketId])[0],
      sortByBlock(groupedBets[marketId]),
    );
    const edges: BetEdge[] = R.pathOr([], ['bets', 'betEdges'], lqtNode);
    if (lqtNode && edges.length > 0) {
      prev.push({
        block: lqtNode.txContext.blockInfo.block,
        quantity: Number(edges[0].bet.quantity),
        marketId,
        originator: address,
        probability: roundToTwo(divideDown(Number(edges[0].bet.probability) * 100)),
      });
    }
    return prev;
  }, [] as Bet[]);
};

export const normalizeSupplyMaps = ({
  storageSupplyMaps: { supplyMaps },
}: AllTokens): TokenSupplyMap[] => {
  const groupedSupplyMaps = R.groupBy(R.prop('tokenId'), supplyMaps);
  return Object.keys(groupedSupplyMaps).reduce((prev, tokenId) => {
    const tokenMap = R.last(sortByBlock(groupedSupplyMaps[tokenId]));
    if (tokenMap) {
      prev.push(tokenMap);
    }
    return prev;
  }, [] as TokenSupplyMap[]);
};

export const normalizeLedgerMaps = (ledgerMaps: Token[]): Token[] => {
  const ledgerData = groupByTokenIdOwner(ledgerMaps);
  const ledgers: Token[] = [];
  Object.keys(ledgerData).forEach((tokenId) => {
    const tokenData = ledgerData[tokenId];
    Object.keys(ledgerData[tokenId]).forEach((owner) => {
      const data = R.last(sortByBlock(tokenData[owner]));
      if (data) {
        ledgers.push(data as Token);
      }
    });
  });
  return ledgers;
};

export const normalizeGraphMarkets = async (
  marketNodes: GraphMarket[],
  ledgers: Token[],
): Promise<Market[]> => {
  const latestLedger = normalizeLedgerMaps(ledgers);
  const groupedMarkets = R.groupBy(R.prop('marketId'), marketNodes);
  const currentDate = new Date();
  let prevSupplyMaps: Token[] = [];
  let prevMarket: GraphMarket | undefined;
  const result: Promise<Market>[] = Object.keys(groupedMarkets).reduce((prev, marketId) => {
    const sortedMarkets = sortByBlock(groupedMarkets[marketId]);
    const market = R.last(sortedMarkets);
    if (market) {
      if (market.state.includes('marketBootstrapped')) {
        prevSupplyMaps = ledgers.filter((o) => {
          const diff = differenceInDays(currentDate, new Date(o.txContext.blockInfo.bakedAt));
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
        sortByBlock(prevSupplyMaps),
        prevMarket,
      );
      prev.push(normalizedMarket);
    }
    return prev;
  }, [] as Promise<Market>[]);
  const markets = await Promise.all(result);
  return sortByMarketIdDesc(markets) as Market[];
};

export const toMarketPriceData = (marketId: string, tokens: Token[]): MarketPricePoint[] => {
  const yesTokenId = getYesTokenId(marketId);
  const noTokenId = getNoTokenId(marketId);
  const result: MarketPricePoint[] = [];
  const groupedTokens = R.groupBy(R.prop('tokenId'), tokens);
  const yesTokens = sortByBlock(groupedTokens[yesTokenId]);
  const noTokens = sortByBlock(groupedTokens[noTokenId]);
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
    const lastYesValue = R.last(sortById(groupedYesTokens[block]));
    const lastNoValue = R.last(sortById(groupedNoTokens[block]));
    if (lastYesValue && lastNoValue) {
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
