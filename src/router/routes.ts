import { ComponentRoute } from '../interfaces';
import { CreateQuestionPage } from '../design-system/pages/CreateQuestionPage';
import { CreateBidPage } from '../design-system/pages/CreateBidPage';
import { QuestionPage } from '../design-system/pages/QuestionPage';
import { MarketPage } from '../design-system/pages/MarketPage';
import { MarketCardPage } from '../design-system/pages/MarketCardPage';

export const routes: ComponentRoute[] = [
  {
    path: '/market/:marketAddress/question/:questionHash/submit-bid',
    component: CreateBidPage,
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
    path: '/',
    component: MarketCardPage,
  },
];
