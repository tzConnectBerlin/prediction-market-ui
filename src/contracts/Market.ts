import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { Bid, BuyToken, CreateQuestion, QuestionType, WalletInstanceType } from '../interfaces';

const defaultRpcURL = 'https://delphinet.smartpy.io';
let tezos: TezosToolkit | null = null;
let marketContract: WalletContract | null = null;

export const setWalletProvider = (wallet: WalletInstanceType): void => {
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
    data.rate * 10 ** 18,
    data.quantity * 10 ** 18,
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
    data.quantity * 10 ** 18,
    data.deadline,
  ]);
  return hash;
};
