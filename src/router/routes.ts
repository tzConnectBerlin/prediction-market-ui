import * as React from 'react';
import { ENABLE_MARKET_CREATION, WERT_PARTNER_ID, MARKET_CREATOR } from '../globals';
import { ComponentRoute } from '../interfaces';
import { BuyTezosPage } from '../pages/BuyTezos/BuyTezos';
import { PortfolioPage } from '../pages/PortfolioPage/PortfolioPage';

const WrapperPage = React.lazy(() => import('../pages/WrapperPage/WrapperPage'));

const routes: ComponentRoute[] = [
  {
    path: '/portfolio',
    component: PortfolioPage,
  },
  {
    path: '/market/:marketId?/:marketName',
    component: WrapperPage,
  },
];

if (WERT_PARTNER_ID) {
  routes.push({
    path: '/buy-tezos',
    component: BuyTezosPage,
  });
}

if (ENABLE_MARKET_CREATION || MARKET_CREATOR) {
  routes.push({
    path: '/create-market',
    component: React.lazy(() => import('../pages/CreateMarketPage/CreateMarketPage')),
  });
}

export { routes };
