import { Grid, Paper } from '@material-ui/core';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getAuctionData, getQuestions } from '../../../api/market';
import { initMarketContract } from '../../../contracts/Market';
import { AuctionData, QuestionMetaData } from '../../../interfaces';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { ENABLE_SAME_MARKETS, ENABLE_SIMILAR_MARKETS } from '../../../utils/globals';
import { useMarketPathParams } from '../../../hooks/market';
import { MarketCardProps, MarketCard } from '../../molecules/MarketCard';

type MarketPageProps = WithTranslation;

interface MarketList {
  auctionOpen: MarketCardProps[];
  marketOpen: MarketCardProps[];
  marketClosed: MarketCardProps[];
}

export const MarketPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const history = useHistory();
  const [marketList, setMarketList] = useState<MarketList>({
    auctionOpen: new Array<MarketCardProps>(),
    marketOpen: new Array<MarketCardProps>(),
    marketClosed: new Array<MarketCardProps>(),
  });
  const { marketAddress } = useMarketPathParams();
  const { data } = useQuery<QuestionMetaData[], AxiosError, QuestionMetaData[]>(
    `contractQuestions-${marketAddress}`,
    () => {
      return getQuestions(marketAddress!);
    },
  );

  const AuctionInfo: React.FC<AuctionData> = ({ yes, no, participants }) => (
    <>
      <Typography size="caption" component="div">
        {t('Yes')}: {yes}
      </Typography>
      <Typography size="caption" component="div">
        {t('No')}: {no}
      </Typography>
      <Typography size="caption" component="div">
        {t('participants')}: {participants}
      </Typography>
    </>
  );

  useEffect(() => {
    /**
     * TODO: Clean this useEffect code
     */
    const setupPage = async () => {
      marketAddress && (await initMarketContract(marketAddress));
      const newMarketList =
        data &&
        (await data.reduce(
          async (acc, { question, auctionEndDate, marketCloseDate, hash, iconURL }) => {
            const result = await acc;
            const marketProps: MarketCardProps = {
              hash,
              auctionCloseText: t('auctionEndDate'),
              marketCloseText: t('marketCloseDate'),
              auctionTimestamp: new Date(auctionEndDate),
              marketTimestamp: new Date(marketCloseDate),
              title: question,
              iconURL,
              onClick: () =>
                history.push(`/market/${marketAddress}/question/${hash}`, {
                  question,
                  auctionEndDate,
                  marketCloseDate,
                  hash,
                  iconURL,
                }),
            };
            const currentDate = new Date();
            if (marketProps.auctionTimestamp > currentDate) {
              marketProps.onClick = () =>
                history.push(`/market/${marketAddress}/question/${hash}/submit-bid`, {
                  question,
                  auctionEndDate,
                  marketCloseDate,
                  hash,
                  iconURL,
                });
              const auctionData = await getAuctionData([hash]);
              result.auctionOpen.push({
                ...marketProps,
                content: <AuctionInfo {...auctionData[hash]} />,
              });
            } else if (
              marketProps.auctionTimestamp < currentDate &&
              marketProps.marketTimestamp > currentDate
            ) {
              result.marketOpen.push(marketProps);
            } else if (currentDate >= marketProps.marketTimestamp) {
              marketProps.marketCloseText = t('marketClosed');
              result.marketClosed.push(marketProps);
            }
            return result;
          },
          Promise.resolve({
            auctionOpen: new Array<MarketCardProps>(),
            marketOpen: new Array<MarketCardProps>(),
            marketClosed: new Array<MarketCardProps>(),
          }),
        ));
      newMarketList && setMarketList(newMarketList);
    };
    setupPage();
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
                  <MarketCard {...item} />
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
