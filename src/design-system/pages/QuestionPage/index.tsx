import { Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { LocationDescriptorObject } from 'history';
import { withTranslation, WithTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getCurrentMarketAddress, initMarketContract } from '../../../contracts/Market';
import { QuestionEntryMDW, QuestionMetaData, QuestionStateType } from '../../../interfaces';
import { withRouteGuard } from '../../../utils/RouteGuard';
import { useWallet } from '../../../wallet/hooks';
import { ListItemLinkProps } from '../../atoms/ListItem';
import { Typography } from '../../atoms/Typography';
import { LinkList } from '../../organisms/LinkList/LinkList';
import { MainPage } from '../MainPage';

type QuestionPageProps = WithTranslation;

interface QuestionPagePathParams {
  marketAddress: string;
  questionHash: string;
}

interface QuestionPageLocationParams extends QuestionMetaData, QuestionEntryMDW {
  participants?: string[];
}

export const QuestionPageComponent: React.FC<QuestionPageProps> = ({ t }) => {
  const {
    wallet: { pkh: userAddress },
  } = useWallet();
  const { marketAddress, questionHash } = useParams<QuestionPagePathParams>();
  const { state } = useLocation<QuestionPageLocationParams>();
  const history = useHistory();
  const {
    owner,
    auctionEndDate,
    marketCloseDate,
    participants,
    auction_bids: auctionBids,
    state: contractState,
  } = state;
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
  const marketState = Object.keys(contractState)[0];
  if (marketState === QuestionStateType.questionAuctionOpen && currentDate <= auctionDate) {
    menuItems = [
      {
        to: { pathname: `/market/${marketAddress}/question/${questionHash}/submit-bid`, state },
        primary: t('createBidPage'),
      },
    ];
  }

  if (auctionBids && userAddress && Object.keys(auctionBids).includes(userAddress)) {
    menuItems.push({
      to: {
        pathname: `/market/${marketAddress}/question/${questionHash}/withdraw-auction`,
        state,
      },
      primary: t('withdrawAuctionWinningsPage'),
    });
  }

  if (currentDate > auctionDate && marketState === QuestionStateType.questionAuctionOpen) {
    menuItems.push({
      to: {
        pathname: `/market/${marketAddress}/question/${questionHash}/close-auction`,
        state,
      },
      primary: t('closeAuctionPage'),
    });
  }

  if (currentDate > auctionDate && marketState === QuestionStateType.questionAuctionWithdrawOpen) {
    menuItems.push({
      to: { pathname: `/market/${marketAddress}/question/${questionHash}/buy-token`, state },
      primary: t('buyTokenPage'),
    });
  }

  if (currentDate >= marketEndDate && userAddress && participants?.includes(userAddress)) {
    menuItems = [
      {
        to: { pathname: `/market/${marketAddress}/question/${questionHash}/claim-winnings`, state },
        primary: t('claimWinningsPage'),
      },
    ];
    if (owner === userAddress && marketState !== QuestionStateType.questionMarketClosed) {
      menuItems.push({
        to: { pathname: `/market/${marketAddress}/question/${questionHash}/close-market`, state },
        primary: t('closeMarketPage'),
      });
    }
  }

  menuItems.push({
    to: { pathname: `/market/${marketAddress}/question/${questionHash}/sell-token`, state },
    primary: t('sellTokenPage'),
  });

  if (menuItems.length === 1) {
    const { pathname } = menuItems[0].to as LocationDescriptorObject;
    history.push({ pathname, state: { ...state, backPath: '/' } });
    return <></>;
  }

  return (
    <MainPage title={t('availableMethods')}>
      <Paper elevation={0}>
        <LinkList list={menuItems} />
        {menuItems.length === 0 && <Typography>{t('nothingToSee')}</Typography>}
      </Paper>
    </MainPage>
  );
};

export const QuestionPage = withRouteGuard({ walletRequired: true, checkRouteAvailability: true })(
  withTranslation(['common'])(QuestionPageComponent),
);
