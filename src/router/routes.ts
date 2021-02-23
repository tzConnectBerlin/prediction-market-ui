import { ComponentRoute } from '../interfaces';
import { CreateQuestionPage } from '../design-system/pages/CreateQuestionPage';
import { CreateBidPage } from '../design-system/pages/CreateBidPage';
import { HomePage } from '../design-system/pages/HomePage';
import { CloseAuctionPage } from '../design-system/pages/CloseAuctionPage';
import { WithdrawAuctionPage } from '../design-system/pages/WithdrawAuctionPage';
import { BuyTokenPage } from '../design-system/pages/BuyTokenPage';
import { ClaimWinningsPage } from '../design-system/pages/ClaimWinningsPage';
import { SimilarMarketsPage } from '../design-system/pages/SimilarMarketsPage';
import { QuestionPage } from '../design-system/pages/QuestionPage';
import { MarketPage } from '../design-system/pages/MarketPage';
import { SellTokenPage } from '../design-system/pages/SellTokenPage';

export const routes: ComponentRoute[] = [
  {
    path: '/market/:marketAddress/question/:questionHash/submit-bid',
    component: CreateBidPage,
  },
  {
    path: '/market/:marketAddress/question/:questionHash/close-auction',
    component: CloseAuctionPage,
  },
  {
    path: '/market/:marketAddress/question/:questionHash/withdraw-auction',
    component: WithdrawAuctionPage,
  },
  {
    path: '/market/:marketAddress/question/:questionHash/buy-token',
    component: BuyTokenPage,
  },
  {
    path: '/market/:marketAddress/question/:questionHash/sell-token',
    component: SellTokenPage,
  },
  {
    path: '/market/:marketAddress/question/:questionHash/claim-winnings',
    component: ClaimWinningsPage,
  },
  {
    path: '/market/:marketAddress/question/:questionHash',
    component: QuestionPage,
  },
  {
    path: '/market/:marketAddress/create-question',
    component: CreateQuestionPage,
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
