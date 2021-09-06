import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  OpKind,
  TezosToolkit,
  WalletContract,
  WalletParamsWithKind,
  MichelCodecPacker,
} from '@taquito/taquito';
import { add } from 'date-fns';
import { CreateMarket, MarketEnterExitDirection, TokenType } from '../interfaces';
import { MARKET_ADDRESS, RPC_PORT, RPC_URL } from '../globals';
import { getSavedSettings } from '../utils/misc';

let tezos: TezosToolkit;
let marketContract: WalletContract;
let fa12: any;

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

const getExecutionDeadline = (): string => {
  const settings = getSavedSettings();
  const timeout = settings?.deadline ?? 30;
  return add(new Date(), {
    minutes: timeout,
  }).toISOString();
};

export const getTokenAllowanceOps = async (
  userAddress: string,
  spenderAddress: string,
  newAllowance: number,
): Promise<WalletParamsWithKind[]> => {
  const batchOps: WalletParamsWithKind[] = [];
  const storage: any = await fa12.storage();
  const userLedger = await storage.balances.get(userAddress);
  const currentAllowance = (await userLedger.approvals.get(spenderAddress)) ?? 0;
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
  const userLedger = await storage.balances.get(userAddress);
  if (!userLedger || !userLedger.balance) {
    return 0;
  }
  return userLedger.balance.toNumber();
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
  const {
    marketId,
    ipfsHash,
    description,
    adjudicator,
    tokenType,
    tokenAddress,
    auctionEnd,
    initialContribution,
    initialBid,
  } = props;
  const executionDeadLine = getExecutionDeadline();
  const batch = await tezos.wallet
    .batch([
      ...batchOps,
      {
        kind: OpKind.TRANSACTION,
        ...marketContract.methods
          .marketCreate(
            executionDeadLine,
            marketId,
            ipfsHash,
            description,
            adjudicator,
            tokenType,
            tokenAddress,
            auctionEnd,
            initialBid,
            initialContribution,
          )
          .toTransferParams(),
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
  const executionDeadLine = getExecutionDeadline();
  const batch = await tezos.wallet
    .batch([
      ...batchOps,
      {
        kind: OpKind.TRANSACTION,
        ...marketContract.methods
          .auctionBet(executionDeadLine, marketId, bid, contribution)
          .toTransferParams(),
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
  swapSlippage: number,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const tradeOp = marketContract.methods.marketEnterExit(
    executionDeadLine,
    marketId,
    'mint',
    'unit',
    amount,
  );
  const tokenToSwap = tokenType === TokenType.yes ? TokenType.no : TokenType.yes;
  const swapOp = marketContract.methods.swapTokens(
    executionDeadLine,
    marketId,
    tokenToSwap.toLowerCase(),
    'unit',
    amount,
    swapSlippage,
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
  toSwap: number,
  swapSlippage: number,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const tradeOp = marketContract.methods.marketEnterExit(
    executionDeadLine,
    marketId,
    'burn',
    'unit',
    amount,
  );
  const swapOp = toSwap
    ? marketContract.methods.swapTokens(
        executionDeadLine,
        marketId,
        tokenType.toLowerCase(),
        'unit',
        amount,
        swapSlippage,
      )
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

export const mintBurnTokens = async (
  marketId: string,
  amount: number,
  userAddress: string,
  direction: MarketEnterExitDirection,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const tradeOp = marketContract.methods.marketEnterExit(
    executionDeadLine,
    marketId,
    direction,
    '',
    amount,
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
        ...fa12.methods.approve(MARKET_ADDRESS, 0).toTransferParams(),
      },
    ])
    .send();
  return batch.opHash;
};

export const addLiquidity = async (
  marketId: string,
  yesTokensMoved: number,
  noTokensMoved: number,
  minYesTokensMoved: number,
  minNoTokensMoved: number,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const op = await marketContract.methods
    .addLiquidity(
      executionDeadLine,
      marketId,
      yesTokensMoved,
      noTokensMoved,
      minYesTokensMoved,
      minNoTokensMoved,
    )
    .send();
  return op.opHash;
};

export const removeLiquidity = async (
  marketId: string,
  lqtTokens: number,
  minYesTokensMoved: number,
  minNoTokensMoved: number,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const op = await marketContract.methods
    .removeLiquidity(executionDeadLine, marketId, lqtTokens, minYesTokensMoved, minNoTokensMoved)
    .send();
  return op.opHash;
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
