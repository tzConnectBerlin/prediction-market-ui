import { MichelsonMap } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';

export type QuestionType = string;

export interface Links {
  label: string;
  url: string;
}

export enum MarketStateType {
  auctionRunning = 'auction',
  marketBootstrapped = 'market',
}

export enum Role {
  participant = 'Participant',
  adjudicator = 'Adjudicator',
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
  price: string[] | string;
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
  block: number;
  deleted: boolean;
  marketId: string;
  metadataIpfsHash: string;
  metadataDescription: string;
  metadataAdjudicator: string;
  state: string;
  dateTime: {
    bakedAt: string;
  };
  storageMarketMapAuctionRunnings: StorageMarketMapAuctionRunnings;
  storageMarketMapMarketBootstrappeds: StorageMarketMapMarketBootstrappeds;
}

export interface IPFSMarketData {
  question: QuestionType;
  auctionEndDate: string;
  iconURL?: string;
  ticker: string;
}

export interface Market extends Partial<AuctionNode>, Partial<MarketNode>, IPFSMarketData {
  marketId: string;
  ipfsHash: string;
  description: string;
  adjudicator: string;
  state: MarketStateType;
  yesPrice: number;
  liquidity?: number | string;
  block: number;
  bakedAt: string;
}

export interface AllMarkets {
  markets: {
    marketNodes: GraphMarket[];
  };
}

export interface AllLedgers {
  ledgers: {
    ledgerMaps: LedgerMap[];
  };
}

export interface AllMarketsLedgers {
  markets: {
    marketNodes: GraphMarket[];
  };
  ledgers: {
    ledgerMaps: LedgerMap[];
  };
}

export interface MarketCardStatistic {
  type: string;
  value: string | number;
  changes?: string;
  currency?: Currency;
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
  block: number;
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

export enum FormType {
  buy = 'Buy',
  sell = 'Sell',
  addLiquidity = 'Add Liquidity',
  removeLiquidity = 'Remove Liquidity',
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

export interface LedgerMap {
  id: number;
  block: number;
  deleted: boolean;
  owner: string;
  tokenId: string;
  quantity: string;
}

export interface StorageLedgerMaps {
  ledgerMaps: LedgerMap[];
}

export interface Token {
  id: number;
  tokenId: string;
  quantity: string;
  block: number;
  dateTime: {
    bakedAt: string;
  };
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

// TODO: clean the stuff below

export interface QuestionState {
  [key: number]: {
    [key in MarketStateType]: symbol;
  };
}

export enum Currency {
  USD = '$',
  EUR = '€',
}

export type CurrencyTypes = keyof typeof Currency;

export enum MarketEntrypoint {
  Bid = 'bid',
  BuyYes = 'buyYes',
  BuyNo = 'buyNo',
  ClaimWinnings = 'claimWinnings',
  CloseAuction = 'closeAuction',
  CreateQuestion = 'createQuestion',
  WithdrawAuction = 'withdrawAuction',
}

export interface CreateQuestion {
  question: QuestionType;
  auctionEndDate: Date | string;
  marketCloseDate: Date | string;
  iconURL?: string;
  yesAnswer: string;
  rate?: number;
  quantity?: number;
}

export interface Bid {
  question: QuestionType;
  rate: number;
  quantity: number;
}

export interface BuyToken {
  tokenType: TokenType;
  question: QuestionType;
  quantity: number;
}

export interface CloseMarket {
  tokenType: TokenType;
  question: QuestionType;
}

export interface ClaimWinnings {
  question: QuestionType;
}

export interface QuestionMetaData extends CreateQuestion {
  hash: string;
}

export interface BidEntry {
  rate: number;
  quantity: number;
  total_token: number;
}

export type BidRegistry = MichelsonMap<string, BidEntry>;

export interface QuestionEntry {
  owner: string;
  state: QuestionState;
  auction_end: string;
  market_close: string;
  auction_bids: BidRegistry;
  uniswap_pool?: unknown;
  tokens: {
    yes_token_id: BigNumber;
    no_token_id: BigNumber;
    lqt_token_id: BigNumber;
  };
  answer?: string | null;
  winning_token?: BigNumber | null; // token that will receive the reward
  total_auction_quantity: BigNumber;
  yes_preference: BigNumber;
  uniswap_contribution_factor: BigNumber;
}

export interface AuctionData {
  yes: number;
  no: number;
  participants: number;
}

export interface AuctionDataMap {
  [key: string]: AuctionData;
}

export interface MarketFilter {
  auctions: boolean;
  allMarkets: boolean;
  openMarkets: boolean;
  closedMarkets: boolean;
  onlyMyMarkets: boolean;
}

/**
 * Temp middleware interfaces
 */

export interface BidEntryMDW {
  rate: string;
  quantity: string;
  total_token: string;
}

export interface BidRegistryMDW {
  [key: string]: BidEntryMDW;
}

export interface QuestionEntryMDW {
  owner: string;
  state: {
    [key in MarketStateType]?: null;
  };
  auction_end: string;
  market_close: string;
  auction_bids: BidRegistryMDW;
  uniswap_pool?: unknown;
  tokens: {
    yes_token_id: string;
    no_token_id: string;
    lqt_token_id: string;
  };
  answer?: string | null;
  winning_token?: string | null;
  total_auction_quantity: string;
  yes_preference: string;
  uniswap_contribution_factor: string;
  price_yes?: string;
}

export interface QuestionEntryMDWMap {
  [key: string]: QuestionEntryMDW;
}

export interface StableCoinResponse {
  [key: string]: string;
}

export interface LedgerBalanceResponse {
  [tokenId: string]: { [address: string]: string };
}

export interface ContractError {
  [key: number]: string;
}

export interface DropDownItems {
  label: string;
  value: string | number;
}
