/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import {
  LedgerBalanceResponse,
  QuestionEntryMDWMap,
  QuestionMetaData,
  SimilarContractResponse,
  StableCoinResponse,
} from '../interfaces';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS, MARKET_ADDRESS } from '../utils/globals';
import { getSameContracts, getSimilarContracts } from './bcd';
import { getIPFSDataByKeys } from './market';
import { getAllContractData, getAllLedgerBalances, getAllStablecoinBalances } from './mdw';

const IGNORE_KEYS = [
  'QmQaaKGFHRo8dPaUX2wBErLY8aDhANFK1WWdkjFRm3QLHJ',
  'QmcTkeZS27Ca2C58wYb1b8m7Q45CzyUqRpgYKdJoyxyzoV',
  'QmPmxLr3vXMFgkmTNwDjJAtrvLj3H6S3MCeZXHgJzvhZrH',
  'QmZv3WZ1eRpafXYjyD6XPw5LfHox4kuWS9aMYvrHdPhDxi',
  'QmdngzMvDL3LprNrh1RUaqerB5VxRqXtVRY2ghyMMvWM3d',
  'QmQrJxMis8NL8tSgMTwktEnVXANhKKBoaKbUGeaG8VxsPW',
];

export const useContractQuestions = (marketAddress = MARKET_ADDRESS) => {
  return useQuery<QuestionEntryMDWMap, AxiosError, QuestionEntryMDWMap>(
    ['contractQuestions', marketAddress],
    async () => {
      const data = await getAllContractData();
      IGNORE_KEYS.forEach((key: string) => {
        delete data[key];
      });
      return data;
    },
    {
      refetchInterval: 10000,
      staleTime: 3000,
    },
  );
};

export const useStableCoinData = () => {
  return useQuery<StableCoinResponse, AxiosError, StableCoinResponse>(
    'stablecoinData',
    async () => {
      return getAllStablecoinBalances();
    },
    {
      refetchInterval: 10000,
      staleTime: 3000,
    },
  );
};

export const useLedgerBalances = (marketAddress = MARKET_ADDRESS) => {
  return useQuery<LedgerBalanceResponse, AxiosError, LedgerBalanceResponse>(
    ['contractLedgerBalance', marketAddress],
    () => {
      return getAllLedgerBalances();
    },
    {
      refetchInterval: 10000,
      staleTime: 3000,
    },
  );
};

export const useIPFSData = (marketData?: QuestionEntryMDWMap, marketAddress = MARKET_ADDRESS) => {
  return useQuery<QuestionMetaData[] | undefined, AxiosError, QuestionMetaData[] | undefined>(
    ['contractMetaData', marketAddress],
    () => {
      return marketData && getIPFSDataByKeys(Object.keys(marketData));
    },
    {
      enabled: !!marketData,
      refetchInterval: 10000,
      staleTime: 3000,
    },
  );
};

export const useSimilarContracts = () => {
  return useQuery<SimilarContractResponse, AxiosError, SimilarContractResponse>(
    'similarMarkets',
    () => {
      if (ENABLE_SIMILAR_MARKETS) {
        return getSimilarContracts();
      }
      return Promise.resolve<SimilarContractResponse>({});
    },
  );
};

export const useSameContracts = () => {
  return useQuery<SimilarContractResponse, AxiosError, SimilarContractResponse>(
    'sameMarkets',
    () => {
      if (ENABLE_SAME_MARKETS) {
        return getSameContracts();
      }
      return Promise.resolve<SimilarContractResponse>({});
    },
  );
};
