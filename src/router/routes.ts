import { ComponentRoute } from '../interfaces';
import { CreateMarketPage } from '../pages/CreateMarketPage/CreateMarketPage';
import { AccountPage } from '../pages/AccountPage/AccountPage';
import { HomePage } from '../pages/HomePage/HomePage';

export const routes: ComponentRoute[] = [
  {
    path: '/market/create-market',
    component: CreateMarketPage,
  },
  {
    path: '/account',
    component: AccountPage,
  },
  {
    path: '/',
    component: HomePage,
  },
];
