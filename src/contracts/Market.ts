import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  OpKind,
  TezosToolkit,
  WalletContract,
  WalletParamsWithKind,
  MichelCodecPacker,
} from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { CreateMarket } from '../interfaces';
import { MARKET_ADDRESS, RPC_PORT, RPC_URL } from '../utils/globals';
import { multiplyUp } from '../utils/math';

/**
 * TODO: Move tezos init to different file
 */

let tezos: TezosToolkit;
let marketContract: WalletContract;
let fa12: WalletContract;

export const setWalletProvider = (wallet: BeaconWallet): void => {
  tezos && tezos.setProvider({ wallet });
};

export const initTezos = (url = RPC_URL, port: string | number = RPC_PORT): void => {
  tezos = new TezosToolkit(`${url}:${port}`);
  tezos.setPackerProvider(new MichelCodecPacker());
};

export const initMarketContract = async (marketAddress: string | null = null): Promise<void> => {
  if (!marketAddress || tezos === null) {
    throw new Error('Market contract address not set or Tezos not initialized');
  }
  marketContract = await tezos.wallet.at(marketAddress);
};

export const initFA12Contract = async (fa12Address: string | null = null): Promise<void> => {
  if (tezos === null || !fa12Address) {
    throw new Error('fa12 contract address not set or Tezos not initialized');
  }
  fa12 = await tezos.wallet.at(fa12Address);
};

export const getTokenAllowanceOps = async (
  userAddress: string,
  spenderAddress: string,
  newAllowance: number,
): Promise<WalletParamsWithKind[]> => {
  const batchOps: WalletParamsWithKind[] = [];
  const maxTokensDeposited = multiplyUp(newAllowance);
  const storage: any = await fa12.storage();
  const userLedger = await storage[0].get(userAddress);
  const currentAllowance = new BigNumber((await userLedger[1].get(spenderAddress)) ?? 0)
    .shiftedBy(-6)
    .toNumber();
  if (currentAllowance < newAllowance) {
    if (currentAllowance > 0) {
      batchOps.push({
        kind: OpKind.TRANSACTION,
        ...fa12.methods.approve(spenderAddress, 0).toTransferParams(),
      });
    }
    batchOps.push({
      kind: OpKind.TRANSACTION,
      ...fa12.methods.approve(spenderAddress, maxTokensDeposited).toTransferParams(),
    });
  }
  return batchOps;
};

export const getUserBalance = async (userAddress: string): Promise<number> => {
  const storage: any = await fa12.storage();
  const userLedger = await storage[0].get(userAddress);
  return userLedger[0] ?? 0;
};

/**
 * Market Contract Entry-points
 */

export const createMarket = async (props: CreateMarket, userAddress: string): Promise<string> => {
  const batchOps = await getTokenAllowanceOps(userAddress, MARKET_ADDRESS, props.initialBid);
  const batch = await tezos.wallet
    .batch([
      ...batchOps,
      {
        kind: OpKind.TRANSACTION,
        ...marketContract.methods.marketCreate(...Object.values(props)).toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...fa12.methods.approve(MARKET_ADDRESS, 0).toTransferParams(),
      },
    ])
    .send();
  return batch.opHash;
};

export const auctionBet = async (
  bid: number,
  contribution: number,
  marketId: string,
  userAddress: string,
): Promise<string> => {
  const batchOps = await getTokenAllowanceOps(userAddress, MARKET_ADDRESS, bid);
  const batch = await tezos.wallet
    .batch([
      ...batchOps,
      {
        kind: OpKind.TRANSACTION,
        ...marketContract.methods.auctionBet(marketId, bid, contribution).toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...fa12.methods.approve(MARKET_ADDRESS, 0).toTransferParams(),
      },
    ])
    .send();
  return batch.opHash;
};
