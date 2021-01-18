import { useParams } from 'react-router-dom';
import { MARKET_ADDRESS } from '../utils/globals';

interface MarketPathParams {
  marketAddress?: string;
  questionHash?: string;
}

export const useMarketPathParams = (): MarketPathParams => {
  const { marketAddress, questionHash } = useParams<MarketPathParams>();
  const mrktAddr = marketAddress === 'main' ? MARKET_ADDRESS : marketAddress;
  return {
    marketAddress: mrktAddr,
    questionHash,
  };
};
