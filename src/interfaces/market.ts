import { BigNumber } from 'bignumber.js';

export type QuestionType = string;

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

export interface QuestionEntry {
  owner: string;
  state: unknown;
  auction_end: string;
  market_close: string;
  auction_bids: unknown;
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

export interface YesNoPrice {
  yes: number;
  no: number;
}
