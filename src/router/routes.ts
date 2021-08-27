import * as React from 'react';
import { ENABLE_MARKET_CREATION } from '../globals';
import { ComponentRoute } from '../interfaces';
import { AccountPage } from '../pages/AccountPage/AccountPage';
import { PortfolioPage } from '../pages/PortfolioPage/PortfolioPage';

const WrapperPage = React.lazy(() => import('../pages/WrapperPage/WrapperPage'));

const routes: ComponentRoute[] = [
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

if (ENABLE_MARKET_CREATION) {
  routes.push({
    path: '/create-market',
    component: React.lazy(() => import('../pages/CreateMarketPage/CreateMarketPage')),
  });
}

export { routes };
