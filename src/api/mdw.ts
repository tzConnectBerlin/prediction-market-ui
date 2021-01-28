import axios from 'axios';
import BigNumber from 'bignumber.js';
import { AuctionData, QuestionEntryMDW, QuestionEntryMDWMap } from '../interfaces';
import { TEZOS_MDW_API } from '../utils/globals';
import { divideDown, roundToTwo } from '../utils/math';

export const getAllContractData = async (): Promise<QuestionEntryMDWMap> => {
  return (await axios.get(TEZOS_MDW_API)).data;
};

export const toAuctionData = (entry: QuestionEntryMDW): AuctionData => {
  let yes = divideDown(
    new BigNumber(entry.yes_preference).dividedToIntegerBy(entry.total_auction_quantity).toNumber(),
  );
  if (Number.isNaN(yes)) {
    yes = 0.5;
  }
  return {
    no: roundToTwo(1 - yes),
    yes: roundToTwo(yes),
    participants: entry.auction_bids ? Object.keys(entry.auction_bids).length : 0,
  };
};
