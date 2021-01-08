/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { getQuestions } from '../../../api/market';
import { initMarketContract } from '../../../contracts/Market';
import { QuestionMetaData } from '../../../interfaces';
import { ListItemLinkProps } from '../../atoms/ListItem';
import { LinkList } from '../../organisms/LinkList/LinkList';
import { MainPage } from '../MainPage';
import { Typography } from '../../atoms/Typography';
import { AccountCardProps } from '../../molecules/AccountCard/AccountCard';
import { AccountCardList } from '../../organisms/AccountCardList';

type MarketPageProps = WithTranslation;

interface MarketPathParams {
  marketAddress: string;
}

export const MarketPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const history = useHistory();

  const QuestionDetails: React.FC<QuestionMetaData> = ({ marketCloseDate, auctionEndDate }) => (
    <>
      <Typography size="body2" color="textSecondary" component="p">
        {t('marketCloseDate')}: {marketCloseDate}
      </Typography>
      <Typography size="body2" color="textSecondary" component="p">
        {t('auctionEndDate')}: {auctionEndDate}
      </Typography>
    </>
  );

  const { marketAddress } = useParams<MarketPathParams>();
  const { data } = useQuery<QuestionMetaData[], AxiosError, QuestionMetaData[]>(
    `contractQuestions-${marketAddress}`,
    () => {
      return getQuestions(marketAddress);
    },
  );
  const accList: AccountCardProps[] = data
    ? data.map((item) => {
        return {
          seed: item.hash,
          address: item.question,
          onClick: () => history.push(`/market/${marketAddress}/question/${item.hash}`),
          content: <QuestionDetails {...item} />,
        };
      })
    : [];
  useEffect(() => {
    marketAddress && initMarketContract(marketAddress);
  }, [marketAddress]);

  const menuItems: ListItemLinkProps[] = [
    {
      to: `/market/${marketAddress}/create-question`,
      primary: t('createQuestionPage'),
    },
  ];
  return (
    <MainPage title={t(`${marketAddress}`)}>
      <Paper elevation={0}>
        <LinkList list={menuItems} />
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
