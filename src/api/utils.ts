import * as R from 'ramda';
import {
  GraphMarket,
  Market,
  MarketStateType,
  IPFSMarketData,
  AllMarkets,
  AllBets,
  LqtProviderNode,
  Bet,
} from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { divideDown, roundToTwo } from '../utils/math';

/* const includesInsensitive = (child: string) => (parent: string) =>
  R.includes(R.toLower(child), R.toLower(parent));
export const searchMarket = (markets: Market[], value: string) =>  */

export const sortByBlock = R.sortBy(R.prop('block'));
export const findBetByOriginator = (bets: Bet[], originator: string): Bet | undefined =>
  R.find(R.propEq('originator', originator))(bets) as Bet | undefined;
export const sortByMarketIdDesc = R.sortWith([R.descend(R.prop('marketId'))]);
export const findByMarketId = (markets: Market[], marketId: string): Market | undefined =>
  R.find(R.propEq('marketId', marketId))(markets) as Market | undefined;
const filterAuctionOpen = (market: Market) => market.state === MarketStateType.auctionRunning;
const filterAllMarkets = (market: Market) => market.state === MarketStateType.marketBootstrapped;
const filterMarketClosed = (market: Market) =>
  market.state === MarketStateType.marketBootstrapped && Boolean(market.resolutionResolvedAtBlock);

export const getAuctions = (markets: Market[]): Market[] => R.filter(filterAuctionOpen, markets);
export const getOpenMarkets = (markets: Market[]): Market[] => R.filter(filterAllMarkets, markets);
export const getClosedMarkets = (markets: Market[]): Market[] =>
  R.filter(filterMarketClosed, markets);

export const toMarket = async (graphMarket: GraphMarket): Promise<Market> => {
  const state = graphMarket.state.includes('marketBootstrapped')
    ? MarketStateType.marketBootstrapped
    : MarketStateType.auctionRunning;
  const marketDetails =
    state === MarketStateType.auctionRunning
      ? graphMarket.storageMarketMapAuctionRunnings.edges[0].node
      : graphMarket.storageMarketMapMarketBootstrappeds.edges[0].node;
  const ipfsData = await fetchIPFSData<IPFSMarketData>(graphMarket.metadataIpfsHash);
  const marketData: Market = {
    marketId: graphMarket.marketId,
    adjudicator: graphMarket.metadataAdjudicator,
    description: graphMarket.metadataDescription,
    ipfsHash: graphMarket.metadataIpfsHash,
    state,
    yesPrice: 0.5,
    ...marketDetails,
    ...ipfsData,
  };
  let yesPreference = Number(marketData.bootstrapYesProbability) ?? 0.5;
  const volume = marketData.auctionRunningQuantity ?? marketData.marketCurrencyPool;
  if (state === MarketStateType.auctionRunning) {
    yesPreference =
      Number(marketData.auctionRunningYesPreference ?? 1) /
      Number(marketData.auctionRunningQuantity ?? 1);
  }
  const yesPrice = roundToTwo(divideDown(yesPreference));

  return {
    ...marketData,
    yesPrice,
    volume,
  };
};

export const normalizeGraphMarkets = async ({
  storageMarketMaps: { edges },
}: AllMarkets): Promise<Market[]> => {
  const marketList: GraphMarket[] = R.pluck('node', edges);
  const groupedMarkets = R.groupBy(R.prop('marketId'), marketList);
  const result: Promise<Market>[] = Object.keys(groupedMarkets).reduce((prev, marketId) => {
    const market = R.last(sortByBlock(groupedMarkets[marketId]));
    if (market) {
      prev.push(toMarket(market));
    }
    return prev;
  }, [] as Promise<Market>[]);
  const markets = await Promise.all(result);
  return sortByMarketIdDesc(markets) as Market[];
};

export const normalizeGraphBets = async ({
  storageLiquidityProviderMaps: { lqtProviderEdge },
}: AllBets): Promise<Bet[]> => {
  const betNodes: LqtProviderNode[] = R.pluck('lqtProviderNode', lqtProviderEdge);
  const groupedBets = R.groupBy(R.prop('originator'), betNodes);
  return Object.keys(groupedBets).reduce((prev, originator) => {
    const lqtNode = R.last(sortByBlock(groupedBets[originator]));
    if (lqtNode) {
      prev.push({
        quantity: Number(lqtNode.bets.betEdges[0].bet.quantity),
        originator,
        probability: divideDown(Number(lqtNode.bets.betEdges[0].bet.probability)),
      });
    }
    return prev;
  }, [] as Bet[]);
};
