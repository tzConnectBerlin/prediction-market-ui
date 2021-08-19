import * as React from 'react';
import { ComponentRoute } from '../interfaces';
import { AccountPage } from '../pages/AccountPage/AccountPage';
import { PortfolioPage } from '../pages/PortfolioPage/PortfolioPage';

const CreateMarketPage = React.lazy(() => import('../pages/CreateMarketPage/CreateMarketPage'));
const WrapperPage = React.lazy(() => import('../pages/WrapperPage/WrapperPage'));

export const routes: ComponentRoute[] = [
  {
    path: '/create-market',
    component: CreateMarketPage,
  },
  {
    path: '/portfolio',
    component: PortfolioPage,
  },
  {
    path: '/account',
    component: AccountPage,
  },
  {
    path: '/market/:marketId?/:marketName',
    component: WrapperPage,
  },
];
