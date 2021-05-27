import { Grid } from '@material-ui/core';
import React from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useMarketBets, useMarkets } from '../../api/queries';
import { findByMarketId } from '../../api/utils';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { SubmitBidCard } from '../../design-system/organisms/SubmitBidCard';
import { getMarketStateLabel } from '../../utils/misc';
import { MainPage } from '../MainPage/MainPage';

interface AuctionPageProps {
  marketId: string;
}

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
  const { t } = useTranslation(['common']);
  const { marketId } = useParams<AuctionPageProps>();
  const { data } = useMarkets();
  const { data: bets } = useMarketBets(marketId);
  const market = data ? findByMarketId(data, marketId) : undefined;
  const marketHeaderData: MarketHeaderProps = {
    title: market?.question ?? '',
    cardState: t(market?.state ?? ''),
    closeDate: market ? getMarketStateLabel(market, t) : '',
    iconURL: market?.iconURL,
    cardStateProps: {
      backgroundVariant: 'secondary',
      backgroundColor: 'main',
    },
    stats: [
      {
        label: 'Consensus Probability',
        value: market?.yesPrice,
      },
      {
        label: 'Participants',
        value: bets ? bets.length : 0,
      },
    ],
  };

  const marketDescription = {
    title: 'About Market',
    items: [
      {
        title: 'Description',
        item: {
          text: market?.description ?? '',
          expandActionText: 'Read more',
          shrinkActionText: 'Read less',
        },
      },
      {
        title: 'Ticker',
        item: `$${market?.ticker ?? 'NOTICKER'}`,
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
          <SubmitBidCard {...submitCardData} />
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
