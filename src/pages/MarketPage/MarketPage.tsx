import React from 'react';
import { Grid } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { TradeContainer } from '../../design-system/organisms/TradeForm';
import { MainPage } from '../MainPage/MainPage';

export const MarketPageComponent: React.FC = () => {
  const marketHeaderData: MarketHeaderProps = {
    title: 'Will Biden be the President of the United States on May 1, 2021?',
    cardState: 'Market',
    closeDate: 'Closed',
    iconURL: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
    cardStateProps: {
      backgroundVariant: 'secondary',
      backgroundColor: 'main',
    },
    stats: [
      {
        label: 'Consensus Probability',
        value: '0.50',
      },
      {
        label: 'Participants',
        value: '1',
      },
    ],
  };

  const marketDescription = {
    title: 'About Market',
    items: [
      {
        title: 'Description',
        item: {
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'.repeat(20),
          expandActionText: 'Read more',
          shrinkActionText: 'Read less',
        },
      },
      {
        title: 'Ticker',
        item: '$TZBDN',
      },
    ],
  };

  return (
    <MainPage>
      <Grid container spacing={3}>
        <Grid item mt={3} xs={12}>
          <MarketHeader {...marketHeaderData} />
        </Grid>
        <Grid item xs={8}>
          <MarketDetailCard {...marketDescription} />
        </Grid>
        <Grid item xs={4}>
          <TradeContainer />
        </Grid>
      </Grid>
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
