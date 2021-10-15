/* eslint-disable @typescript-eslint/no-explicit-any */
import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  OpKind,
  TezosToolkit,
  WalletContract,
  WalletParamsWithKind,
  MichelCodecPacker,
  ContractProvider,
  ContractAbstraction,
  ParamsWithKind,
} from '@taquito/taquito';
import { add } from 'date-fns';
import { InMemorySigner } from '@taquito/signer';
import { CreateMarket, MarketEnterExitDirection, TokenType } from '../interfaces';
import { FA12_CONTRACT, MARKET_ADDRESS, RPC_PORT, RPC_URL, TORUS_ENABLED } from '../globals';
import { getSavedSettings } from '../utils/misc';
import { closePositionBoth } from './MarketCalculations';

type SupportedContract = WalletContract | ContractAbstraction<ContractProvider>;

let tezos: TezosToolkit;
let marketContract: SupportedContract;
let fa12: SupportedContract;
let batchHandler: any;

export const setWalletProvider = (wallet: BeaconWallet): void => {
  tezos && tezos.setProvider({ wallet });
};

export const setSigner = async (secretKey?: string): Promise<void> => {
  tezos.setSignerProvider(secretKey ? await InMemorySigner.fromSecretKey(secretKey) : undefined);
};

export const initTezos = (url = RPC_URL, port: string | number = RPC_PORT): void => {
  tezos = new TezosToolkit(`${url}:${port}`);
  tezos.setPackerProvider(new MichelCodecPacker());
  if (TORUS_ENABLED) {
    batchHandler = tezos.contract;
  } else {
    batchHandler = tezos.wallet;
  }
};

export const initMarketContract = async (marketAddress: string | null = null): Promise<void> => {
  if (!marketAddress || tezos === null) {
    throw new Error('Market contract address not set or Tezos not initialized');
  }
  if (!marketContract) {
    if (TORUS_ENABLED) {
      marketContract = await tezos.contract.at(marketAddress);
    } else {
      marketContract = await tezos.wallet.at(marketAddress);
    }
  }
};

export const initFA12Contract = async (fa12Address: string | null = null): Promise<void> => {
  if (tezos === null || !fa12Address) {
    throw new Error('fa12 contract address not set or Tezos not initialized');
  }
  if (!fa12) {
    if (TORUS_ENABLED) {
      fa12 = await tezos.contract.at(fa12Address);
    } else {
      fa12 = await tezos.wallet.at(fa12Address);
    }
  }
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
): Promise<ParamsWithKind[] | WalletParamsWithKind[]> => {
  const batchOps = TORUS_ENABLED ? new Array<ParamsWithKind>() : new Array<WalletParamsWithKind>();
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
  await initFA12Contract(FA12_CONTRACT);
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
  const batch = await batchHandler
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
  return batch?.opHash ?? batch?.hash ?? '';
};

