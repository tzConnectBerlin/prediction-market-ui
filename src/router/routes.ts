import { ComponentRoute } from '../interfaces';
import { CreateMarketPage } from '../pages/CreateMarketPage/CreateMarketPage';
import { HomePage } from '../pages/HomePage/HomePage';

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
