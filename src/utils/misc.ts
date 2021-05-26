import format from 'date-fns/format';
import { TFunction } from 'i18next';
import { Market, MarketStateType } from '../interfaces';
import { DATETIME_FORMAT } from './globals';

export const getMarketStateLabel = (
  market: Market,
  t: TFunction,
  timeStampFormat = DATETIME_FORMAT.SHORT_FORMAT,
): string => {
  if (market.state === MarketStateType.auctionRunning) {
    return format(new Date(market.auctionEndDate), timeStampFormat);
  }
  if (market.state === MarketStateType.marketBootstrapped) {
    return t('Active');
  }
  return t('Closed');
};
