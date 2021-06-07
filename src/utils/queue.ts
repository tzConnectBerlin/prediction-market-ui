import { BlockResponse, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

export async function queuedItems(transaction?: string, confirmations = 1, interval = 1000) {
  const client = new RpcClient(RPC_URL, 'main');
  const timeout = confirmations * 30000;
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
    parsedQueue.forEach((tx: string, i: number) => {
      // check to see if transactions in queue are already in block
      // pop from queue if they are
      const included = block.operations.find((item) => item.find((itm) => itm.hash === tx));
      console.log(tx, included);
      if (included?.find((itm) => itm.hash === tx)) {
        console.log(`transaction ${tx} included in ${block.hash}`);
        parsedQueue.splice(i, 1);
        setQueue(parsedQueue);
      }
    });
  };

  if (transaction) {
    parsedQueue.push(transaction);
    setQueue(parsedQueue);
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
