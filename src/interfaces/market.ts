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
