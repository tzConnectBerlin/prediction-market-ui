import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { CreateQuestion, WalletInstanceType } from '../interfaces';

const defaultRpcURL = 'https://delphinet.smartpy.io';
let tezos: any = null;
let marketContract: WalletContract | null = null;

const executeMethod = async (methodName: string, args: any[] = [['Unit']]): Promise<string> => {
  if (!marketContract) {
    throw new Error('Market contract not initialized');
  }
  const op = await marketContract.methods[methodName](...args).send();
  return op.opHash;
};

export const initMarketContract = async (marketAddress: string | null = null): Promise<void> => {
  if (!marketAddress) {
    throw new Error('Market contract address not set');
  }
  marketContract = await tezos.wallet.at(marketAddress);
};

export const setWalletProvider = (wallet: WalletInstanceType): void => {
  tezos.setProvider({ wallet });
};

export const createQuestion = async (data: CreateQuestion): Promise<string> => {
  const hash = await executeMethod('createQuestion', [
    data.question,
    data.auctionEndDate,
    data.marketCloseDate,
  ]);
  return hash;
};

export const initTezos = (url = defaultRpcURL, port: string | number = 443): void => {
  tezos = new TezosToolkit(`${url}:${port}`);
};
