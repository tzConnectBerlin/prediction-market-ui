/* eslint-disable react/display-name */
import { Grid, Paper } from '@material-ui/core';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getQuestions } from '../../../api/market';
import { initMarketContract } from '../../../contracts/Market';
import { QuestionMetaData } from '../../../interfaces';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { useMarketPathParams } from '../../../hooks/market';
import { MarketCardProps, MarketCard } from '../../molecules/MarketCard';

type MarketPageProps = WithTranslation;

export const MarketPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const history = useHistory();

  const { marketAddress } = useMarketPathParams();
  const { data } = useQuery<QuestionMetaData[], AxiosError, QuestionMetaData[]>(
    `contractQuestions-${marketAddress}`,
    () => {
      return getQuestions(marketAddress!);
    },
  );
  const marketList = data
    ? data.reduce(
        (acc, { question, auctionEndDate, marketCloseDate, hash }) => {
          const marketProps: MarketCardProps = {
            hash,
            auctionCloseText: t('auctionEndDate'),
            marketCloseText: t('marketCloseDate'),
            auctionTimestamp: new Date(auctionEndDate),
            marketTimestamp: new Date(marketCloseDate),
            title: question,
            onClick: () =>
              history.push(`/market/${marketAddress}/question/${hash}`, {
                question,
                auctionEndDate,
                marketCloseDate,
                hash,
              }),
          };
          const currentDate = new Date();
          if (marketProps.auctionTimestamp > currentDate) {
            acc.auctionOpen.push(marketProps);
          } else if (
            marketProps.auctionTimestamp < currentDate &&
            marketProps.marketTimestamp > currentDate
          ) {
            acc.marketOpen.push(marketProps);
          } else if (currentDate >= marketProps.marketTimestamp) {
            acc.marketClosed.push(marketProps);
          }
          return acc;
        },
        {
          auctionOpen: new Array<MarketCardProps>(),
          marketOpen: new Array<MarketCardProps>(),
          marketClosed: new Array<MarketCardProps>(),
        },
      )
    : { auctionOpen: [], marketOpen: [], marketClosed: [] };
  useEffect(() => {
    marketAddress && initMarketContract(marketAddress);
  }, [marketAddress]);

  const getPageTitle = (): string | undefined => {
    if (ENABLE_SAME_MARKETS || ENABLE_SIMILAR_MARKETS) {
      return marketAddress;
    }
  };

  const title = getPageTitle();
  return (
    <MainPage title={title ? t(`${title}`) : undefined}>
      {marketList.auctionOpen.length > 0 && (
        <Paper elevation={0}>
          <>
            <Typography component="span" size="h4">
              {t('auctionOpenSection')}
            </Typography>
            <Grid container spacing={1}>
              {marketList.auctionOpen.map((item) => (
                <Grid item key={item.hash}>
                  <MarketCard {...item} />
                </Grid>
              ))}
            </Grid>
          </>
        </Paper>
      )}
      {marketList.marketOpen.length > 0 && (
        <Paper elevation={0}>
          <>
            <Typography component="span" size="h4">
              {t('openMarketSection')}
            </Typography>
            <Grid container spacing={1}>
              {marketList.marketOpen.map((item) => (
                <Grid item key={item.hash}>
                  <MarketCard {...item} />
                </Grid>
              ))}
            </Grid>
          </>
        </Paper>
      )}
      {marketList.marketClosed.length > 0 && (
        <Paper elevation={0}>
          <>
            <Typography component="span" size="h4">
              {t('closedMarketSection')}
            </Typography>
            <Grid container spacing={1}>
              {marketList.marketClosed.map((item) => (
                <Grid item key={item.hash}>
                  <MarketCard {...item} marketCloseText={t('marketClosed')} />
                </Grid>
              ))}
            </Grid>
          </>
        </Paper>
      )}
    </MainPage>
  );
};

export const MarketPage = withTranslation(['common'])(MarketPageComponent);
