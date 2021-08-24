export type QuestionType = string;

export interface Links {
  label: string;
  url: string;
}

export enum MarketStateType {
  auctionRunning = 'auction',
  marketBootstrapped = 'market',
}

interface TXContext {
  blockInfo: {
    block: number;
    bakedAt: string;
  };
}

export interface AuctionNode {
  auctionRunningAuctionPeriodEnd: string;
  auctionRunningQuantity: string;
  auctionRunningYesPreference: string;
  auctionRunningUniswapContribution: string;
}

export interface MarketNode {
  auctionRewardCurrencyPool: string;
  liquidityRewardPool: string;
  marketCurrencyPool: string;
  bootstrapYesProbability: string;
  liquidityRewardSupplyUpdatedAtBlock: string;
  winningPrediction?: string;
  resolutionResolvedAtBlock?: number;
  marketBootstrappedBootstrappedAtBlock: string;
}

export interface PortfolioMarket {
  question: (string | undefined)[];
  holdings: string[] | string;
  price: string[] | [string, Element];
  total: string[] | string;
}

export interface PortfolioAuction {
  question: string;
  probability: string;
  quantity: string;
}

export interface MarketStateNode {
  node: AuctionNode | MarketNode;
}

export interface StorageMarketMapMarketBootstrappeds {
  nodes: MarketStateNode[];
}

export interface StorageMarketMapAuctionRunnings {
  nodes: MarketStateNode[];
}

export interface GraphMarketNode {
  node: GraphMarket;
}
export interface GraphMarket {
  id: number;
  deleted: boolean;
  marketId: string;
  metadataIpfsHash: string;
  metadataDescription: string;
  metadataAdjudicator: string;
  state: string;
  txContext: TXContext;
  storageMarketMapAuctionRunnings: StorageMarketMapAuctionRunnings;
  storageMarketMapMarketBootstrappeds: StorageMarketMapMarketBootstrappeds;
}

export interface IPFSMarketData {
  question: QuestionType;
  auctionEndDate: string;
  iconURL?: string;
  ticker: string;
}

export interface WeeklyChange {
  tokenType: TokenType;
  change: number;
}

export interface Market extends Partial<AuctionNode>, Partial<MarketNode>, IPFSMarketData {
  marketId: string;
  ipfsHash: string;
  description: string;
  adjudicator: string;
  state: MarketStateType;
  yesPrice: number;
  prevYesPrice?: number;
  liquidity?: number | string;
  block: number;
  bakedAt: string;
  weekly?: WeeklyChange;
}

export interface AllMarkets {
  markets: {
    marketNodes: GraphMarket[];
  };
}

export interface AllLedgers {
  ledgers: {
    ledgerMaps: Token[];
  };
}

export interface AllMarketsLedgers {
  markets: {
    marketNodes: GraphMarket[];
  };
  ledgers: {
    ledgerMaps: Token[];
  };
}

export interface MarketCardStatistic {
  type: string;
  value: string | number;
  changes?: string;
  currency?: string;
  tokenType?: TokenType;
}

export interface MarketCardToken {
  type: TokenType;
  value: number | string;
}

export interface MarketCardData extends Market {
  tokens?: MarketCardToken[];
  statistics?: MarketCardStatistic[];
}

export interface CreateMarket {
  marketId: number;
  ipfsHash: string;
  description: string;
  adjudicator: string;
  auctionEnd: string;
  initialBid: number;
  initialContribution: number;
  tokenType: 'fa12' | 'fa2';
  tokenAddress: string;
}

export interface GraphBet {
  probability: string;
  quantity: string;
}

export interface Bet {
  block: number;
  originator: string;
  probability: number;
  quantity: number;
  marketId: string;
}

export interface BetEdge {
  bet: GraphBet;
}

export interface GraphBets {
  totalBets: number;
  betEdges: BetEdge[];
}

export interface LqtProviderNode {
  id: number;
  marketId: string;
  originator: string;
  bets: GraphBets;
  txContext: TXContext;
}

export interface LqtProviderEdge {
  lqtProviderNode: LqtProviderNode;
}

export interface StorageLiquidityProviderMaps {
  lqtProviderEdge: LqtProviderEdge[];
}

export interface AllBets {
  storageLiquidityProviderMaps: StorageLiquidityProviderMaps;
}

export enum MarketTradeType {
  payIn = 'payIn',
  payOut = 'payOut',
}

export interface LiquidityValues {
  probability: number;
  quantity: number;
}

export interface TokenSupplyMap {
  id: number;
  tokenId: string;
  totalSupply: string;
  tokenReserve: string;
  deleted: boolean;
}

export interface StorageSupplyMaps {
  supplyMaps: TokenSupplyMap[];
}

export interface AllTokens {
  storageSupplyMaps: StorageSupplyMaps;
}

export enum TokenType {
  yes = 'Yes',
  no = 'No',
}

export interface StorageLedgerMaps {
  ledgerMaps: Token[];
}

export interface Token {
  id: number;
  tokenId: string;
  quantity: string;
  txContext: TXContext;
  owner: string;
  deleted: boolean;
}

export interface TokenQuantity {
  token: Token[];
}

export interface MarketPricePoint {
  yesPrice: number;
  block: number;
  bakedAt: string;
}

export interface AddressTokens {
  tokenQuantity: TokenQuantity;
}

export interface AuctionMarkets {
  [key: string]: Market[];
}

export type SettingValues = {
  deadline: number;
  maxSlippage: number;
};

export interface DropDownItems {
  label: string;
  value: string | number;
  startIcon?: JSX.Element;
}