export const auctionBet = async (
  bid: number,
  contribution: number,
  marketId: string,
  userAddress: string,
): Promise<string> => {
  const batchOps = await getTokenAllowanceOps(userAddress, MARKET_ADDRESS, contribution);
  const executionDeadLine = getExecutionDeadline();
  const batch = await batchHandler
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
  return batch?.opHash ?? batch?.hash ?? '';
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
  const batchOps: any = await getTokenAllowanceOps(userAddress, MARKET_ADDRESS, amount);
  const batch: any = await batchHandler
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
  return batch?.opHash ?? batch?.hash ?? '';
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
        toSwap,
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

export const basicAddLiquidity = async (
  marketId: string,
  amount: number,
  yesTokensMoved: number,
  noTokensMoved: number,
  userAddress: string,
  slippage: number,
): Promise<string> => {
  const minSwap = (token: number) => slippage && Math.ceil(token - (token * slippage) / 100);
  const executionDeadLine = getExecutionDeadline();
  const tradeOp = await marketContract.methods.marketEnterExit(
    executionDeadLine,
    marketId,
    'mint',
    'unit',
    amount,
  );
  const liquidityOp = await marketContract.methods.addLiquidity(
    executionDeadLine,
    marketId,
    yesTokensMoved,
    noTokensMoved,
    minSwap(yesTokensMoved),
    minSwap(noTokensMoved),
  );
  const batchOps = await getTokenAllowanceOps(userAddress, MARKET_ADDRESS, amount);
  const batch = await batchHandler
    .batch([
      ...batchOps,
      {
        kind: OpKind.TRANSACTION,
        ...tradeOp.toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...liquidityOp.toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...fa12.methods.approve(MARKET_ADDRESS, 0).toTransferParams(),
      },
    ])
    .send();
  return batch?.opHash ?? batch?.hash ?? '';
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
  const batch = await batchHandler
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
  return batch?.opHash ?? batch?.hash ?? '';
};

export const swapTokens = async (
  marketId: string,
  amount: number,
  swapSlippage: number,
  tokenType: TokenType,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const swapOp: any = await marketContract.methods
    .swapTokens(executionDeadLine, marketId, tokenType.toLowerCase(), '', amount, swapSlippage)
    .send();

  return swapOp?.opHash ?? swapOp;
};

export const addLiquidity = async (
  marketId: string,
  yesTokensMoved: number,
  noTokensMoved: number,
  minYesTokensMoved: number,
  minNoTokensMoved: number,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const op: any = await marketContract.methods
    .addLiquidity(
      executionDeadLine,
      marketId,
      yesTokensMoved,
      noTokensMoved,
      minYesTokensMoved,
      minNoTokensMoved,
    )
    .send();
  return op?.opHash ?? op?.hash ?? '';
};

export const removeLiquidity = async (
  marketId: string,
  lqtTokens: number,
  minYesTokensMoved: number,
  minNoTokensMoved: number,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const op: any = await marketContract.methods
    .removeLiquidity(executionDeadLine, marketId, lqtTokens, minYesTokensMoved, minNoTokensMoved)
    .send();
  return op?.opHash ?? op?.hash ?? '';
};

export const basicRemoveLiquidity = async (
  marketId: string,
  lqtTokens: number,
  minYesTokensMoved: number,
  minNoTokensMoved: number,
  userAddress: string,
  tokenToSwap: string,
  pools: { aPool: number; bPool: number; aHoldings: number; bHoldings: number },
  slippage: number,
): Promise<string> => {
  const executionDeadLine = getExecutionDeadline();
  const exitOp = marketContract.methods.removeLiquidity(
    executionDeadLine,
    marketId,
    lqtTokens,
    minYesTokensMoved,
    minNoTokensMoved,
  );
  const { aToSwap, aLeft } = closePositionBoth(
    pools.aPool,
    pools.bPool,
    pools.aHoldings,
    pools.bHoldings,
  );
  const swapOp = marketContract.methods.swapTokens(
    executionDeadLine,
    marketId,
    tokenToSwap.toLowerCase(),
    'unit',
    Math.ceil(aToSwap),
    slippage,
  );

  const tradeOp = marketContract.methods.marketEnterExit(
    executionDeadLine,
    marketId,
    'burn',
    'unit',
    Math.ceil(aLeft),
  );
  const batchOps = await getTokenAllowanceOps(
    userAddress,
    MARKET_ADDRESS,
    Math.ceil(pools.aHoldings),
  );
  const batch = await batchHandler
    .batch([
      ...batchOps,
      {
        kind: OpKind.TRANSACTION,
        ...exitOp.toTransferParams(),
      },
      {
        kind: OpKind.TRANSACTION,
        ...swapOp.toTransferParams(),
      },
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
  return batch?.opHash ?? batch?.hash ?? '';
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
  const op: any = await marketContract.methods.auctionWithdraw(marketId).send();
  return op?.opHash ?? op?.hash ?? '';
};

export const claimWinnings = async (marketId: string): Promise<string> => {
  const op: any = await marketContract.methods.claimWinnings(marketId).send();
  return op?.opHash ?? op?.hash ?? '';
};

export const resolveMarket = async (marketId: string, token: TokenType): Promise<string> => {
  const op: any = await marketContract.methods
    .marketResolve(marketId, token.toLowerCase(), 'unit')
    .send();
  return op?.opHash ?? op?.hash ?? '';
};
