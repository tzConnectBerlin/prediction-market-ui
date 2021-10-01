import React, { useEffect, useState } from 'react';
import { Grid, Skeleton, useMediaQuery, useTheme } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { GridCellParams, GridColDef } from '@material-ui/data-grid';
import { Serie } from '@nivo/line';
import { useQueryClient } from 'react-query';
import { format } from 'date-fns-tz';
import { useAuctionPriceChartData, useMarketBets } from '../../api/queries';
import { findBetByOriginator } from '../../api/utils';
import { auctionBet, closeAuction } from '../../contracts/Market';
import { TwitterShare } from '../../design-system/atoms/TwitterShare';
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
import { RenderHeading } from '../../design-system/molecules/TradeHistory/TradeHistory';
import { Market } from '../../interfaces';
import { LineChart } from '../../design-system/organisms/LineChart';
import { getMarketLocalStorage, toChartData } from '../../utils/misc';
import { Typography } from '../../design-system/atoms/Typography';
import { queuedItems } from '../../utils/queue/queue';
import { ActionBox } from '../../design-system/organisms/ActionBox';
import { CURRENCY_SYMBOL, DATETIME_FORMAT } from '../../globals';
import { useConditionalWallet } from '../../wallet/hooks';

interface AuctionPageProps {
  market: Market;
}

interface TableRow {
  id: number;
  block: number;
  address: string;
  outcome: number;
  quantity: number;
}

