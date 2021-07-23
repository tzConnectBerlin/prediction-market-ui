import { Grid, useTheme } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { GridColDef } from '@material-ui/data-grid';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { useAuctions, useMarketBets, useMarkets } from '../../api/queries';
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
import { ChartContainer } from '../../design-system/atoms/Chart';
import { logError } from '../../logger/logger';
import { multiplyUp, roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { getMarketStateLabel } from '../../utils/misc';
import { MainPage } from '../MainPage/MainPage';
import { MarketStateType } from '../../interfaces';
import { TradeHistory } from '../../design-system/molecules/TradeHistory';
import { Address } from '../../design-system/atoms/Address/Address';

interface AuctionPageProps {
  marketId: string;
}

const chartOptions = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
      display: true,
      title: {
        display: true,
        text: 'Block No.',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Yes/No Price',
      },
    },
  },
};

export const AuctionPageComponent: React.FC = () => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const history = useHistory();
  const { addToast } = useToasts();
  const { marketId } = useParams<AuctionPageProps>();
  const { data } = useMarkets();
  const { data: bets } = useMarketBets(marketId);
  const { data: auctionData } = useAuctions();
  const { connected, activeAccount } = useWallet();
  const market = data ? findByMarketId(data, marketId) : undefined;
  const [currentPosition, setCurrentPosition] = useState<AuctionBid | undefined>(undefined);
  const [chartData, setChartData] = React.useState<any>(undefined);

  React.useEffect(() => {
    if (typeof auctionData !== 'undefined' && typeof auctionData[marketId] !== 'undefined') {
      const yes = auctionData[marketId].map((o) => o.yesPrice);
      const no = auctionData[marketId].map((o) => roundToTwo(1 - o.yesPrice));
      const defaultChartData = {
        labels: auctionData[marketId].map((o) => o.block),
        datasets: [
          {
            label: 'Yes',
            data: yes,
            borderColor: theme.palette.success.main,
            backgroundColor: theme.palette.success.main,
          },
          {
            label: 'No',
            data: no,
            borderColor: theme.palette.error.main,
            backgroundColor: theme.palette.error.main,
          },
        ],
      };
      setChartData(defaultChartData);
    }
  }, [auctionData, marketId]);

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

  const handleBidSubmission = async (values: AuctionBid, helpers: FormikHelpers<AuctionBid>) => {
    if (activeAccount?.address) {
      try {
        await auctionBet(
          multiplyUp(values.probability / 100),
          tokenMultiplyUp(values.contribution),
          marketId,
          activeAccount.address,
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
    tokenName: 'PMM',
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
        <Grid item xs={8} container spacing={3} direction="row">
          {chartData && (
            <Grid item xs={12}>
              <ChartContainer chartData={chartData} options={chartOptions} />
            </Grid>
          )}
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
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
