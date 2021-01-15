import { Bid, CreateQuestion, MarketEntrypoint, QuestionMetaData } from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { getBigMapPtrByName } from '../utils/contractUtils';
import { divideDown } from '../utils/math';
import { getBigMapKeys, getContractStorage, getOperations } from './bcd';

export const getQuestions = async (contractAddress: string): Promise<QuestionMetaData[]> => {
  const storage = await getContractStorage(contractAddress);
  const ptr: number = getBigMapPtrByName('questions', storage);
  const bigMapKeys = await getBigMapKeys(ptr);
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
  size = 10,
): Promise<Bid[] | undefined> => {
  const ops = await getOperations([MarketEntrypoint.Bid], size, contractAddress);
  return ops.operations
    ?.map((item) => item.parameters?.children)
    ?.reduce((acc: Bid[], item) => {
      if (item[1].name === 'rate' && item[2].name === 'quantity') {
        acc.push({
          question: item[0].value,
          quantity: divideDown(item[2].value),
          rate: divideDown(item[1].value),
        });
      }
      return acc;
    }, []);
};
