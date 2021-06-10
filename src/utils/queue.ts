import { BlockResponse, OperationEntry, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

type QueueCallback = (tx?: OperationEntry[]) => void | Promise<void> | OperationEntry[] | undefined;

export const setQueue = (transactions: string[]): void => {
  window.localStorage.setItem('queue', JSON.stringify(transactions));
};

export const inBlock = (block: BlockResponse, txHash?: string): OperationEntry[] | undefined =>
  block.operations.find((item) => item.find((i) => i.hash === txHash));

export const filterQueue = (
  block: BlockResponse,
  parsedQueue: string[],
  callback: QueueCallback,
): void | Promise<void> | OperationEntry[] | undefined => {
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
  confirmations = 1,
  chainId = 'main',
  interval = 1000,
): Promise<void | OperationEntry[]> {
  const client = new RpcClient(RPC_URL, chainId);
  const timeout = confirmations * 60000;
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

  const checkQueue = async (resolve: (filter: void) => void, reject: (reason: void) => void) => {
    const block: BlockResponse = await client.getBlock();
    if (inBlock(block, transaction)) {
      filterQueue(block, parsedQueue, callback);
      resolve();
    } else if (Number(new Date()) < endTime) {
      setTimeout(checkQueue, interval, resolve, reject);
    } else {
      reject(console.log(`transaction ${transaction} not in current block`));
    }
  };

  return new Promise(checkQueue);
}
