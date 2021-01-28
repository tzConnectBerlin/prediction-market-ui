import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit, WalletContract } from '@taquito/taquito';
import {
  Bid,
  BuyToken,
  ClaimWinnings,
  CreateQuestion,
  QuestionEntry,
  QuestionType,
} from '../interfaces';
import { multiplyUp } from '../utils/math';

/**
 * TODO: Move tezos init to different file
 */

const defaultRpcURL = 'https://delphinet.smartpy.io';
let tezos: TezosToolkit | null = null;
let marketContract: WalletContract | null = null;

export const getCurrentMarketAddress = (): string | undefined => {
  return marketContract?.address;
};

export const setWalletProvider = (wallet: BeaconWallet): void => {
  tezos && tezos.setProvider({ wallet });
};

export const initTezos = (url = defaultRpcURL, port: string | number = 443): void => {
  tezos = new TezosToolkit(`${url}:${port}`);
};

/**
 * Market Contract Helpers
 */
const executeMethod = async (methodName: string, args: unknown[] = [['Unit']]): Promise<string> => {
  if (!marketContract) {
    throw new Error('Market contract not initialized');
  }
  const op = await marketContract.methods[methodName](...args).send();
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
  const hash = await executeMethod(`buy${data.tokenType}`, [
    data.question,
    multiplyUp(data.quantity),
    data.deadline,
  ]);
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
