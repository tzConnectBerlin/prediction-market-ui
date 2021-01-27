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
}

export enum MarketEntrypoint {
  Bid = 'bid',
  BuyYes = 'buyYes',
  BuyNo = 'buyNo',
  ClaimWinnings = 'claimWinnings',
  CloseAuction = 'closeAuction',
  CloseMarket = 'closeMarket',
  CreateQuestion = 'createQuestion',
  WithdrawAuction = 'withdrawAuction',
}

export interface CreateQuestion {
  question: QuestionType;
  auctionEndDate: Date;
  marketCloseDate: Date;
  iconURL?: string;
  yesAnswer: string;
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
  deadline: Date;
}

export interface CloseMarket {
  question: QuestionType;
  answer: string;
  winningToken: number;
}

export interface ClaimWinnings {
  question: QuestionType;
  winningToken: number;
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
}
