import { Bid, CreateQuestion, MarketEntrypoint, QuestionMetaData } from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { getBigMapPtrByName } from '../utils/contractUtils';
import { divideDown } from '../utils/math';
import { getBigMapKeys, getContractStorage, getOperations } from './bcd';

export const getQuestions = async (
  contractAddress: string,
  size?: number,
): Promise<QuestionMetaData[]> => {
  const storage = await getContractStorage(contractAddress);
  const ptr: number = getBigMapPtrByName('questions', storage);
  const bigMapKeys = await getBigMapKeys(ptr, undefined, size);
  const questionKeys: string[] = bigMapKeys.map((item) => {
    return item.data.key_string;
  });
  const data: QuestionMetaData[] = await Promise.all(
    questionKeys.map(async (hash) => {
      const questionData = await fetchIPFSData<CreateQuestion>(hash);
      return { hash, ...questionData };
    }),
  );
  return data;
};

export const getMarketBids = async (
  contractAddress: string,
  questionHash: string,
  size = 10,
): Promise<Bid[]> => {
  const ops = await getOperations([MarketEntrypoint.Bid], size, contractAddress);
  const bids = ops.operations
    ?.map((item) => item.parameters?.children)
    ?.reduce((acc: Bid[], item) => {
      if (
        item[1].name === 'rate' &&
        item[2].name === 'quantity' &&
        item[0].value === questionHash
      ) {
        acc.push({
          question: item[0].value,
          quantity: divideDown(item[2].value),
          rate: divideDown(item[1].value),
        });
      }
      return acc;
    }, []);
  return bids ?? [];
};
