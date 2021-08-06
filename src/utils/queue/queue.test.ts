import { BlockResponse } from '@taquito/rpc';
import { queuedItems, getPendingTransactions, inBlock, filterQueue } from './queue';

const mockCallback = jest.fn();

jest.mock('@taquito/rpc', () => {
  class MockRpcClient {
    // eslint-disable-next-line class-methods-use-this
    getBlock() {
      return {
        operations: [[], [], [{ hash: 'txHash999' }]],
        header: {
          level: 1,
        },
      };
    }

    // eslint-disable-next-line class-methods-use-this
    getBlockHash() {
      return 'fakeBlockHash';
    }
  }
  return {
    __esModule: true,
    ...jest.requireActual('@taquito/rpc'),
    RpcClient: MockRpcClient,
  };
});
describe('inBlock function', () => {
  it('is inBlock', () => {
    const mockBlock = { operations: [[{ hash: 'txHash' }]] } as BlockResponse;
    const response = inBlock(mockBlock, 'txHash');
    expect(response).toEqual([{ hash: 'txHash' }]);
  });
  it('is not inBlock', () => {
    const mockBlock = { operations: [[{ hash: 'txHash' }]] } as BlockResponse;
    const response = inBlock(mockBlock, 'txHash1');
    expect(response).toEqual(undefined);
  });
});
describe('filterQueue function', () => {
  it('is caught by filter', async () => {
    const mockBlock = { operations: [[{ hash: 'txHash' }]] } as BlockResponse;
    await filterQueue(mockBlock, ['txHash'], 'testTx', mockCallback);
    expect(mockCallback).toBeCalledWith([{ hash: 'txHash' }]);
  });
  it('is not caught by filter', async () => {
    const mockBlock = { operations: [[{ hash: 'txHash' }]] } as BlockResponse;
    await filterQueue(mockBlock, ['txHash1'], 'testTx', mockCallback);
    expect(mockCallback).toBeCalledWith([]);
  });
});
describe('queuedItems function', () => {
  describe('localStorage interactions', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    it('creates a queue if none exists', () => {
      expect.assertions(1);
      queuedItems('', mockCallback);
      expect(getPendingTransactions()).toBeTruthy();
    });

    it('adds an item to the queue', () => {
      expect.assertions(1);
      queuedItems('txHash', mockCallback);
      expect(getPendingTransactions()).toEqual(['txHash']);
    });

    it('adds multiple items to the queue', () => {
      expect.assertions(1);
      queuedItems('txHash', mockCallback);
      queuedItems('txHashTwo', mockCallback);
      expect(getPendingTransactions()).toEqual(['txHash', 'txHashTwo']);
    });

    it('only adds unique items to the queue', () => {
      expect.assertions(1);
      queuedItems('txHash', mockCallback);
      queuedItems('txHash', mockCallback);
      expect(getPendingTransactions()).toEqual(['txHash']);
    });
  });

  describe('block/taquito interactions', () => {
    it('fails because there is no data response', async () => {
      expect.assertions(1);
      await expect(
        queuedItems('txHash1', mockCallback, 'testTx', 0, undefined, 1, 1).catch((err: unknown) => {
          throw err;
        }),
      ).rejects.toThrowError(new Error('Transaction txHash1 not found. Last block checked: 1'));
    });

    it('Callback is invoked when transaction is found', async () => {
      const mockMethod = jest.fn();
      await queuedItems('txHash999', mockMethod, ['testTx', 'userAddress'], 1, undefined, 1, 1);
      expect(mockMethod).toBeCalled();
    });
  });
});
