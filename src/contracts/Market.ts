import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import {
  Bid,
  BuyToken,
  ClaimWinnings,
  ContractError,
  CreateQuestion,
  QuestionEntry,
  QuestionType,
  TokenType,
} from '../interfaces';
import { RPC_PORT, RPC_URL } from '../utils/globals';
import { multiplyUp } from '../utils/math';

/**
 * TODO: Move tezos init to different file
 */

let tezos: TezosToolkit | null = null;
let marketContract: WalletContract | null = null;

export const getCurrentMarketAddress = (): string | undefined => {
  return marketContract?.address;
};

export const setWalletProvider = (wallet: BeaconWallet): void => {
  tezos && tezos.setProvider({ wallet });
};

export const initTezos = (url = RPC_URL, port: string | number = RPC_PORT): void => {
  tezos = new TezosToolkit(`${url}:${port}`);
};

/**
 * Market Contract Helpers
 */
const executeMethod = async (
  methodName: string,
  args: unknown[] = [['Unit']],
  confirmation = 0,
): Promise<string> => {
  if (!marketContract) {
    throw new Error('Market contract not initialized');
  }
  const op = await marketContract.methods[methodName](...args).send();
  confirmation && (await op.confirmation(confirmation));
  return op.opHash;
};

export const initMarketContract = async (marketAddress: string | null = null): Promise<void> => {
  if (!marketAddress || tezos === null) {
    throw new Error('Market contract address not set or Tezos not initialized');
  }
  marketContract = await tezos.wallet.at(marketAddress);
};

/**
 * Market Contract Entry-points
 */

export const createQuestion = async (data: CreateQuestion): Promise<string> => {
  const hash = await executeMethod('createQuestion', [
    data.question,
    data.auctionEndDate,
    data.marketCloseDate,
    multiplyUp(data.rate!),
    multiplyUp(data.quantity!),
  ]);
  return hash;
};

export const createBid = async (data: Bid): Promise<string> => {
  const hash = await executeMethod('bid', [
    data.question,
    multiplyUp(data.rate),
    multiplyUp(data.quantity),
  ]);
  return hash;
};

export const closeAuction = async (question: QuestionType): Promise<string> => {
  const hash = await executeMethod('closeAuction', [question]);
  return hash;
};

export const withdrawAuctionWinnings = async (question: QuestionType): Promise<string> => {
  const hash = await executeMethod('withdrawAuction', [question]);
  return hash;
};

export const buyToken = async (data: BuyToken): Promise<string> => {
  const hash = await executeMethod('buyToken', [
    data.question,
    data.tokenType === TokenType.yes,
    multiplyUp(data.quantity),
  ]);
  return hash;
};

export const swapToken = async (data: BuyToken, confirmation = 0): Promise<string> => {
  const hash = await executeMethod(
    'swap',
    [data.question, data.tokenType === TokenType.yes, data.quantity],
    confirmation,
  );
  return hash;
};

export const burnToken = async (
  question: string,
  quantity: number,
  confirmation = 0,
): Promise<string> => {
  const hash = await executeMethod('burn', [question, multiplyUp(quantity)], confirmation);
  return hash;
};

export const batchSwapBurn = async (
  swapData: BuyToken,
  burnQuantity: number,
): Promise<string | undefined> => {
  const op = await tezos?.wallet
    .batch()
    .withContractCall(
      marketContract!.methods.swap(
        swapData.question,
        swapData.tokenType === TokenType.yes,
        swapData.quantity,
      ),
    )
    .withContractCall(marketContract!.methods.burn(swapData.question, multiplyUp(burnQuantity)))
    .send();
  return op?.opHash;
};

export const swapAndBurn = async (swapData: BuyToken, burnQuantity: number): Promise<string> => {
  await swapToken(swapData, 1);
  const hash = await burnToken(swapData.question, burnQuantity);
  return hash;
};

export const claimWinnings = async (data: ClaimWinnings): Promise<string> => {
  const hash = await executeMethod('claimWinnings', [data.winningToken, data.question]);
  return hash;
};

interface QuestionEntryMap {
  [key: string]: QuestionEntry;
}

export const getQuestionData = async (hashes: string[]): Promise<QuestionEntryMap> => {
  const storage: any = await marketContract?.storage();
  const emptyQuestions: QuestionEntryMap = {};
  if (storage) {
    return hashes.reduce(async (previousValue: Promise<QuestionEntryMap>, item: string) => {
      let acc = await previousValue;
      const questionData: QuestionEntry = await storage.questions.get(item);
      acc = { ...acc, [item]: questionData };
      return acc;
    }, Promise.resolve(emptyQuestions));
  }
  return Promise.resolve(emptyQuestions);
};

export const MarketErrors: ContractError = {
  1: 'ONLY OWNER OR MANAGER',
  2: 'UNISWAP NOT FOUND',
  3: 'UNISWAP NOT SET',
  4: 'TOKENS NOT FOUND',
  5: 'QUESTION ALREADY EXISTS',
  6: 'QUESTION NOT FOUND',
  7: 'DATE SHOULD ALWAYS BE IN FUTURE',
  8: 'MARKET CLOSE DATE SHOULD ALWAYS BE IN FUTURE',
  9: 'MARKET CLOSE CANNOT BE LE AUCTION END',
  10: 'CAN NOT SUBMIT BID AFTER AUCTION HAS ENDED',
  11: 'INVALID RATE',
  12: 'AUCTION CAN ONLY BE CLOSED AFTER AUCTION END DATE',
  13: 'MARKET CAN ONLY BE CLOSED AFTER MARKET CLOSE DATE',
  14: 'BUY REQUEST CAN NOT BE COMPLETED',
  15: 'INVALID WINNING TOKEN',
  16: 'TOKEN ALREADY INITIALIZED',
  17: 'TOKENS CAN ONLY BE CLAIMED AFTER AUCTION END',
  18: 'MARKET MUST BE CLOSED',
  19: 'INSUFFICIENT TOKENS WHEN CREATING MARKET',
  20: 'AUCTION SHOULD BE CLOSED BEFORE CALLING WITHDARW',
  21: 'TOKENS CANNOT BE BOUGHT BEFORE AUCTION CLOSE OR AFTER MARKET CLOSE',
  101: 'ACCOUNT NOT FOUND',
  102: 'TOKEN OUT MUST BE GREATER THAN OR EQUAL TO MIN TOKENS',
  151: 'TOKEN IN MUST BE LESS THAN OR EQUAL TO MAX TOKENS',
  103: 'AMOUNT MUST BE ZERO',
  104: 'MUST BE MANAGER',
  105: 'THE CURRENT TIME MUST BE LESS THAN THE DEADLINE',
  106: 'TOKEN POOL MUST BE GREATER THAN ZERO',
  108: 'EXACT TOKENS SELL MUST BE GREATER THAN ZERO',
  109: 'MIN TOKENS BOUGHT MUST BE GREATER THAN ZERO',
  120: 'TOKEN AMOUNT SPECIFIED MUST BE GREATER THAN ZERO',
  110: 'ASKED RATE CANNOT BE MET',
  200: 'STABLECOIN CONTRACT DOES NOT SUPPORT TRANSFER METHOD',
  1001: 'NEGATIVE RESULT',
  1002: 'DIVIDE BY ZERO',
};
