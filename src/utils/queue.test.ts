import { BlockResponse } from '@taquito/rpc';
import { queuedItems, inBlock, filterQueue } from './queue';

const mockCallback = jest.fn();

jest.mock('@taquito/rpc', () => {
  class MockRpcClient {
    // eslint-disable-next-line class-methods-use-this
    getBlock() {
      return {
        hash: 'txHash',
        operations: [[], ['txHash'], []],
      };
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
    const response = await filterQueue(mockBlock, ['txHash'], (data) => data);
    expect(response).toEqual([{ hash: 'txHash' }]);
  });
  it('is not caught by filter', async () => {
    const mockBlock = { operations: [[{ hash: 'txHash' }]] } as BlockResponse;
    const response = await filterQueue(mockBlock, ['txHash1'], (data) => data);
    expect(response).toEqual([]);
  });
});
describe('queuedItems function', () => {
  describe('localStorage interactions', () => {
    beforeEach(() => {
      window.localStorage.clear();
    });

    it('creates a queue if none exists', () => {
      queuedItems('', mockCallback);
      expect(window.localStorage.getItem('queue')).toBeTruthy();
    });

    it('adds an item to the queue', () => {
      queuedItems('txHash', mockCallback);
      expect(window.localStorage.getItem('queue')).toEqual(JSON.stringify(['txHash']));
    });

    it('adds multiple items to the queue', () => {
      queuedItems('txHash', mockCallback);
      queuedItems('txHashTwo', mockCallback);
      expect(window.localStorage.getItem('queue')).toEqual(JSON.stringify(['txHash', 'txHashTwo']));
    });

    it('only adds unique items to the queue', () => {
      queuedItems('txHash', mockCallback);
      queuedItems('txHash', mockCallback);
      expect(window.localStorage.getItem('queue')).toEqual(JSON.stringify(['txHash']));
    });
  });
  describe('block/taquito interactions', () => {
    const actualLog = console.log;
    let mockConsoleCall: jest.Mock<any, any>;
    beforeEach(() => {
      mockConsoleCall = jest.fn();
      console.log = (...data: any[]) => {
        mockConsoleCall(data);
        actualLog(data);
      };
    });

    afterEach(() => {
      console.log = actualLog;
    });

    it('fails because theres no data response', async () => {
      try {
        await queuedItems('txHash1', mockCallback, 0, undefined, 1);
      } catch (error) {
        actualLog(error);
      }
      expect(mockConsoleCall).toHaveBeenCalledWith([`transaction txHash1 not in current block`]);
    });

    it('returns data', async () => {
      try {
        const response = await queuedItems('txHash', (data) => data, 0, undefined, 1);
        expect(response).toEqual([{ hash: 'txHash' }]);
      } catch (error) {
        actualLog(error);
      }
    });
  });
});
