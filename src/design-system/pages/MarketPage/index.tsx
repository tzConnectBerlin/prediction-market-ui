/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { initMarketContract } from '../../../contracts/Market';
import { ListItemLinkProps } from '../../atoms/ListItem';
import { LinkList } from '../../organisms/LinkList/LinkList';
import { MainPage } from '../MainPage';

type MarketPageProps = WithTranslation;

interface MarketPathParams {
  marketAddress: string;
}

export const MarketPageComponent: React.FC<MarketPageProps> = ({ t }) => {
  const { marketAddress } = useParams<MarketPathParams>();

  useEffect(() => {
    marketAddress && initMarketContract(marketAddress);
  }, [marketAddress]);

  const menuItems: ListItemLinkProps[] = [
    {
      to: `/market/${marketAddress}/create-question`,
      primary: t('createQuestionPage'),
    },
    {
      to: `/market/${marketAddress}/submit-bid`,
      primary: t('createBidPage'),
    },
    {
      to: `/market/${marketAddress}/withdraw-auction`,
      primary: t('withdrawAuctionWinningsPage'),
    },
    {
      to: `/market/${marketAddress}/buy-token`,
      primary: t('buyTokenPage'),
    },
    {
      to: `/market/${marketAddress}/close-market`,
      primary: t('closeMarketPage'),
    },
    {
      to: `/market/${marketAddress}/claim-winnings`,
      primary: t('claimWinningsPage'),
    },
  ];
  return (
    <MainPage title={t('availableMethods')}>
      <Paper elevation={0}>
        <LinkList list={menuItems} />
      </Paper>
    </MainPage>
  );
};

export const MarketPage = withTranslation(['common'])(MarketPageComponent);
