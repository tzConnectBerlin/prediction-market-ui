import { queuedItems, getPendingTransactions } from './queue';

const mockCallback = jest.fn();

jest.mock('@taquito/rpc', () => {
  class MockRpcClient {
    // eslint-disable-next-line class-methods-use-this
    getBlock() {
      return {
        operations: [[], [], []],
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

    describe('block/taquito interactions', () => {
      it('fails because there is no data response', async () => {
        expect.assertions(1);
        await expect(
          queuedItems('txHash1', mockCallback, 'testTx', 0, undefined, 1, 1).catch(
            (err: unknown) => {
              throw err;
            },
          ),
        ).rejects.toThrowError(new Error('Transaction txHash1 not found. Last block checked: 1'));
      });
    });
  });
});
