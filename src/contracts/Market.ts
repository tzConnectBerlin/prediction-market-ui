import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { Bid, CreateQuestion, WalletInstanceType } from '../interfaces';

const defaultRpcURL = 'https://delphinet.smartpy.io';
let tezos: TezosToolkit | null = null;
let marketContract: WalletContract | null = null;

const executeMethod = async (methodName: string, args: unknown[] = [['Unit']]): Promise<string> => {
  console.log('form data:', methodName, args);
  if (!marketContract) {
    throw new Error('Market contract not initialized');
  }
  try {
    const op = await marketContract.methods[methodName](...args).send();
    return op.opHash;
  } catch (error) {
    console.log(await error);
    return 'error';
  }
};

export const initMarketContract = async (marketAddress: string | null = null): Promise<void> => {
  if (!marketAddress || tezos === null) {
    throw new Error('Market contract address not set or Tezos not initialized');
  }
  marketContract = await tezos.wallet.at(marketAddress);
};

export const setWalletProvider = (wallet: WalletInstanceType): void => {
  tezos && tezos.setProvider({ wallet });
};

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

export const initTezos = (url = defaultRpcURL, port: string | number = 443): void => {
  tezos = new TezosToolkit(`${url}:${port}`);
};
