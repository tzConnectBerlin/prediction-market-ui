/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { getCurrentMarketAddress, initMarketContract } from '../../../contracts/Market';
import { QuestionMetaData } from '../../../interfaces';
import { ListItemLinkProps } from '../../atoms/ListItem';
import { LinkList } from '../../organisms/LinkList/LinkList';
import { MainPage } from '../MainPage';

type QuestionPageProps = WithTranslation;

interface QuestionPagePathParams {
  marketAddress: string;
  questionHash: string;
}

export const QuestionPageComponent: React.FC<QuestionPageProps> = ({ t }) => {
  const { marketAddress, questionHash } = useParams<QuestionPagePathParams>();
  const {
    state: { auctionEndDate, marketCloseDate },
  } = useLocation<QuestionMetaData>();
  const currentDate = new Date();
  const auctionDate = new Date(auctionEndDate);
  const marketEndDate = new Date(marketCloseDate);
  useEffect(() => {
    const currentAddress = getCurrentMarketAddress();
    if (marketAddress && currentAddress && marketAddress !== currentAddress) {
      initMarketContract(marketAddress);
    }
  }, [marketAddress]);

  let menuItems: ListItemLinkProps[] = [];

  if (currentDate <= auctionDate) {
    menuItems = [
      {
        to: `/market/${marketAddress}/question/${questionHash}/submit-bid`,
        primary: t('createBidPage'),
      },
    ];
  }

  if (currentDate > auctionDate && currentDate <= marketEndDate) {
    menuItems = [
      {
        to: `/market/${marketAddress}/question/${questionHash}/close-auction`,
        primary: t('closeAuctionPage'),
      },
      {
        to: `/market/${marketAddress}/question/${questionHash}/withdraw-auction`,
        primary: t('withdrawAuctionWinningsPage'),
      },
      {
        to: `/market/${marketAddress}/question/${questionHash}/buy-token`,
        primary: t('buyTokenPage'),
      },
    ];
  }

  if (currentDate > marketEndDate) {
    menuItems = [
      {
        to: `/market/${marketAddress}/question/${questionHash}/submit-bid`,
        primary: t('createBidPage'),
      },
      {
        to: `/market/${marketAddress}/question/${questionHash}/close-market/`,
        primary: t('closeMarketPage'),
      },
      {
        to: `/market/${marketAddress}/question/${questionHash}/claim-winnings`,
        primary: t('claimWinningsPage'),
      },
    ];
  }

  return (
    <MainPage title={t('availableMethods')}>
      <Paper elevation={0}>
        <LinkList list={menuItems} />
      </Paper>
    </MainPage>
  );
};

export const QuestionPage = withTranslation(['common'])(QuestionPageComponent);
