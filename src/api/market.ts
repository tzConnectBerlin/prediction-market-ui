import { getQuestionData } from '../contracts/Market';
import { AuctionData, AuctionDataMap, CreateQuestion, QuestionMetaData } from '../interfaces';
import { fetchIPFSData } from '../ipfs/ipfs';
import { divideDown } from '../utils/math';

export const getIPFSDataByKeys = async (questionKeys: string[]): Promise<QuestionMetaData[]> => {
  const data: QuestionMetaData[] = await Promise.all(
    questionKeys.map(async (hash) => {
      const questionData = await fetchIPFSData<CreateQuestion>(hash);
      return { hash, ...questionData };
    }),
  );
  return data;
};

export const getAuctionData = async (questionHashes: string[]): Promise<AuctionDataMap> => {
  const questionDetails = await getQuestionData(questionHashes);
  return Object.keys(questionDetails).reduce((acc: AuctionDataMap, hash: string) => {
    const item = questionDetails[hash];
    const yesVal = item.yes_preference.dividedToIntegerBy(item.total_auction_quantity).toNumber();
    let yes = divideDown(yesVal);
    if (Number.isNaN(yes)) {
      yes = 0.5;
    }
    const result: AuctionData = {
      no: Math.round((1 - yes + Number.EPSILON) * 100) / 100,
      yes: Math.round((yes + Number.EPSILON) * 100) / 100,
      participants: item.auction_bids.size,
    };
    return { ...acc, [hash]: result };
  }, {});
};
