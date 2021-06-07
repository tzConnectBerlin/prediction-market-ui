import { BlockMetadata, BlockResponse, RpcClient } from '@taquito/rpc';
import { RPC_URL } from './globals';

export async function queuedItems(transaction?: string) {
  const client = new RpcClient(RPC_URL, 'main');
  const storage = window.localStorage;

  const queue = storage.getItem('queue');
  if (!queue) {
    storage.setItem('queue', JSON.stringify([])); // TODO: abstract me
  }
  let parsedQueue = queue && JSON.parse(queue);
  const block: BlockResponse = await client.getBlock();
  console.log('-- Head block metadata:', block, transaction);

  if (transaction) {
    storage.setItem('queue', JSON.stringify(parsedQueue.push(transaction)));
  }

  if (parsedQueue.length) {
    parsedQueue = parsedQueue.filter((tx: string) => {
      // check to see if transactions in queue are already in block
      // pop from queue if they are
      return block.operations.find((item) => item.find((i) => i.hash !== tx));
    });
  }

  return parsedQueue.length ? parsedQueue : console.log('queue empty');
}
