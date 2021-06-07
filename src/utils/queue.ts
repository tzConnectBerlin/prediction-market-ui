import { BlockResponse, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

export async function queuedItems(transaction?: string, timeout?: number, interval = 500) {
  const client = new RpcClient(RPC_URL, 'main');
  const storage = window.localStorage;
  const endTime = Number(new Date()) + (timeout || 30000);
  interval = interval || 500;

  const setQueue = (transactions: string[]) => {
    storage.setItem('queue', JSON.stringify(transactions));
  };

  const queue = storage.getItem('queue');
  if (!queue) {
    setQueue([]);
  }
  const parsedQueue: string[] = (queue && JSON.parse(queue)) ?? [];
  const filterQueue = (block: BlockResponse) =>
    setQueue(
      parsedQueue.filter((tx: string) => {
        // check to see if transactions in queue are already in block
        // pop from queue if they are
        return block.operations.find((item) => item.find((i) => i.hash !== tx));
      }),
    );
  //   console.log('-- Head block:', block, transaction);

  if (transaction) {
    storage.setItem('queue', JSON.stringify([...parsedQueue, transaction]));
  }

  const checkQueue = async (resolve: any, reject: any) => {
    const block: BlockResponse = await client.getBlock();
    const inBlock = block.operations.find((item) => item.find((i) => i.hash === transaction));

    if (parsedQueue.length) {
      filterQueue(block);
    }
    if (inBlock) {
      resolve(
        (() => {
          console.log(`transaction included in ${block.hash}`);
          filterQueue(block);
        })(),
      );
    } else if (Number(new Date()) < endTime) {
      setTimeout(checkQueue, interval, resolve, reject);
    } else {
      reject(console.log(`transaction ${transaction} not in current block`));
    }
  };

  return new Promise(checkQueue);
}
