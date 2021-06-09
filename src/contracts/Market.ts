import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  OpKind,
  TezosToolkit,
  WalletContract,
  WalletParamsWithKind,
  MichelCodecPacker,
} from '@taquito/taquito';
import { CreateMarket, MarketTradeType, TokenType } from '../interfaces';
import { MARKET_ADDRESS, RPC_PORT, RPC_URL } from '../utils/globals';

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
  const storage: any = await fa12.storage();
  const userLedger = await storage[0].get(userAddress);
  const currentAllowance = (await userLedger[1].get(spenderAddress)) ?? 0;
  if (currentAllowance < newAllowance) {
    if (currentAllowance > 0) {
      batchOps.push({
        kind: OpKind.TRANSACTION,
        ...fa12.methods.approve(spenderAddress, 0).toTransferParams(),
      });
    }
    batchOps.push({
      kind: OpKind.TRANSACTION,
      ...fa12.methods.approve(spenderAddress, newAllowance).toTransferParams(),
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
  const batchOps = await getTokenAllowanceOps(
    userAddress,
    MARKET_ADDRESS,
    props.initialContribution,
  );
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
  const batchOps = await getTokenAllowanceOps(userAddress, MARKET_ADDRESS, contribution);
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

export const buyTokens = async (
  tokenType: TokenType,
  marketId: string,
  amount: number,
  userAddress: string,
): Promise<string> => {
  const tradeOp = marketContract.methods.marketEnterExit(
    MarketTradeType.buy,
    'unit',
    marketId,
    amount,
  );
  const tokenToSwap = tokenType === TokenType.yes ? TokenType.no : TokenType.yes;
  const swapOp = marketContract.methods.swapTokens(
    tokenToSwap.toLowerCase(),
    'unit',
    marketId,
    amount,
    0,
  );
  const batchOps = await getTokenAllowanceOps(userAddress, MARKET_ADDRESS, amount);
  const batch = await tezos.wallet
    .batch([
      ...batchOps,
      {
        kind: OpKind.TRANSACTION,
        ...tradeOp.toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...swapOp.toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...fa12.methods.approve(MARKET_ADDRESS, 0).toTransferParams(),
      },
    ])
    .send();
  return batch.opHash;
};

export const sellTokens = async (
  tokenType: TokenType,
  marketId: string,
  amount: number,
  toSwap?: number,
): Promise<string> => {
  const tradeOp = marketContract.methods.marketEnterExit(
    MarketTradeType.sell,
    'unit',
    marketId,
    amount,
  );
  const tokenToSwap = tokenType === TokenType.yes ? TokenType.no : TokenType.yes;
  const swapOp = toSwap
    ? marketContract.methods.swapTokens(tokenToSwap.toLowerCase(), 'unit', marketId, toSwap, 0)
    : undefined;
  const ops: WalletParamsWithKind[] = [];
  if (swapOp) {
    ops.push({
      kind: OpKind.TRANSACTION,
      ...swapOp.toTransferParams(),
    });
  }
  const batch = tezos.wallet.batch([
    ...ops,
    {
      kind: OpKind.TRANSACTION,
      ...tradeOp.toTransferParams(),
    },
  ]);
  const tx = await batch.send();
  return tx.opHash;
};

export const closeAuction = async (marketId: string, withdraw?: boolean): Promise<string> => {
  const batch: WalletParamsWithKind[] = [
    {
      kind: OpKind.TRANSACTION,
      ...marketContract.methods.auctionClear(marketId).toTransferParams(),
    },
  ];
  if (withdraw) {
    batch.push({
      kind: OpKind.TRANSACTION,
      ...marketContract.methods.auctionWithdraw(marketId).toTransferParams(),
    });
  }
  const tx = await tezos.wallet.batch(batch).send();
  return tx.opHash;
};

export const withdrawAuction = async (marketId: string): Promise<string> => {
  const op = await marketContract.methods.auctionWithdraw(marketId).send();
  return op.opHash;
};

export const claimWinnings = async (marketId: string): Promise<string> => {
  const op = await marketContract.methods.claimWinnings(marketId).send();
  return op.opHash;
};

export const resolveMarket = async (marketId: string, token: TokenType): Promise<string> => {
  const op = await marketContract.methods
    .marketResolve(marketId, token.toLowerCase(), 'unit')
    .send();
  return op.opHash;
};
