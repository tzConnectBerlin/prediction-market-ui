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
import { MarketPage } from '../design-system/pages/MarketPage';

export const routes: ComponentRoute[] = [
  {
    path: '/market/:marketAddress/submit-bid',
    component: CreateBidPage,
  },
  {
    path: '/market/:marketAddress/create-question',
    component: CreateQuestionPage,
  },
  {
    path: '/market/:marketAddress/close-auction',
    component: CloseAuctionPage,
  },
  {
    path: '/market/:marketAddress/withdraw-auction',
    component: WithdrawAuctionPage,
  },
  {
    path: '/market/:marketAddress/buy-token',
    component: BuyTokenPage,
  },
  {
    path: '/market/:marketAddress/close-market',
    component: CloseMarketPage,
  },
  {
    path: '/market/:marketAddress/claim-winnings',
    component: ClaimWinningsPage,
  },
  {
    path: '/market/:marketAddress',
    component: MarketPage,
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
