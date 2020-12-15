import { TezosToolkit, WalletContract } from '@taquito/taquito';
import { CreateQuestion } from '../interfaces';

const MarketAddress = 'KT1KBZwpuVEQbEGcKS28cJC24iNsw8QL5rqB';
// const FA12 = 'KT1JR5V4BCxfJSfCPrPVxBx45Y9oUiqjDzSm';
const RPC_URL = 'https://delphinet.smartpy.io:443';

const tezos = new TezosToolkit(RPC_URL);

export const getMarketContract = async (): Promise<WalletContract> => {
  const contract = await tezos.wallet.at(MarketAddress);
  return contract;
};

export const setWallet = (wallet: any) => {
  tezos.setProvider({ wallet });
};

export const createQuestion = async (data: CreateQuestion) => {
  const contract = await getMarketContract();
  const op = await contract.methods
    .createQuestion(data.question, data.auctionEndDate, data.marketCloseDate)
    .send();
  console.log(op.opHash);
};
