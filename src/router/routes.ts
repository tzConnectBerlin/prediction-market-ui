import { ComponentRoute } from '../interfaces';
import { CreateQuestionPage } from '../design-system/pages/CreateQuestion';

export const routes: ComponentRoute[] = [
  {
    path: '/create-question',
    component: CreateQuestionPage,
  },
  {
    path: '/',
    component: CreateQuestionPage,
  },
];
