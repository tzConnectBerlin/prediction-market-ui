import { MichelsonMap } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';

export type QuestionType = string;

export enum QuestionStateType {
  questionAuctionOpen = 'questionAuctionOpen',
  questionAuctionWithdrawOpen = 'questionAuctionWithdrawOpen',
  questionMarketClosed = 'questionMarketClosed',
}

export interface QuestionState {
  [key: number]: {
    [key in QuestionStateType]: symbol;
  };
}

export enum TokenType {
  yes = 'Yes',
  no = 'No',
  both = 'Both',
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
    [key in QuestionStateType]?: null;
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

export interface MarketCardStatistic {
  type: string;
  value: string | number;
  changes?: string;
  currency?: Currency;
  tokenType?: TokenType;
}

export interface MarketCardToken {
  type: TokenType;
  value: number;
}

export interface MarketCardData {
  question: string;
  state: string;
  marketCloseDate: Date | string;
  auctionEndDate: Date | string;
  yesAnswer?: string;
  yesPrice: number;
  hash: string;
  iconURL: string;
  tokens: MarketCardToken[];
  statistics: MarketCardStatistic[];
}

export interface DropDownItems {
  label: string;
  value: string | number;
}
