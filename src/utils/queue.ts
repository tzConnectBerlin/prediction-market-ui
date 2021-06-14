import { BlockResponse, OperationEntry, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

const DEFAULT_CONFIRMATION = 1;
const DEFAULT_BLOCK_TIME = 60000;
const DEFAULT_INTERVAL = 1000;
const DEFAULT_CHAIN_ID = 'main';
const DEFAULT_IDENTIFIER = 'default';

type QueueCallback = (tx?: OperationEntry[]) => void | Promise<void>;

interface CheckQueueArgs {
  client: RpcClient;
  blockToCheck?: string;
  identifier: string | string[];
  queue: string[];
  transaction: string;
  endTime: number;
  interval: number;
  callback: QueueCallback;
}

const getStorageIdentifier = (identifier: string | string[]): string => {
  const id = typeof identifier === 'object' ? identifier.join('-') : identifier;
  return `queue:${id}`;
};

const setQueue = (
  transactions: string[],
  identifier: string | string[] = DEFAULT_IDENTIFIER,
): void => {
  window.localStorage.setItem(getStorageIdentifier(identifier), JSON.stringify(transactions));
};

const inBlock = (block: BlockResponse, txHash: string) =>
  block.operations.find((item) => item.find((i) => i.hash === txHash));

const filterQueue = (
  block: BlockResponse,
  parsedQueue: string[],
  identifier: string | string[],
  callback: QueueCallback,
) => {
  const response = parsedQueue
    .map((tx: string) => {
      const txInfo = inBlock(block, tx)?.find((itm) => itm.hash === tx);
      if (txInfo) {
        const newQueue = parsedQueue.filter((o) => o !== txInfo.hash);
        setQueue(newQueue, identifier);
      }
      return txInfo;
    })
    .filter(Boolean) as OperationEntry[];
  return callback(response);
};

const checkQueue = async (args: CheckQueueArgs) => {
  const {
    client,
    blockToCheck = 'head',
    transaction,
    queue,
    callback,
    endTime,
    interval,
    identifier,
  } = args;
  const block: BlockResponse = await client.getBlock({ block: blockToCheck });
  const currentTime = new Date().getTime();
  if (inBlock(block, transaction)) {
    filterQueue(block, queue, identifier, callback);
    Promise.resolve();
  } else if (currentTime < endTime) {
    setTimeout(checkQueue, interval, args);
  } else if (currentTime >= endTime && blockToCheck === 'head') {
    /**
     * Only throw error when timeout has reached and we are not checking the head
     */
    throw new Error(
      `Transaction ${transaction} not found. Last block checked: ${block.header.level}`,
    );
  }
};

export const getPendingTransactions = (
  identifier: string | string[] = DEFAULT_IDENTIFIER,
): string[] => {
  const queue = window.localStorage.getItem(getStorageIdentifier(identifier));
  if (!queue) {
    setQueue([], identifier);
    return [];
  }
  return JSON.parse(queue);
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
  identifier: string | string[] = DEFAULT_IDENTIFIER,
  confirmations = DEFAULT_CONFIRMATION,
  chainId = DEFAULT_CHAIN_ID,
  interval = DEFAULT_INTERVAL,
  blockTime = DEFAULT_BLOCK_TIME,
): Promise<void> {
  const client = new RpcClient(RPC_URL, chainId);
  const parsedQueue = getPendingTransactions(identifier);

  if (transaction && parsedQueue.findIndex((i) => i === transaction) === -1) {
    parsedQueue.push(transaction);
    setQueue(parsedQueue);
  }

  const prevBlockHash = await client.getBlockHash({ block: 'head~1' });
  const timeout = confirmations * blockTime;
  const currentTime = new Date().getTime();
  const endTime = currentTime + timeout;

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
    identifier,
  };

  /**
   * Check last block once
   */
  checkQueue({ ...checkQueueArgs, endTime: currentTime, blockToCheck: prevBlockHash });

  return checkQueue(checkQueueArgs);
}
