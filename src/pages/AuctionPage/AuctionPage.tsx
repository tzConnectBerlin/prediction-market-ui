import { Grid } from '@material-ui/core';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { SubmitBidCard } from '../../design-system/organisms/SubmitBidCard';
import { MainPage } from '../MainPage/MainPage';

interface AuctionPageProps {
  ipfsHash: string;
}

const marketHeaderData: MarketHeaderProps = {
  title: 'Will Biden be the President of the United States on May 1, 2021?',
  cardState: 'Auction',
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

const submitCardData = {
  tokenName: 'USDtz',
  handleSubmit: (values: any) => console.log(values),
  connected: true,
  currentPosition: {
    contribution: 50,
    probability: 50,
  },
  initialValues: {
    contribution: 100,
    probability: 50,
  },
};

export const AuctionPageComponent: React.FC = () => {
  const { ipfsHash } = useParams<AuctionPageProps>();
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
          <SubmitBidCard {...submitCardData} />
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
