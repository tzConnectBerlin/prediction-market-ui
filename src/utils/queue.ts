import { BlockResponse, OperationEntry, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

export const setQueue = (transactions: string[]): void => {
  window.localStorage.setItem('queue', JSON.stringify(transactions));
};
/**
 * Adds a transaction to the queue and checks if your queue has been added to the current block.
 * @param transaction the transaction hash
 * @param chainId the id of your chain, likely main unless you are doing some testing
 * @param confirmations the number of blocks to check for before timing out.
 * @param interval the polling interval, set to 1 second by default
 * @param callback add in a callback function to use the full tx info
 * @returns {void} no direct returns, only logging or callback to use the included tx info
 */
export async function queuedItems(
  transaction?: string,
  chainId = 'main',
  confirmations = 1,
  interval = 1000,
  callback?: (tx: OperationEntry) => void,
): Promise<void> {
  const client = new RpcClient(RPC_URL, chainId);
  const timeout = confirmations * 60000;

  const endTime = Number(new Date()) + (timeout || 120000);

  const queue = window.localStorage.getItem('queue');
  if (!queue) {
    setQueue([]);
  }
  const parsedQueue: string[] = (queue && JSON.parse(queue)) ?? [];

  const inBlock = (block: BlockResponse, txHash?: string) =>
    block.operations.find((item) => item.find((i) => i.hash === txHash));

  const filterQueue = (block: BlockResponse) => {
    parsedQueue.forEach((tx: string) => {
      // check to see if transactions in queue are already in block
      // pop from queue if they are
      const txInfo = inBlock(block, tx)?.find((itm) => itm.hash === tx);
      if (txInfo) {
        callback
          ? callback(txInfo)
          : console.log(`transaction ${tx} included in block ${block.hash}`);
        parsedQueue.shift();
        setQueue(parsedQueue);
      }
    });
  };

  if (transaction && parsedQueue.findIndex((i) => i === transaction) === -1) {
    parsedQueue.push(transaction);
    setQueue(parsedQueue);
  }

  const checkQueue = async (resolve: (filter: void) => void, reject: (reason: void) => void) => {
    const block: BlockResponse = await client.getBlock();

    if (inBlock(block, transaction)) {
      resolve(filterQueue(block));
    } else if (Number(new Date()) < endTime) {
      setTimeout(checkQueue, interval, resolve, reject);
    } else {
      reject(console.log(`transaction ${transaction} not in current block`));
    }
  };

  return new Promise(checkQueue);
}
