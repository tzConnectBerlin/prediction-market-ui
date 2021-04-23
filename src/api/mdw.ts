import axios from 'axios';
import BigNumber from 'bignumber.js';
import {
  AuctionData,
  LedgerBalanceResponse,
  QuestionEntryMDW,
  QuestionEntryMDWMap,
  StableCoinResponse,
  MarketCardData,
} from '../interfaces';
import { TEZOS_MDW_API } from '../utils/globals';
import { divideDown, roundToTwo } from '../utils/math';

const ENDPOINTS = {
  market: 'markets.json',
  stablecoin: 'stablecoin-balances.json',
  ledger: 'ledger-balances.json',
};

export const getAllContractData = async (): Promise<QuestionEntryMDWMap> => {
  return (await axios.get(`${TEZOS_MDW_API}/${ENDPOINTS.market}`)).data;
};

export const getAllStablecoinBalances = async (): Promise<StableCoinResponse> => {
  return (await axios.get(`${TEZOS_MDW_API}/${ENDPOINTS.stablecoin}`)).data;
};

export const getAllLedgerBalances = async (): Promise<LedgerBalanceResponse> => {
  return (await axios.get(`${TEZOS_MDW_API}/${ENDPOINTS.ledger}`)).data;
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

export const getAllMarketCard = async (): Promise<MarketCardData[]> => {
  return (await axios.get('markets.json')).data;
};
