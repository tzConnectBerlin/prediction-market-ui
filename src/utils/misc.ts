import { Serie } from '@nivo/line';
import { differenceInDays, getWeek } from 'date-fns';
import format from 'date-fns/format';
import { TFunction } from 'i18next';
import * as R from 'ramda';
import { Market, MarketPricePoint, MarketStateType, SettingValues, Token } from '../interfaces';
import {
  AUTH_CLIENT_ID,
  AUTH_REDIRECT_URL,
  AUTH_SCOPE,
  AUTH_URL,
  DATETIME_FORMAT,
  MARKET_ADDRESS,
} from '../globals';
import { roundToTwo, roundTwoAndTokenDown } from './math';

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

export const getRoundedDividedTokenQuantityById = (list: Token[], tokenId: number): number =>
  roundTwoAndTokenDown(getTokenQuantityById(list, tokenId));

export const getMarketLocalStorage = (
  set: boolean,
  marketId: string,
  marketPhase: string,
  value?: string,
): void | string | null => {
  if (set && value) {
    return localStorage.setItem(`${MARKET_ADDRESS}-${marketId}-${marketPhase}`, value);
  }
  return localStorage.getItem(`${MARKET_ADDRESS}-${marketId}-${marketPhase}`);
};

// eslint-disable-next-line no-bitwise
export const getBaseTokenId = (marketId: string): number => Number(marketId) << 3;

export const getNoTokenId = (marketId: string): number => getBaseTokenId(marketId);

export const getYesTokenId = (marketId: string): number => 1 + getBaseTokenId(marketId);

export const getLQTTokenId = (marketId: string): number => 2 + getBaseTokenId(marketId);

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
  const innerRange = range === 'all' ? range : Number(range);
  let innerData = typeof innerRange === 'string' || innerRange >= 30 ? byWeek(data) : data;
  innerData = innerData.sort((a, b) => {
    const aData = new Date(a.bakedAt);
    const bData = new Date(b.bakedAt);
    if (aData > bData) {
      return 1;
    }
    return -1;
  });
  return (innerData as any).reduce((acc: Serie[], item: Market | MarketPricePoint) => {
    const bakedAt = new Date(item.bakedAt);
    const x = format(bakedAt, 'd/MM p');
    const toInclude =
      typeof innerRange === 'string' ? true : differenceInDays(currentDate, bakedAt) <= innerRange;
    if (toInclude) {
      acc[0].data.push({
        y: item.yesPrice * 100,
        x,
      });
      acc[1].data.push({
        y: roundToTwo((1 - item.yesPrice) * 100),
        x,
      });
    }

    return acc;
  }, initialData);
};

export const questionToURL = (question: string): string =>
  question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');

export const saveSettingValues = (settingValues: SettingValues): void => {
  localStorage.setItem('settingValues', JSON.stringify(settingValues));
};

export const getSavedSettings = (): SettingValues | null => {
  const settingValueStorage = localStorage.getItem('settingValues');
  if (settingValueStorage) {
    const storageValue: SettingValues = JSON.parse(settingValueStorage);
    return storageValue;
  }
  return null;
};

export const getConnectionURL = (redirectURI: string): string =>
  `${AUTH_URL}?response_type=code&redirect_uri=${AUTH_REDIRECT_URL}&client_id=${AUTH_CLIENT_ID}&scope=${AUTH_SCOPE}&state=${btoa(
    JSON.stringify({ redirect_uri: redirectURI }),
  )}`;

export const triggerTorusLogin = () => {
  window.location.href = getConnectionURL(window.location.href);
};
