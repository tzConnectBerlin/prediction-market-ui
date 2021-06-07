import { Card, CardContent, CardHeader, Grid, useTheme } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { GridColDef } from '@material-ui/data-grid';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { useMarketBets, useMarkets } from '../../api/queries';
import { findBetByOriginator, findByMarketId } from '../../api/utils';
import { auctionBet, closeAuction } from '../../contracts/Market';
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
import { multiplyUp, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { getMarketStateLabel } from '../../utils/misc';
import { MainPage } from '../MainPage/MainPage';
import { Typography } from '../../design-system/atoms/Typography';
import { CustomButton } from '../../design-system/atoms/Button';
import { MarketStateType } from '../../interfaces';
import { TradeHistory } from '../../design-system/molecules/TradeHistory';
import { Address } from '../../design-system/atoms/Address/Address';
import { queuedItems } from '../../utils/queue';

interface AuctionPageProps {
  marketId: string;
}

export const AuctionPageComponent: React.FC = () => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const history = useHistory();
  const { addToast } = useToasts();
  const { marketId } = useParams<AuctionPageProps>();
  const { data } = useMarkets();
  const { data: bets } = useMarketBets(marketId);
  const { connected, activeAccount } = useWallet();
  const [additional, setAdditional] = React.useState(false);
  const market = data ? findByMarketId(data, marketId) : undefined;
  const [currentPosition, setCurrentPosition] = useState<AuctionBid | undefined>(undefined);

  const columnList: GridColDef[] = [
    {
      field: 'block',
      headerName: 'Block',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1.5,
      align: 'center',
      headerAlign: 'center',
      // eslint-disable-next-line react/display-name
      renderCell: ({ value }) => {
        return (
          <Address address={value?.toString() ?? ''} trim trimSize="large" copyIconSize="1.3rem" />
        );
      },
    },
    {
      field: 'outcome',
      headerName: 'Probability %',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      flex: 0.8,
      align: 'center',
      headerAlign: 'center',
    },
  ];

  const rows = !bets
    ? []
    : bets.map((bet, index) => ({
        id: index,
        block: bet.block,
        address: bet.originator,
        outcome: bet.probability,
        quantity: tokenDivideDown(bet.quantity),
      }));

  useEffect(() => {
    if (activeAccount?.address || connected) {
      setAdditional(true);
    } else {
      setAdditional(false);
    }
  }, [activeAccount?.address, connected]);

  const handleBidSubmission = async (values: AuctionBid, helpers: FormikHelpers<AuctionBid>) => {
    if (activeAccount?.address) {
      let hash;
      try {
        await auctionBet(
          multiplyUp(values.probability / 100),
          tokenMultiplyUp(values.contribution),
          marketId,
          activeAccount.address,
        ).then((trans) => {
          hash = trans;
        });
        addToast(t('txSubmitted'), {
          appearance: 'success',
          autoDismiss: true,
        });
        helpers.resetForm();
        queuedItems(hash);
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

  const handleCloseAuction = async () => {
    if (activeAccount?.address && marketId) {
      try {
        await closeAuction(marketId);
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
    connected,
    initialValues: {
      contribution: 100,
      probability: 50,
    },
  };
  useEffect(() => {
    if (typeof bets !== 'undefined' && activeAccount?.address) {
      const currentBet = findBetByOriginator(bets, activeAccount.address);
      if (currentBet) {
        setCurrentPosition({
          contribution: tokenDivideDown(currentBet.quantity),
          probability: currentBet.probability,
        });
      }
    } else {
      setCurrentPosition(undefined);
    }
  }, [bets, activeAccount?.address, connected]);
  const marketHeaderData: MarketHeaderProps = {
    title: market?.question ?? '',
    cardState: t(market?.state ?? ''),
    closeDate: market ? getMarketStateLabel(market, t) : '',
    iconURL: market?.iconURL,
    cardStateProps: {
      fontColor: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.main,
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

  if (market?.state === MarketStateType.marketBootstrapped) {
    history.push(`/market/${marketId}`);
    return <></>;
  }

  return (
    <MainPage>
      <Grid container spacing={3} direction="row">
        <Grid item mt={3} xs={12}>
          <MarketHeader {...marketHeaderData} />
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={12}>
            <TradeHistory
              columns={columnList}
              rows={rows}
              autoPageSize
              title="Bid History"
              disableSelectionOnClick
              sortingOrder={['desc', 'asc', null]}
            />
          </Grid>
          <Grid item xs={12} mt="1rem">
            <MarketDetailCard {...marketDescription} />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <SubmitBidCard {...submitCardData} currentPosition={currentPosition} />
          {additional && (
            <Grid item xs={12} mt="1rem">
              <Card>
                <CardHeader
                  title={
                    <Typography color="primary.main" component="h3">
                      Additional action(s)
                    </Typography>
                  }
                />
                <CardContent>
                  <Grid container spacing={3} direction="column">
                    <Grid item>
                      <CustomButton fullWidth label="Close Auction" onClick={handleCloseAuction} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
