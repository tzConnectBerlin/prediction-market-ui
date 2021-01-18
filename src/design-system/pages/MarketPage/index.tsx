/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { getQuestions } from '../../../api/market';
import { initMarketContract } from '../../../contracts/Market';
import { QuestionMetaData } from '../../../interfaces';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { AccountCardProps } from '../../molecules/AccountCard/AccountCard';
import { AccountCardList } from '../../organisms/AccountCardList';
import {
  ENABLE_SAME_MARKETS,
  ENABLE_SIMILAR_MARKETS,
  LONG_DATE_FORMAT,
} from '../../../utils/globals';
import { useMarketPathParams } from '../../../hooks/market';

type MarketPageProps = WithTranslation;

export const MarketPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const history = useHistory();

  const QuestionDetails: React.FC<QuestionMetaData> = ({ marketCloseDate, auctionEndDate }) => (
    <>
      <Typography size="body2" color="textSecondary" component="p">
        {t('auctionEndDate')} {format(new Date(auctionEndDate), LONG_DATE_FORMAT)}
      </Typography>
      <Typography size="body2" color="textSecondary" component="p">
        {t('marketCloseDate')} {format(new Date(marketCloseDate), LONG_DATE_FORMAT)}
      </Typography>
    </>
  );

  const { marketAddress } = useMarketPathParams();
  const { data } = useQuery<QuestionMetaData[], AxiosError, QuestionMetaData[]>(
    `contractQuestions-${marketAddress}`,
    () => {
      return getQuestions(marketAddress!);
    },
  );
  const accList: AccountCardProps[] = data
    ? data.map((item) => {
        return {
          seed: item.hash,
          address: item.question,
          onClick: () => history.push(`/market/${marketAddress}/question/${item.hash}`, item),
          content: <QuestionDetails {...item} />,
        };
      })
    : [];
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
      <Paper elevation={0}>
        {accList.length > 0 && (
          <>
            <Typography component="span" size="h4">
              {t('registeredQuestions')}
            </Typography>
            <AccountCardList list={accList} />
          </>
        )}
      </Paper>
    </MainPage>
  );
};

export const MarketPage = withTranslation(['common'])(MarketPageComponent);
