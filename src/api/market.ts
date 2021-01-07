import { CreateQuestion, QuestionMetaData } from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { getBigMapPtrByName } from '../utils/contractUtils';
import { getBigMapKeys, getContractStorage } from './bcd';

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
