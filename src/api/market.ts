import { getQuestionData } from '../contracts/Market';
import { Bid, CreateQuestion, MarketEntrypoint, QuestionMetaData, YesNoPrice } from '../interfaces';
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

interface QuestionPriceMap {
  [key: string]: YesNoPrice;
}

export const getAuctionPrices = async (questionHashes: string[]): Promise<QuestionPriceMap> => {
  const questionDetails = await getQuestionData(questionHashes);
  return Object.keys(questionDetails).reduce((acc: QuestionPriceMap, hash: string) => {
    const item = questionDetails[hash];
    const yesVal = item.yes_preference.dividedToIntegerBy(item.total_auction_quantity).toNumber();
    let yes = divideDown(yesVal);
    if (Number.isNaN(yes)) {
      yes = 0.5;
    }
    const result: YesNoPrice = {
      no: 1 - yes,
      yes,
    };
    return { ...acc, [hash]: result };
  }, {});
};
