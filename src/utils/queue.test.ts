import { RpcClient } from '@taquito/rpc';
import { queuedItems } from './queue';

describe('queuedItems function', () => {
  describe('localStorage interactions', () => {
    beforeEach(() => window.localStorage.clear());

    it('creates a queue if none exists', () => {
      queuedItems();
      expect(window.localStorage.getItem('queue')).toBeTruthy();
    });

    it('adds an item to the queue', () => {
      queuedItems('txHash');
      expect(window.localStorage.getItem('queue')).toEqual(JSON.stringify(['txHash']));
    });

    it('adds multiple items to the queue', () => {
      queuedItems('txHash');
      queuedItems('txHashTwo');
      expect(window.localStorage.getItem('queue')).toEqual(JSON.stringify(['txHash', 'txHashTwo']));
    });

    it('only adds unique items to the queue', () => {
      queuedItems('txHash');
      queuedItems('txHash');
      expect(window.localStorage.getItem('queue')).toEqual(JSON.stringify(['txHash']));
    });
    // describe('block data returns', () => {
    //   beforeEach(() => {
    //     jest.mock('@taquito/rpc');
    //     const client = new RpcClient('testing', 'chainId');
    //   });
    //   it('fails because theres no data response', () => {
    //     const consoleSpy = jest.spyOn(console, 'log');
    //     queuedItems('txHash', 0.1);

    //     expect(consoleSpy).toHaveBeenCalledWith(`transaction txHash not in current block`);
    //   });
    // });
  });
});
