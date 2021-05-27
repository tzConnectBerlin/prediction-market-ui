import React from 'react';
import { ComponentRoute } from '../interfaces';

const CreateMarketPage = React.lazy(() => import('../pages/CreateMarketPage/CreateMarketPage'));
const AuctionPage = React.lazy(() => import('../pages/AuctionPage/AuctionPage'));
const MarketPage = React.lazy(() => import('../pages/MarketPage/MarketPage'));

export const routes: ComponentRoute[] = [
  {
    path: '/market/:marketId',
    component: MarketPage,
  },
  {
    path: '/auction/:marketId',
    component: AuctionPage,
  },
  {
    path: '/market/create-market',
    component: CreateMarketPage,
  },
];
