import { Grid } from '@material-ui/core';
import format from 'date-fns/format';
import React from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useMarkets } from '../../api/queries';
import { findByMarketId } from '../../api/utils';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { SubmitBidCard } from '../../design-system/organisms/SubmitBidCard';
import { MarketStateType } from '../../interfaces';
import { DATETIME_FORMAT } from '../../utils/globals';
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
  const { data } = useMarkets();
  const { t } = useTranslation(['common']);
  const { marketId } = useParams<AuctionPageProps>();
  const market = data ? findByMarketId(data, marketId) : undefined;
  const marketHeaderData: MarketHeaderProps = {
    title: market?.question ?? '',
    cardState: t(market?.state ?? ''),
    closeDate:
      market?.state === MarketStateType.auctionRunning
        ? format(new Date(market.auctionEndDate), DATETIME_FORMAT.SHORT_FORMAT)
        : market?.state === MarketStateType.marketBootstrapped
        ? t('Active')
        : t('Closed'),
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
