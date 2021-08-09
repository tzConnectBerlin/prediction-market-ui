import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { GridColDef } from '@material-ui/data-grid';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { Serie } from '@nivo/line';
import { useAuctionPriceChartData, useMarketBets } from '../../api/queries';
import { findBetByOriginator } from '../../api/utils';
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
import { multiplyUp, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { MainPage } from '../MainPage/MainPage';
import { TradeHistory } from '../../design-system/molecules/TradeHistory';
import { Address } from '../../design-system/atoms/Address/Address';
import { RenderCell, RenderHeading } from '../../design-system/molecules/TradeHistory/TradeHistory';
import { Market } from '../../interfaces';
import { LineChart } from '../../design-system/organisms/LineChart';
import { toChartData } from '../../utils/misc';

interface AuctionPageProps {
  market: Market;
}

export const AuctionPageComponent: React.FC<AuctionPageProps> = ({ market }) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const { addToast } = useToasts();
  const { data: bets } = useMarketBets(market.marketId);
  const { data: auctionData } = useAuctionPriceChartData();
  const { connected, activeAccount, connect } = useWallet();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPosition, setCurrentPosition] = useState<AuctionBid | undefined>(undefined);
  const [chartData, setChartData] = React.useState<Serie[] | undefined>(undefined);
  const [range, setRange] = React.useState<string | number>(7);

  const initialData: Serie[] = [
    {
      id: 'Yes',
      color: theme.palette.success.main,
      data: [],
    },
    {
      id: 'No',
      color: theme.palette.error.main,
      data: [],
    },
  ];

  const rangeSelectorProps = {
    defaultValue: 7,
    values: [
      {
        label: 'All',
        value: 'all',
      },
      {
        label: '1D',
        value: 1,
      },
      {
        label: '7D',
        value: 7,
      },
      {
        label: '30D',
        value: 30,
      },
      {
        label: '90D',
        value: 90,
      },
    ],
    onChange: setRange,
  };

  React.useEffect(() => {
    if (typeof auctionData !== 'undefined' && typeof auctionData[market.marketId] !== 'undefined') {
      const marketBidData = auctionData[market.marketId];

      const newData: Serie[] = toChartData(marketBidData, initialData, range);
      setChartData(newData);
    }
  }, [auctionData, market.marketId, range]);

  const columnList: GridColDef[] = [
    {
      field: 'block',
      headerName: isMobile ? 'Blk' : 'Block',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: isMobile ? undefined : 'center',
      renderCell: RenderCell,
      renderHeader: RenderHeading,
    },
    {
      field: 'address',
      headerName: isMobile ? 'Addr' : 'Address',
      flex: 1.5,
      align: 'center',
      headerAlign: isMobile ? undefined : 'center',
      // eslint-disable-next-line react/display-name
      renderCell: ({ value }) => {
        return (
          <Address address={value?.toString() ?? ''} trim trimSize="medium" copyIconSize="1.3rem" />
        );
      },
      renderHeader: RenderHeading,
    },
    {
      field: 'outcome',
      headerName: isMobile ? 'Prob' : 'Probability %',
      flex: 1.2,
      align: 'center',
      headerAlign: isMobile ? undefined : 'center',
      renderCell: RenderCell,
      renderHeader: RenderHeading,
    },
    {
      field: 'quantity',
      headerName: isMobile ? 'Qty' : 'Quantity',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: isMobile ? undefined : 'center',
      renderCell: RenderCell,
      renderHeader: RenderHeading,
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
    const account = activeAccount?.address ? activeAccount : await connect();
    if (account?.address) {
      try {
        await auctionBet(
          multiplyUp(values.probability / 100),
          tokenMultiplyUp(values.contribution),
          market.marketId,
          account.address,
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
    cardState: t('auctionPhase'),
    iconURL: market?.iconURL,
    cardStateProps: {
      fontColor: theme.palette.text.primary,
      backgroundColor: theme.palette.secondary.main,
    },
    stats: [
      {
        label: t('consensusProbability'),
        value: market?.yesPrice,
      },
      {
        label: t('participants'),
        value: bets ? bets.length : 0,
      },
      {
        label: t('volume'),
        value: `${market?.liquidity ?? 0} PMM`,
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
      <Grid container spacing={3} direction={isTablet ? 'column' : 'row'}>
        <Grid item mt={3} sm={10}>
          <MarketHeader {...marketHeaderData} />
        </Grid>

        <Grid item xs={12} sm={8} container spacing={3} direction="row">
          {chartData && (
            <Grid item sm={12} width="100%">
              <LineChart data={chartData} rangeSelector={rangeSelectorProps} />
            </Grid>
          )}
          <Grid item sm={12} xs={12}>
            <TradeHistory
              columns={columnList}
              rows={rows}
              autoPageSize
              title="Bid History"
              disableSelectionOnClick
              sortingOrder={['desc', 'asc', null]}
            />
          </Grid>
          <Grid item sm={12} mt="1rem">
            <MarketDetailCard {...marketDescription} />
          </Grid>
        </Grid>
        <Grid item sm={4} xs={10}>
          <SubmitBidCard {...submitCardData} currentPosition={currentPosition} />
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
