import { ComponentRoute } from '../interfaces';
import { CreateQuestionPage } from '../design-system/pages/CreateQuestion';
import { CreateBidPage } from '../design-system/pages/CreateBid';

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
    component: CreateQuestionPage,
  },
];
