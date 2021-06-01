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
  LedgerMap,
} from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { divideDown, roundToTwo, tokenDivideDown } from '../utils/math';

const groupByTokenIdOwner = (ledger: LedgerMap[]): any =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  R.pipe(R.groupBy(R.prop('tokenId')), R.map(R.groupBy(R.prop('owner'))))(ledger);

// eslint-disable-next-line no-bitwise
export const getBaseTokenId = (marketId: string): number => Number(marketId) << 3;

export const getNoTokenId = (marketId: string): number => getBaseTokenId(marketId);

export const getYesTokenId = (marketId: string): number => 1 + getBaseTokenId(marketId);

const includesInsensitive = (child: string) => (parent: string) =>
  R.includes(R.toLower(child), R.toLower(parent));
export const searchMarket = (markets: Market[], search: string): Market[] =>
  R.filter(R.propSatisfies(includesInsensitive(search), 'question'), markets);

export const sortByBlock = R.sortBy(R.prop('block'));
export const findBetByOriginator = (bets: Bet[], originator: string): Bet | undefined =>
  R.find(R.propEq('originator', originator))(bets) as Bet | undefined;
export const sortByMarketIdDesc = (markets: Market[]): Market[] => {
  return markets.sort((a, b) => Number(b.marketId) - Number(a.marketId));
};
export const findByMarketId = (markets: Market[], marketId: string): Market | undefined =>
  R.find(R.propEq('marketId', marketId))(markets) as Market | undefined;
const filterAuctionOpen = (market: Market) => market.state === MarketStateType.auctionRunning;
const filterAllMarkets = (market: Market) =>
  market.state === MarketStateType.marketBootstrapped && !market.winningPrediction;
const filterMarketClosed = (market: Market) =>
  market.state === MarketStateType.marketBootstrapped && Boolean(market.winningPrediction);

export const getAuctions = (markets: Market[]): Market[] => R.filter(filterAuctionOpen, markets);
export const getOpenMarkets = (markets: Market[]): Market[] => R.filter(filterAllMarkets, markets);
export const getClosedMarkets = (markets: Market[]): Market[] =>
  R.filter(filterMarketClosed, markets);

export const toMarket = async (
  graphMarket: GraphMarket,
  supplyMaps: LedgerMap[],
): Promise<Market> => {
  const state = graphMarket.state.includes('marketBootstrapped')
    ? MarketStateType.marketBootstrapped
    : MarketStateType.auctionRunning;
  const marketDetails =
    state === MarketStateType.auctionRunning
      ? graphMarket.storageMarketMapAuctionRunnings.nodes[0]
      : graphMarket.storageMarketMapMarketBootstrappeds.nodes[0];
  const ipfsData = await fetchIPFSData<IPFSMarketData>(graphMarket.metadataIpfsHash);
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
  };

  let yesPrice = Number(marketData.bootstrapYesProbability) ?? 0.5;
  const volume = roundToTwo(
    tokenDivideDown(
      Number(marketData.auctionRunningQuantity ?? marketData.marketCurrencyPool ?? 0),
    ),
  );
  if (state === MarketStateType.auctionRunning) {
    const yesPreference =
      Number(marketData.auctionRunningYesPreference ?? 1) /
      Number(marketData.auctionRunningQuantity ?? 1);
    yesPrice = roundToTwo(divideDown(yesPreference));
  } else if (state === MarketStateType.marketBootstrapped && supplyMaps) {
    const yesMarketLedger = R.find(R.propEq('tokenId', String(yesTokenId)), supplyMaps);
    const noMarketLedger = R.find(R.propEq('tokenId', String(noTokenId)), supplyMaps);
    if (yesMarketLedger && noMarketLedger) {
      yesPrice = roundToTwo(
        1 -
          Number(yesMarketLedger.quantity) /
            (Number(yesMarketLedger.quantity) + Number(noMarketLedger.quantity)),
      );
    }
  }

  return {
    ...marketData,
    yesPrice,
    volume,
  };
};

export const normalizeGraphMarkets = async (
  marketNodes: GraphMarket[],
  ledgers: LedgerMap[],
): Promise<Market[]> => {
  const groupedMarkets = R.groupBy(R.prop('marketId'), marketNodes);
  const result: Promise<Market>[] = Object.keys(groupedMarkets).reduce((prev, marketId) => {
    const market = R.last(sortByBlock(groupedMarkets[marketId]));
    if (market) {
      prev.push(toMarket(market, ledgers));
    }
    return prev;
  }, [] as Promise<Market>[]);
  const markets = await Promise.all(result);
  return sortByMarketIdDesc(markets) as Market[];
};

export const normalizeGraphBets = ({
  storageLiquidityProviderMaps: { lqtProviderEdge },
}: AllBets): Bet[] => {
  const betNodes: LqtProviderNode[] = R.pluck('lqtProviderNode', lqtProviderEdge);
  const groupedBets = R.groupBy(R.prop('originator'), betNodes);
  return Object.keys(groupedBets).reduce((prev, originator) => {
    const lqtNode = R.last(sortByBlock(groupedBets[originator]));
    if (lqtNode) {
      prev.push({
        block: lqtNode.block,
        quantity: Number(lqtNode.bets.betEdges[0].bet.quantity),
        originator,
        probability: divideDown(Number(lqtNode.bets.betEdges[0].bet.probability)),
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

export const normalizeLedgerMaps = (ledgerMaps: LedgerMap[]): LedgerMap[] => {
  const ledgerData = groupByTokenIdOwner(ledgerMaps);
  const ledgers: LedgerMap[] = [];
  Object.keys(ledgerData).forEach((tokenId) => {
    const tokenData = ledgerData[tokenId];
    Object.keys(ledgerData[tokenId]).forEach((owner) => {
      const data = R.last(sortByBlock(tokenData[owner]));
      if (data) {
        ledgers.push(data as LedgerMap);
      }
    });
  });
  return ledgers;
};
