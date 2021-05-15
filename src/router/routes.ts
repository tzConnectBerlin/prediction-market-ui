import { ComponentRoute } from '../interfaces';
import { CreateMarketPage } from '../design-system/pages/CreateMarketPage/CreateMarketPage';
import { HomePage } from '../design-system/pages/HomePage/HomePage';

export const routes: ComponentRoute[] = [
  {
    path: '/market/create-market',
    component: CreateMarketPage,
  },
  {
    path: '/',
    component: HomePage,
  },
];
