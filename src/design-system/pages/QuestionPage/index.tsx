/* eslint-disable react/display-name */
import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getCurrentMarketAddress, initMarketContract } from '../../../contracts/Market';
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
  useEffect(() => {
    const currentAddress = getCurrentMarketAddress();
    if (marketAddress && currentAddress && marketAddress !== currentAddress) {
      initMarketContract(marketAddress);
    }
  }, [marketAddress]);

  const menuItems: ListItemLinkProps[] = [
    {
      to: `/market/${marketAddress}/question/${questionHash}/submit-bid`,
      primary: t('createBidPage'),
    },
    {
      to: `/market/${marketAddress}/question/${questionHash}/withdraw-auction`,
      primary: t('withdrawAuctionWinningsPage'),
    },
    {
      to: `/market/${marketAddress}/question/${questionHash}/buy-token`,
      primary: t('buyTokenPage'),
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
  return (
    <MainPage title={t('availableMethods')}>
      <Paper elevation={0}>
        <LinkList list={menuItems} />
      </Paper>
    </MainPage>
  );
};

export const QuestionPage = withTranslation(['common'])(QuestionPageComponent);
