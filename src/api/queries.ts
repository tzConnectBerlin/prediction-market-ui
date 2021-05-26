import { AxiosError } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import { Market } from '../interfaces';
import { getAllMarkets } from './graphql';

export const useMarkets = (): UseQueryResult<Market[]> => {
  return useQuery<Market[], AxiosError, Market[]>('allMarkets', () => {
    return getAllMarkets();
  });
};
