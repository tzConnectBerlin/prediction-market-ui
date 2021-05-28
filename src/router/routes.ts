import React from 'react';
import { ComponentRoute } from '../interfaces';
import { AccountPage } from '../pages/AccountPage/AccountPage';

const CreateMarketPage = React.lazy(() => import('../pages/CreateMarketPage/CreateMarketPage'));
const AuctionPage = React.lazy(() => import('../pages/AuctionPage/AuctionPage'));

export const routes: ComponentRoute[] = [
  {
    path: '/auction/:marketId',
    component: AuctionPage,
  },
  {
    path: '/market/create-market',
    component: CreateMarketPage,
  },
  {
    path: '/account',
    component: AccountPage,
  },
];
