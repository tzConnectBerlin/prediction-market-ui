import { BlockResponse, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

export async function queuedItems(
  transaction?: string,
  confirmations = 1,
  interval = 1000,
): Promise<string> {
  const client = new RpcClient(RPC_URL, 'main');
  const timeout = confirmations * 60000;
  const storage = window.localStorage;
  const endTime = Number(new Date()) + (timeout || 120000);

  const setQueue = (transactions: string[]) => {
    storage.setItem('queue', JSON.stringify(transactions));
  };

  const queue = storage.getItem('queue');
  if (!queue) {
    setQueue([]);
  }
  const parsedQueue: string[] = (queue && JSON.parse(queue)) ?? [];

  const filterQueue = (block: BlockResponse) => {
    parsedQueue.forEach((tx: string) => {
      // check to see if transactions in queue are already in block
      // pop from queue if they are
      const included = block.operations.find((item) => item.find((itm) => itm.hash === tx));
      if (included?.find((itm) => itm.hash === tx)) {
        console.log(`transaction ${tx} included in block ${block.hash}`);
        parsedQueue.shift();
        setQueue(parsedQueue);
      }
    });
  };

  if (transaction) {
    if (parsedQueue.findIndex((i) => i === transaction) === -1) {
      parsedQueue.push(transaction);
      setQueue(parsedQueue);
    }
  }

  const checkQueue = async (resolve: any, reject: any) => {
    const block: BlockResponse = await client.getBlock();
    const inBlock = block.operations.find((item) => item.find((i) => i.hash === transaction));

    if (inBlock) {
      resolve(filterQueue(block));
    } else if (Number(new Date()) < endTime) {
      setTimeout(checkQueue, interval, resolve, reject);
    } else {
      reject(console.log(`transaction ${transaction} not in current block`));
    }
  };

  return new Promise(checkQueue);
}
