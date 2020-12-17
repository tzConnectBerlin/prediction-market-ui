import { ComponentRoute } from '../interfaces';
import { CreateQuestionPage } from '../design-system/pages/CreateQuestion';
import { CreateBidPage } from '../design-system/pages/CreateBid';
import { HomePage } from '../design-system/pages/HomePage';

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
    path: '/',
    component: HomePage,
  },
];