export const AuctionPageComponent: React.FC<AuctionPageProps> = ({ market }) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { data: bets } = useMarketBets(market.marketId);
  const { data: auctionData } = useAuctionPriceChartData();
  const { connected, activeAccount, connect } = useConditionalWallet();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPosition, setCurrentPosition] = useState<AuctionBid | undefined>(undefined);
  const [chartData, setChartData] = React.useState<Serie[] | undefined>(undefined);
  const [range, setRange] = React.useState<string | number>(7);
  const [pendingTx, setPendingTx] = React.useState(false);
  const [rows, setRows] = React.useState<TableRow[]>([]);

  const initialData: Serie[] = React.useMemo(
    () => [
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
    ],
    [theme.palette.error.main, theme.palette.success.main],
  );

  const rangeSelectorProps = React.useMemo(
    () => ({
      defaultValue: 7,
      values: [
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
        {
          label: 'All',
          value: 'all',
        },
      ],
      onChange: setRange,
    }),
    [],
  );

  React.useEffect(() => {
    if (typeof auctionData !== 'undefined' && typeof auctionData[market.marketId] !== 'undefined') {
      const marketBidData = auctionData[market.marketId];

      const newData: Serie[] = toChartData(marketBidData, initialData, range);
      setChartData(newData);
    }
    // Do not add initialData to the dep array. it breaks the chart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionData, market.marketId, range]);

  const RenderCellCallback = React.useCallback(
    ({ id, value, row }: GridCellParams) => {
      return (
        <Typography size="body1">
          {(pendingTx && activeAccount?.address && activeAccount.address === row.address) ||
          id === 0 ? (
            <Skeleton width="5rem" />
          ) : (
            value
          )}
        </Typography>
      );
    },
    [activeAccount?.address, pendingTx],
  );

  const columnList: GridColDef[] = React.useMemo(() => {
    return [
      {
        field: 'block',
        headerName: 'Block',
        type: 'number',
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        renderCell: RenderCellCallback,
        renderHeader: RenderHeading,
      },
      {
        field: 'address',
        headerName: 'Address',
        flex: 1.5,
        align: 'left',
        headerAlign: 'left',
        // eslint-disable-next-line react/display-name
        renderCell: ({ value, id }) => {
          if (id === 0) {
            return (
              <Typography>
                <Skeleton width="5rem" />
              </Typography>
            );
          }
          return (
            <Address
              address={value?.toString() ?? ''}
              trim
              trimSize={isMobile ? 'small' : 'medium'}
              copyIconSize="1.3rem"
              hasCopyIcon={!isMobile}
            />
          );
        },
        renderHeader: RenderHeading,
      },
      {
        field: 'outcome',
        headerName: 'Probability %',
        flex: 1.2,
        align: 'left',
        headerAlign: 'left',
        renderCell: RenderCellCallback,
        renderHeader: RenderHeading,
      },
      {
        field: 'quantity',
        headerName: 'Quantity',
        type: 'number',
        flex: 1,
        align: 'left',
        headerAlign: 'left',
        renderCell: RenderCellCallback,
        renderHeader: RenderHeading,
      },
    ];
  }, [RenderCellCallback, isMobile]);

  useEffect(() => {
    const newRowData = !bets
      ? []
      : bets.map((bet, index) => ({
          id: index + 1,
          block: bet.block,
          address: bet.originator,
          outcome: bet.probability,
          quantity: tokenDivideDown(bet.quantity),
        }));

    newRowData.sort((a, b) => b.block - a.block);

    if (pendingTx) {
      const hasAddress = newRowData.findIndex((o) => o.address === activeAccount?.address);
      hasAddress === -1 &&
        newRowData.unshift({
          id: 0,
          address: '',
          block: -1,
          outcome: 0,
          quantity: 0,
        });
    }
    setRows(newRowData);
  }, [bets, pendingTx, activeAccount?.address]);

  const handleBidSubmission = React.useCallback(
    async (values: AuctionBid, helpers: FormikHelpers<AuctionBid>) => {
      if (activeAccount?.address) {
        try {
          const hash = await auctionBet(
            multiplyUp(values.probability / 100),
            tokenMultiplyUp(Number(values.contribution)),
            market.marketId,
            activeAccount.address,
          );
          if (hash) {
            setPendingTx(true);
            queuedItems(hash, async () => {
              setTimeout(async () => {
                await queryClient.invalidateQueries(['marketBet', market.marketId]);
                await queryClient.invalidateQueries('allAuctionMarkets');
                setPendingTx(false);
              }, 10000);
            });
            addToast(t('txSubmitted'), {
              appearance: 'success',
              autoDismiss: true,
            });
            helpers.resetForm();
          }
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount, addToast, connect, market.marketId, queryClient, t],
  );

  const submitCardData: SubmitBidCardProps = {
    tokenName: CURRENCY_SYMBOL,
    handleSubmit: handleBidSubmission,
    connected,
    initialValues: {
      contribution: '',
      probability: 50,
    },
  };
  const handleCloseAuction = React.useCallback(
    async (id: string) => {
      if (activeAccount?.address && id) {
        try {
          await closeAuction(id, true);
          getMarketLocalStorage(true, market.marketId, market.state, 'true');
          addToast(t('txSubmitted'), {
            appearance: 'success',
            autoDismiss: true,
          });
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      }
    },
    [activeAccount?.address, addToast, market.marketId, market.state, t],
  );
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
  const marketHeaderData = React.useMemo(() => {
    const marketHeader: MarketHeaderProps = {
      title: market?.question ?? '',
      cardState: t('auctionPhase'),
      iconURL: market?.iconURL,
      iconSize: isTablet ? 'xxl' : 'max',
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
      ],
    };
    if (typeof marketHeader.stats !== 'undefined') {
      if (market.weekly) {
        marketHeader.stats.push({
          label: t('weekly'),
          value: `+${market.weekly.change}%`,
          tokenType: market.weekly.tokenType,
        });
      }
      marketHeader.stats.push({
        label: t('liquidity'),
        value: `${market?.liquidity ?? 0} ${CURRENCY_SYMBOL}`,
      });
    }
    return marketHeader;
  }, [
    bets,
    market?.iconURL,
    market?.liquidity,
    market?.question,
    market.weekly,
    market?.yesPrice,
    t,
    theme.palette.secondary.main,
    theme.palette.text.primary,
    isTablet,
  ]);

  const marketDescription = React.useMemo(() => {
    const date = format(new Date(market.auctionEndDate), DATETIME_FORMAT.LONG_FORMAT);
    return {
      title: t('marketDetails'),
      items: [
        {
          title: t('resolutionDetails'),
          item: {
            text: market?.description ?? '',
            expandActionText: t('readMore'),
            shrinkActionText: t('readLess'),
          },
        },
        {
          title: t('expectedDate'),
          item: date ?? '',
        },
        {
          title: t('adjudicator'),
          item: market?.adjudicator ?? '',
        },
        {
          title: t('ticker'),
          item: `$${market?.ticker ?? 'NOTICKER'}`,
        },
      ],
    };
  }, [market?.adjudicator, market.auctionEndDate, market?.description, market?.ticker, t]);

  const CloseMarketDetails = React.useMemo(
    () => ({
      marketId: market.marketId,
      adjudicator: market.adjudicator,
      winningPrediction: market.winningPrediction,
      marketPhase: market.state,
      handleCloseAuction,
      auctionParticipant: !!currentPosition,
    }),
    [
      handleCloseAuction,
      market.adjudicator,
      market.marketId,
      market.state,
      market.winningPrediction,
      currentPosition,
    ],
  );

  return (
    <MainPage description={market.question}>
      <Grid container spacing={{ md: 3 }} direction={isTablet ? 'column' : 'row'}>
        <Grid item mt={3} mb={{ xs: 5, md: 0 }} sm={10}>
          <MarketHeader {...marketHeaderData} />
        </Grid>

        <Grid item xs={12} sm={8} container spacing={3} direction="row">
          {chartData && (
            <Grid item sm={12} width="100%">
              <LineChart data={chartData} rangeSelector={rangeSelectorProps} />
            </Grid>
          )}
          {!isTablet && (
            <Grid item sm={12} xs={12}>
              <TradeHistory
                columns={columnList}
                rows={rows}
                autoPageSize
                title={t('bidHistory')}
                disableSelectionOnClick
                sortingOrder={['desc', 'asc', null]}
              />
            </Grid>
          )}
        </Grid>
        {isTablet && (
          <Grid item sm={12} xs={12} order={2} marginTop="1.5rem">
            <TradeHistory
              columns={columnList.map((column) => ({
                ...column,
                sortable: false,
                minWidth: 100,
              }))}
              rows={rows}
              autoPageSize
              title={t('bidHistory')}
              disableSelectionOnClick
              headerHeight={isTablet ? 35 : undefined}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={8} order={3} marginTop={isTablet ? '1.5rem' : '0'}>
          <MarketDetailCard {...marketDescription} />
          {isTablet && <TwitterShare text={window.location.href} />}
        </Grid>
        <Grid item sm={4} xs={10} order={1} marginTop={isTablet ? '1.5rem' : 'initial'}>
          {!!currentPosition &&
            new Date() >= new Date(market.auctionEndDate) &&
            !getMarketLocalStorage(false, market.marketId, market.state) && (
              <ActionBox {...CloseMarketDetails} />
            )}
          <SubmitBidCard {...submitCardData} currentPosition={currentPosition} />
          {!isTablet && <TwitterShare text={window.location.href} />}
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
