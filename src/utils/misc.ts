import { Serie } from '@nivo/line';
import { differenceInDays, getWeek } from 'date-fns';
import format from 'date-fns/format';
import { TFunction } from 'i18next';
import * as R from 'ramda';
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

type GraphDataType = (Market | MarketPricePoint)[];

const groupByWeek = R.groupBy((market: Market | MarketPricePoint) => {
  return getWeek(new Date(market.bakedAt)).toString();
});

const byWeek = (data: GraphDataType): GraphDataType => {
  const grouped = groupByWeek(data);
  return Object.values(grouped).reduce(
    (acc: (Market | MarketPricePoint)[], currentList: (Market | MarketPricePoint)[]) => {
      if (currentList.length > 1) {
        acc.push(currentList[0]);
        acc.push(currentList[currentList.length - 1]);
      }
      if (currentList.length === 1) {
        acc.push(currentList[0]);
      }
      return acc;
    },
    new Array<Market | MarketPricePoint>(),
  );
};

export const toChartData = (
  data: GraphDataType,
  initialData: Serie[] = [],
  range: string | number = 'all',
): Serie[] => {
  const currentDate = new Date();

  const innerData = typeof range === 'string' || range >= 30 ? byWeek(data) : data;
  return (innerData as any).reduce((acc: Serie[], item: Market | MarketPricePoint) => {
    const bakedAt = new Date(item.bakedAt);
    const x = format(bakedAt, 'd/MM p');
    const toInclude =
      typeof range === 'string' ? true : differenceInDays(currentDate, bakedAt) <= range;
    if (toInclude) {
      acc[0].data.push({
        y: item.yesPrice * 100,
        x,
      });
      acc[1].data.push({
        y: roundToTwo(1 - item.yesPrice) * 100,
        x,
      });
    }

    return acc;
  }, initialData);
};

export const questionToURL = (question: string): string =>
  question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');
