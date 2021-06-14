import { BlockResponse, OperationEntry, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

const DEFAULT_CONFIRMATION = 1;
const DEFAULT_BLOCK_TIME = 60000;
const DEFAULT_INTERVAL = 1000;
const DEFAULT_CHAIN_ID = 'main';

type QueueCallback = (tx?: OperationEntry[]) => void | Promise<void>;

interface CheckQueueArgs {
  client: RpcClient;
  blockToCheck?: string;
  queue: string[];
  transaction: string;
  endTime: number;
  interval: number;
  callback: QueueCallback;
}

const setQueue = (transactions: string[]): void => {
  window.localStorage.setItem('queue', JSON.stringify(transactions));
};

const inBlock = (block: BlockResponse, txHash?: string) =>
  block.operations.find((item) => item.find((i) => i.hash === txHash));

const filterQueue = (block: BlockResponse, parsedQueue: string[], callback: QueueCallback) => {
  const response = parsedQueue
    .map((tx: string) => {
      const txInfo = inBlock(block, tx)?.find((itm) => itm.hash === tx);
      if (txInfo) {
        parsedQueue.shift();
        setQueue(parsedQueue);
      }
      return txInfo;
    })
    .filter(Boolean) as OperationEntry[];

  return callback(response);
};

const checkQueue = async (args: CheckQueueArgs) => {
  const { client, blockToCheck = 'head', transaction, queue, callback, endTime, interval } = args;
  const block: BlockResponse = await client.getBlock({ block: blockToCheck });
  if (inBlock(block, transaction)) {
    filterQueue(block, queue, callback);
    Promise.resolve();
  } else if (Number(new Date()) < endTime) {
    setTimeout(checkQueue, interval, args);
  } else {
    throw new Error(`Transaction ${transaction} not in current block`);
  }
};

/**
 * Adds a transaction to the queue and checks if your queue has been added to the current block.
 * @param transaction the transaction hash
 * @param callback add in a callback function to use the full tx info
 * @param confirmations the number of blocks to check for before timing out.
 * @param chainId the id of your chain, likely main unless you are doing some testing
 * @param interval the polling interval, set to 1 second by default
 * @returns {void} no direct returns, callback to use the included tx info
 */
export async function queuedItems(
  transaction: string,
  callback: QueueCallback,
  confirmations = DEFAULT_CONFIRMATION,
  chainId = DEFAULT_CHAIN_ID,
  interval = DEFAULT_INTERVAL,
  blockTime = DEFAULT_BLOCK_TIME,
): Promise<void> {
  const client = new RpcClient(RPC_URL, chainId);
  const timeout = confirmations * blockTime;
  const endTime = new Date().getTime() + timeout;
  const queue = window.localStorage.getItem('queue');

  if (!queue) {
    setQueue([]);
  }
  const parsedQueue: string[] = queue ? JSON.parse(queue) : [];

  if (transaction && parsedQueue.findIndex((i) => i === transaction) === -1) {
    parsedQueue.push(transaction);
    setQueue(parsedQueue);
  }

  /**
   * Prepare arguments
   */
  const checkQueueArgs: CheckQueueArgs = {
    client,
    transaction,
    endTime,
    interval,
    callback,
    queue: parsedQueue,
  };

  /**
   * Check last block once
   */
  checkQueue({ blockToCheck: 'head~1', ...checkQueueArgs });

  return checkQueue(checkQueueArgs);
}
