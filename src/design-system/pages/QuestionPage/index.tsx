/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { getCurrentMarketAddress, initMarketContract } from '../../../contracts/Market';
import { QuestionEntryMDW, QuestionMetaData } from '../../../interfaces';
import { useWallet } from '../../../wallet/hooks';
import { ListItemLinkProps } from '../../atoms/ListItem';
import { LinkList } from '../../organisms/LinkList/LinkList';
import { MainPage } from '../MainPage';

type QuestionPageProps = WithTranslation;

interface QuestionPagePathParams {
  marketAddress: string;
  questionHash: string;
}

export const QuestionPageComponent: React.FC<QuestionPageProps> = ({ t }) => {
  const wallet = useWallet();
  const { marketAddress, questionHash } = useParams<QuestionPagePathParams>();
  const { state } = useLocation<QuestionMetaData & QuestionEntryMDW>();
  const { owner, auctionEndDate, marketCloseDate } = state;
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
        to: { pathname: `/market/${marketAddress}/question/${questionHash}/submit-bid`, state },
        primary: t('createBidPage'),
      },
    ];
  }

  if (currentDate > auctionDate && currentDate <= marketEndDate) {
    if (owner === wallet.wallet.pkh) {
      menuItems.push({
        to: { pathname: `/market/${marketAddress}/question/${questionHash}/close-auction`, state },
        primary: t('closeAuctionPage'),
      });
    }
    menuItems = [
      {
        to: {
          pathname: `/market/${marketAddress}/question/${questionHash}/withdraw-auction`,
          state,
        },
        primary: t('withdrawAuctionWinningsPage'),
      },
      {
        to: { pathname: `/market/${marketAddress}/question/${questionHash}/buy-token`, state },
        primary: t('buyTokenPage'),
      },
    ];
  }

  if (currentDate > marketEndDate) {
    menuItems = [
      {
        to: { pathname: `/market/${marketAddress}/question/${questionHash}/claim-winnings`, state },
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
