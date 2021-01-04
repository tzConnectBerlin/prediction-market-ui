import { ComponentRoute } from '../interfaces';
import { CreateQuestionPage } from '../design-system/pages/CreateQuestionPage';
import { CreateBidPage } from '../design-system/pages/CreateBidPage';
import { HomePage } from '../design-system/pages/HomePage';
import { CloseAuctionPage } from '../design-system/pages/CloseAuctionPage';
import { WithdrawAuctionPage } from '../design-system/pages/WithdrawAuctionPage';
import { BuyTokenPage } from '../design-system/pages/BuyTokenPage';
import { CloseMarketPage } from '../design-system/pages/CloseMarketPage';
import { ClaimWinningsPage } from '../design-system/pages/ClaimWinningsPage';
import { SimilarMarketsPage } from '../design-system/pages/SimilarMarketsPage';

export const routes: ComponentRoute[] = [
  {
    path: '/submit-bid',
    component: CreateBidPage,
  },
  {
    path: '/create-question',
    component: CreateQuestionPage,
  },
  {
    path: '/close-auction',
    component: CloseAuctionPage,
  },
  {
    path: '/withdraw-auction',
    component: WithdrawAuctionPage,
  },
  {
    path: '/buy-token',
    component: BuyTokenPage,
  },
  {
    path: '/close-market',
    component: CloseMarketPage,
  },
  {
    path: '/claim-winnings',
    component: ClaimWinningsPage,
  },
  {
    path: '/similar',
    component: SimilarMarketsPage,
  },
  {
    path: '/',
    component: HomePage,
  },
];
