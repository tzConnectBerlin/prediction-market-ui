import React from 'react';
import { ComponentRoute } from '../interfaces';

const CreateMarketPage = React.lazy(() => import('../pages/CreateMarketPage/CreateMarketPage'));

export const routes: ComponentRoute[] = [
  {
    path: '/market/create-market',
    component: CreateMarketPage,
  },
];
