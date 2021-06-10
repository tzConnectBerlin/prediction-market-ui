import { RpcClient } from '@taquito/rpc';
import { queuedItems } from './queue';

jest.createMockFromModule('@taquito/rpc');
jest.mock('@taquito/rpc');

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

    describe('block/taquito interactions', () => {
      let client: RpcClient;
      let httpBackend: {
        createRequest: jest.Mock<any, any>;
      };

      beforeEach(() => {
        httpBackend = {
          createRequest: jest.fn(),
        };
        client = new RpcClient('root', 'test', httpBackend as any);
        // httpBackend.createRequest.mockReturnValue();
        client.getBlock = jest.fn().mockReturnValue(
          Promise.resolve({
            hash: 'txHash',
            operations: [[{ hash: 'txHash' }]],
          }),
        );
      });

      // // const client = new RpcClient('testing', 'chainId');
      // RpcClient.mockImplementation(())

      it('fails because theres no data response', () => {
        jest.useFakeTimers();
        const data = queuedItems('txHash1');
        jest.runAllTimers();
        // const blockSpy = jest.spyOn(client, 'getBlock');
        const consoleSpy = jest.spyOn(console, 'log');
        expect(consoleSpy).toHaveBeenCalledWith(`transaction txHash1 not in current block`);
        // expect(blockSpy).toHaveBeenCalled();
        // done();
      });
      //   it('only adds unique items to the queue', () => {
      //     queuedItems('txHash');
      //     expect(window.localStorage.getItem('queue')).toEqual(JSON.stringify(['txHash']));
      //   });
    });
  });
});
