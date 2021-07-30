import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { GridColDef } from '@material-ui/data-grid';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { ResponsiveLine, Serie } from '@nivo/line';
import { format } from 'date-fns';
import { useAuctionPriceChartData, useMarketBets, useMarkets } from '../../api/queries';
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
import { multiplyUp, roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { getMarketStateLabel } from '../../utils/misc';
import { MainPage } from '../MainPage/MainPage';
import { MarketStateType } from '../../interfaces';
import { TradeHistory } from '../../design-system/molecules/TradeHistory';
import { Address } from '../../design-system/atoms/Address/Address';
import { Typography } from '../../design-system/atoms/Typography';
import { RenderCell, RenderHeading } from '../../design-system/molecules/TradeHistory/TradeHistory';

interface AuctionPageProps {
  marketId: string;
  marketName?: string;
}

export const AuctionPageComponent: React.FC = () => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const history = useHistory();
  const { addToast } = useToasts();
  const { marketId, marketName } = useParams<AuctionPageProps>();
  const { data } = useMarkets();
  const { data: bets } = useMarketBets(marketId ?? marketName);
  const { data: auctionData } = useAuctionPriceChartData();
  const { connected, activeAccount } = useWallet();
  const market = data ? findByMarketId(data, marketId ?? marketName) : undefined;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPosition, setCurrentPosition] = useState<AuctionBid | undefined>(undefined);
  const [chartData, setChartData] = React.useState<Serie[] | undefined>(undefined);
  const cardLink = market?.question.toLowerCase().replaceAll(' ', '-').replaceAll('?', '');

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

  React.useEffect(() => {
    if (typeof auctionData !== 'undefined' && typeof auctionData[marketId] !== 'undefined') {
      const marketBidData = auctionData[marketId];

      const newData: Serie[] = marketBidData.reduce((acc, item) => {
        const x = format(new Date(item.bakedAt), 'd/MM HH:mm');
        acc[0].data.push({
          y: item.yesPrice,
          x,
        });
        acc[1].data.push({
          y: roundToTwo(1 - item.yesPrice),
          x,
        });

        return acc;
      }, initialData);
      setChartData(newData);
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
      renderCell: RenderCell,
      renderHeader: RenderHeading,
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
          <Address address={value?.toString() ?? ''} trim trimSize="medium" copyIconSize="1.3rem" />
        );
      },
      renderHeader: RenderHeading,
    },
    {
      field: 'outcome',
      headerName: 'Probability %',
      flex: 1.2,
      align: 'center',
      headerAlign: 'center',
      renderCell: RenderCell,
      renderHeader: RenderHeading,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
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
    cardState: t('auctionPhase'),
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

  // if (cardLink && marketName !== cardLink) {
  //   history.push(`/${marketId ?? marketName}/${cardLink}`);
  //   return <></>;
  // }

  return (
    <MainPage>
      <Grid container spacing={3} direction={isMobile ? 'column' : 'row'}>
        <Grid item mt={3} sm={10}>
          <MarketHeader {...marketHeaderData} />
        </Grid>

        <Grid item xs={12} sm={8} container spacing={3} direction="row">
          {chartData && (
            <Grid item sm={12} width="100%" height="30rem">
              <ResponsiveLine
                data={chartData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                colors={[theme.palette.success.main, theme.palette.error.main]}
                yScale={{
                  type: 'linear',
                  min: 'auto',
                  max: 'auto',
                  stacked: false,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 45,
                  legendOffset: 15,
                  legendPosition: 'middle',
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Yes/No Price',
                  legendOffset: -40,
                  legendPosition: 'middle',
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh
                enableGridX={false}
                legends={[
                  {
                    anchor: 'top-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </Grid>
          )}
          <Grid item sm={12}>
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
        <Grid item sm={4} xs={12}>
          <SubmitBidCard {...submitCardData} currentPosition={currentPosition} />
        </Grid>
      </Grid>
    </MainPage>
  );
};

const AuctionPage = withTranslation(['common', 'create-market'])(AuctionPageComponent);
export default AuctionPage;
