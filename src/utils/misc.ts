import { Serie } from '@nivo/line';
import format from 'date-fns/format';
import { TFunction } from 'i18next';
import { Market, MarketPricePoint, MarketStateType, Token } from '../interfaces';
import { DATETIME_FORMAT } from './globals';
import { roundToTwo } from './math';

export const getMarketStateLabel = (
  market: Market,
  t: TFunction,
  timeStampFormat = DATETIME_FORMAT.MEDIUM_FORMAT,
): string => {
  if (market.state === MarketStateType.auctionRunning) {
    return format(new Date(market.auctionEndDate), timeStampFormat);
  }
  if (market.state === MarketStateType.marketBootstrapped && !market.winningPrediction) {
    return t('active');
  }
  return t('closed');
};

export const getTokenQuantityById = (list: Token[], tokenId: number): number => {
  const tokens = list.filter((o) => Number(o.tokenId) === tokenId);
  if (tokens[0]) {
    return Number(tokens[0].quantity);
  }
  return 0;
};

// eslint-disable-next-line no-bitwise
export const getBaseTokenId = (marketId: string): number => Number(marketId) << 3;

export const getNoTokenId = (marketId: string): number => getBaseTokenId(marketId);

export const getYesTokenId = (marketId: string): number => 1 + getBaseTokenId(marketId);

export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

export const toChartData = (
  data: Market[] | MarketPricePoint[],
  initialData: Serie[] = [],
): Serie[] => {
  return (data as any).reduce((acc: Serie[], item: Market | MarketPricePoint) => {
    const x = format(new Date(item.bakedAt), 'd/MM p');
    acc[0].data.push({
      y: item.yesPrice * 100,
      x,
    });
    acc[1].data.push({
      y: roundToTwo(1 - item.yesPrice) * 100,
      x,
    });

    return acc;
  }, initialData);
};
