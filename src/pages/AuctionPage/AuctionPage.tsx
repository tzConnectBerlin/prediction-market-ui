import { Grid } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useMarketBets, useMarkets } from '../../api/queries';
import { findBetByOriginator, findByMarketId } from '../../api/utils';
import { auctionBet } from '../../contracts/Market';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import {
  AuctionBid,
  SubmitBidCard,
  SubmitBidCardProps,
} from '../../design-system/organisms/SubmitBidCard';
import { logError } from '../../logger/logger';
import { multiplyUp, roundToTwo } from '../../utils/math';
import { getMarketStateLabel } from '../../utils/misc';
import { useWallet } from '../../wallet/hooks';
import { MainPage } from '../MainPage/MainPage';

interface AuctionPageProps {
  marketId: string;
}

export const AuctionPageComponent: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useToasts();
  const { marketId } = useParams<AuctionPageProps>();
  const { data } = useMarkets();
  const { data: bets } = useMarketBets(marketId);
  const {
    wallet: { pkh: userAddress },
  } = useWallet();
  const market = data ? findByMarketId(data, marketId) : undefined;
  const [currentPosition, setCurrentPosition] = useState<AuctionBid | undefined>(undefined);
  const handleBidSubmission = async (values: AuctionBid, helpers: FormikHelpers<AuctionBid>) => {
    if (userAddress) {
      try {
        await auctionBet(
          multiplyUp(values.probability / 100),
          values.contribution,
          marketId,
          userAddress,
        );
        addToast(t('txSubmitted'), {
          appearance: 'success',
          autoDismiss: true,
        });
        helpers.resetForm();
      } catch (error) {
        logError(error);
        const errorText = error?.data[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  };
  const submitCardData: SubmitBidCardProps = {
    tokenName: 'USDtz',
    handleSubmit: handleBidSubmission,
    connected: !!userAddress,
    initialValues: {
      contribution: 100,
      probability: 50,
    },
  };
  useEffect(() => {
    if (typeof bets !== 'undefined' && userAddress) {
      const currentBet = findBetByOriginator(bets, userAddress);
      if (currentBet) {
        setCurrentPosition({
          contribution: currentBet.quantity,
          probability: roundToTwo(currentBet.probability * 100),
        });
      }
    } else {
      setCurrentPosition(undefined);
    }
  }, [bets, userAddress]);
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
      {
        title: 'Adjudicator',
        item: market?.adjudicator ?? '',
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
          <SubmitBidCard {...submitCardData} currentPosition={currentPosition} />
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
