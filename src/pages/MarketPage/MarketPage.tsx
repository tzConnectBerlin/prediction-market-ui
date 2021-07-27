import React, { useEffect } from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { ResponsiveLine, Serie } from '@nivo/line';
import format from 'date-fns/format';
import { useMarketPriceChartData, useMarkets, useTokenByAddress } from '../../api/queries';
import { findByMarketId } from '../../api/utils';
import {
  getMarketStateLabel,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
} from '../../utils/misc';
import { logError } from '../../logger/logger';
import { Currency, MarketTradeType, TokenType } from '../../interfaces/market';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { MainPage } from '../MainPage/MainPage';
import { TradeContainer, TradeProps } from '../../design-system/organisms/TradeForm';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { Loading } from '../../design-system/atoms/Loading';
import { TradeValue } from '../../design-system/organisms/TradeForm/TradeForm';
import { ToggleButtonItems } from '../../design-system/molecules/FormikToggleButton/FormikToggleButton';
import { buyTokens, sellTokens } from '../../contracts/Market';
import { MARKET_ADDRESS } from '../../utils/globals';
import { closePosition } from '../../contracts/MarketCalculations';

interface MarketPageProps {
  marketId: string;
}

export const MarketPageComponent: React.FC = () => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const { addToast } = useToasts();
  const { marketId } = useParams<MarketPageProps>();
  const yesTokenId = getYesTokenId(marketId);
  const noTokenId = getNoTokenId(marketId);
  const { connected, activeAccount } = useWallet();
  const { data, isLoading } = useMarkets();
  const { data: priceValues } = useMarketPriceChartData(marketId);
  const [yesPrice, setYesPrice] = React.useState(0);
  const { data: poolTokenValues } = useTokenByAddress([yesTokenId, noTokenId], MARKET_ADDRESS);
  const { data: userTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId],
    activeAccount?.address,
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [chartData, setChartData] = React.useState<Serie[] | undefined>(undefined);
  const market = typeof data !== 'undefined' ? findByMarketId(data, marketId) : undefined;
  const yes = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : roundToTwo(yesPrice);
  const no = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : roundToTwo(1 - yesPrice);
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

  useEffect(() => {
    if (market) {
      setYesPrice(market.yesPrice);
    }
  }, [market]);

  React.useEffect(() => {
    if (typeof priceValues !== 'undefined') {
      const newData: Serie[] = priceValues.reduce((acc, item) => {
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
  }, [priceValues, marketId]);

  const handleTradeSubmission = async (values: TradeValue, helpers: FormikHelpers<TradeValue>) => {
    if (activeAccount?.address && poolTokenValues) {
      try {
        if (values.tradeType === MarketTradeType.buy) {
          await buyTokens(
            values.outcome,
            marketId,
            tokenMultiplyUp(values.quantity),
            activeAccount.address,
          );
        }
        if (values.tradeType === MarketTradeType.sell && userTokenValues && poolTokenValues) {
          const quantity = tokenMultiplyUp(values.quantity);
          const userYesBal = getTokenQuantityById(userTokenValues, yesTokenId);
          const userNoBal = getTokenQuantityById(userTokenValues, noTokenId);
          const canSellWithoutSwap = userYesBal >= quantity && userNoBal >= quantity;
          if (canSellWithoutSwap) {
            await sellTokens(values.outcome, marketId, quantity);
          } else {
            const yesPool = getTokenQuantityById(poolTokenValues, yesTokenId);
            const noPool = getTokenQuantityById(poolTokenValues, noTokenId);
            const [aPool, bPool] =
              values.outcome === TokenType.yes ? [yesPool, noPool] : [noPool, yesPool];
            const computed = closePosition(aPool, bPool, quantity);
            await sellTokens(
              values.outcome,
              marketId,
              computed.aLeft < quantity ? Math.floor(computed.aLeft) : quantity,
              Math.floor(computed.aToSwap),
            );
          }
        }
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
  const outcomeItems: ToggleButtonItems[] = React.useMemo(
    () => [
      {
        label: `${TokenType.yes}`,
        value: `${[yes, Currency.USD].join(' ')}`,
      },
      {
        label: `${TokenType.no}`,
        value: `${[no, Currency.USD].join(' ')}`,
        selectedColor: 'error',
      },
    ],
    [no, yes],
  );

  const marketHeaderData: MarketHeaderProps = {
    title: market?.question ?? '',
    cardState: t(market?.state ?? ''),
    closeDate: market ? getMarketStateLabel(market, t) : '',
    iconURL: market?.iconURL,
    stats: [
      ...outcomeItems,
      {
        label: t('volume'),
        value: [market?.volume, Currency.USD].join(' ') ?? 0,
      },
    ],
  };

  if (marketHeaderData.stats && typeof userTokenValues !== 'undefined') {
    marketHeaderData.stats.push({
      label: t('Yes/No Balance'),
      value: `${roundToTwo(
        tokenDivideDown(getTokenQuantityById(userTokenValues, yesTokenId)),
      )} / ${roundToTwo(tokenDivideDown(getTokenQuantityById(userTokenValues, noTokenId)))}`,
    });
  }

  if (market?.winningPrediction && marketHeaderData.stats) {
    marketHeaderData.stats.push({
      label: t('Winnings token'),
      value: market.winningPrediction.toUpperCase(),
    });
  }

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

  const tradeData: TradeProps = {
    connected: connected && !market?.winningPrediction,
    handleSubmit: handleTradeSubmission,
    initialValues: {
      outcome: TokenType.yes,
      quantity: 0,
    },
    outcomeItems,
    poolTokens: poolTokenValues,
    userTokens: userTokenValues,
    marketId,
  };

  return (
    <MainPage>
      {isLoading && <Loading />}
      {market && (
        <Grid container spacing={3} direction={isMobile ? 'column' : 'row'}>
          <Grid item mt={3} xs={12}>
            <MarketHeader {...marketHeaderData} />
          </Grid>
          <Grid item xs={12} sm={8} container spacing={3}>
            {chartData && (
              <Grid item xs={12} width="100%" height="30rem">
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
            <Grid item xs={12}>
              <MarketDetailCard {...marketDescription} />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <TradeContainer {...tradeData} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
