import { ComponentRoute } from '../interfaces';
import { CreateQuestionPage } from '../design-system/pages/CreateQuestion';
import { CreateBidPage } from '../design-system/pages/CreateBidPage';
import { HomePage } from '../design-system/pages/HomePage';
import { CloseAuctionPage } from '../design-system/pages/CloseAuctionPage';
import { WithdrawAuctionPage } from '../design-system/pages/WithdrawAuctionPage';

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
    path: '/',
    component: HomePage,
  },
];
