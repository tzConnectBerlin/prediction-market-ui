export type QuestionType = string;
export interface CreateQuestion {
  question: QuestionType;
  auctionEndDate: Date;
  marketCloseDate: Date;
}

export interface Bid {
  question: QuestionType;
  rate: number;
  quantity: number;
}
