import format from 'date-fns/format';
import { TFunction } from 'i18next';
import { Market, MarketStateType, Token } from '../interfaces';
import { DATETIME_FORMAT } from './globals';

export const getMarketStateLabel = (
  market: Market,
  t: TFunction,
  timeStampFormat = DATETIME_FORMAT.MEDIUM_FORMAT,
): string => {
  if (market.state === MarketStateType.auctionRunning) {
    return format(new Date(market.auctionEndDate), timeStampFormat);
  }
  if (market.state === MarketStateType.marketBootstrapped && !market.winningPrediction) {
    return t('Active');
  }
  return t('Closed');
};

export const getTokenQuantityById = (list: Token[], tokenId: number): number => {
  const tokens = list.filter((o) => Number(o.tokenId) === tokenId);
  if (tokens[0]) {
    return Number(tokens[0].quantity);
  }
  return 0;
};
