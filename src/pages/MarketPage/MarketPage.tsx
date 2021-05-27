import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { TradeHistory } from '../../design-system/molecules/TradeHistory';
import { ChartContainer } from '../../design-system/atoms/Chart';
import { TradeContainer } from '../../design-system/organisms/TradeForm';
import { MainPage } from '../MainPage/MainPage';

const StyledGridItem = styled(Grid)`
  max-width: 100% !important;
`;

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

const tradeHistoryData = {
  columns: [
    { field: 'date', headerName: 'Date', type: 'date', flex: 1 },
    { field: 'address', headerName: 'User Address', flex: 1.5 },
    { field: 'outcome', headerName: 'Outcome', flex: 1 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      flex: 0.8,
    },
  ],

  rows: [
    {
      id: 1,
      date: '5 MAR 2021',
      address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
      outcome: 'no',
      quantity: 200,
    },
    {
      id: 2,
      date: '4 MAR 2021',
      address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
      outcome: 'yes',
      quantity: 20,
    },
    {
      id: 3,
      date: '3 MAR 2021',
      address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
      outcome: 'no',
      quantity: 50,
    },
    {
      id: 4,
      date: '2 MAR 2021',
      address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
      outcome: 'yes',
      quantity: 100,
    },
  ],
  hideFooterPagination: true,
};

export const MarketPageComponent: React.FC = () => {
  const theme = useTheme();
  const priceHistoryData = {
    chartData: {
      labels: ['3 MAR 2021', '4 MAR 2021', '5 MAR 2021', '6 MAR 2021', '7 MAR 2021'],
      datasets: [
        {
          label: 'Yes',
          data: [1, 2, 3, 2.5, 4],
          borderColor: theme.palette.success.main,
          backgroundColor: theme.palette.success.main,
          yAxisID: 'y',
        },
        {
          label: 'No',
          data: [20, 35, 25, 15, 17],
          borderColor: theme.palette.error.main,
          backgroundColor: theme.palette.error.main,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: { display: true, text: 'Yes' },
          grid: {
            borderColor: 'transparent',
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: { display: true, text: 'No' },
          grid: {
            borderColor: 'transparent',
            drawOnChartArea: false,
          },
        },
      },
    },
    chartTitle: 'Price History',
  };
  return (
    <MainPage>
      <Grid container spacing={3}>
        <Grid item mt={3} xs={12}>
          <MarketHeader {...marketHeaderData} />
        </Grid>
        <Grid container item xs={8} spacing={3} direction="column">
          <StyledGridItem item xs={12}>
            <ChartContainer {...priceHistoryData} />
          </StyledGridItem>
          <StyledGridItem item xs={12}>
            <TradeHistory {...tradeHistoryData} />
          </StyledGridItem>
          <StyledGridItem item xs={12}>
            <MarketDetailCard {...marketDescription} />
          </StyledGridItem>
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
