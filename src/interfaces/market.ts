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
    txHash: string;
  };
  operationGroupNumber: number;
  operationNumber: number;
  contentNumber: number;
}

export enum Role {
  participant = 'participant',
  adjudicator = 'adjudicator',
}

export type FontSize =
  | 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'inherit'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2';

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

export interface AllLedgers {
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
  date: string;
  quantity: number;
  marketId: string;
  txHash: string;
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

export interface MarketAuctionInfo {
  auctionRunningAuctionPeriodEnd: string;
  auctionRunningQuantity: string;
  auctionRunningYesPreference: string;
  auctionRunningUniswapContribution: string;
}

export interface Market extends Partial<MarketAuctionInfo>, Partial<MarketNode>, IPFSMarketData {
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

export enum MarketEnterExitDirection {
  mint = 'mint',
  burn = 'burn',
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
  txContext: TXContext;
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
  /**
   * whether to show advanced or simplified interactions
   */
  advanced: boolean;
  deadline: number;
  maxSlippage: number;
};

export interface DropDownItems {
  label: string;
  value: string | number;
  startIcon?: JSX.Element;
}
