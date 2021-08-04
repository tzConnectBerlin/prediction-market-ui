import React, { useEffect } from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { FormikHelpers } from 'formik';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { ResponsiveLine, Serie } from '@nivo/line';
import format from 'date-fns/format';
import { useMarketPriceChartData, useTokenByAddress } from '../../api/queries';
import {
  getMarketStateLabel,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
} from '../../utils/misc';
import { logError } from '../../logger/logger';
import { FormType, Market, MarketTradeType, TokenType } from '../../interfaces/market';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { MainPage } from '../MainPage/MainPage';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { TradeValue } from '../../design-system/organisms/TradeForm/TradeForm';
import { ToggleButtonItems } from '../../design-system/molecules/FormikToggleButton/FormikToggleButton';
import { buyTokens, sellTokens, swapLiquidity } from '../../contracts/Market';
import { MARKET_ADDRESS } from '../../utils/globals';
import { closePosition } from '../../contracts/MarketCalculations';
import { TwitterShare } from '../../design-system/atoms/TwitterShare';
import { TradeContainer, TradeProps } from '../../design-system/organisms/TradeForm';
import { LiquidityContainer } from '../../design-system/organisms/LiquidityForm';
import {
  LiquidityFormProps,
  LiquidityValue,
} from '../../design-system/organisms/LiquidityForm/LiquidityForm';
import { MarketPositionProps } from '../../design-system/molecules/MarketPosition/MarketPosition';

interface MarketPageProps {
  market: Market;
}

export const MarketPageComponent: React.FC<MarketPageProps> = ({ market }) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const { addToast } = useToasts();
  const content = (
    <>
      <div>{t('txSubmitted')}</div>
      <TwitterShare color="grey" />
    </>
  );
  const yesTokenId = getYesTokenId(market.marketId);
  const noTokenId = getNoTokenId(market.marketId);
  const { connected, activeAccount, connect } = useWallet();
  const { data: priceValues } = useMarketPriceChartData(market.marketId);
  const [yesPrice, setYesPrice] = React.useState(0);
  const { data: poolTokenValues } = useTokenByAddress([yesTokenId, noTokenId], MARKET_ADDRESS);
  const { data: userTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId],
    activeAccount?.address,
  );

  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [chartData, setChartData] = React.useState<Serie[] | undefined>(undefined);
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
        const x = format(new Date(item.bakedAt), 'd/MM p');
        acc[0].data.push({
          y: item.yesPrice * 100,
          x,
        });
        acc[1].data.push({
          y: roundToTwo(1 - item.yesPrice) * 100,
          x,
        });

        return acc;
      }, initialData);
      setChartData(newData);
    }
  }, [priceValues, market.marketId]);

  const handleTradeSubmission = async (values: TradeValue, helpers: FormikHelpers<TradeValue>) => {
    const account = activeAccount?.address ? activeAccount : await connect();
    if (account?.address && poolTokenValues) {
      try {
        if (values.tradeType === MarketTradeType.payIn) {
          await buyTokens(
            values.outcome,
            market.marketId,
            tokenMultiplyUp(Number(values.quantity)),
            account.address,
          );
        }
        if (values.tradeType === MarketTradeType.payOut && userTokenValues && poolTokenValues) {
          const quantity = tokenMultiplyUp(Number(values.quantity));
          const userYesBal = getTokenQuantityById(userTokenValues, yesTokenId);
          const userNoBal = getTokenQuantityById(userTokenValues, noTokenId);
          const canSellWithoutSwap = userYesBal >= quantity && userNoBal >= quantity;
          if (canSellWithoutSwap) {
            await sellTokens(values.outcome, market.marketId, quantity);
          } else {
            const yesPool = getTokenQuantityById(poolTokenValues, yesTokenId);
            const noPool = getTokenQuantityById(poolTokenValues, noTokenId);
            const [aPool, bPool] =
              values.outcome === TokenType.yes ? [yesPool, noPool] : [noPool, yesPool];
            const computed = closePosition(aPool, bPool, quantity);
            await sellTokens(
              values.outcome,
              market.marketId,
              computed.aLeft < quantity ? Math.floor(computed.aLeft) : quantity,
              Math.floor(computed.aToSwap),
            );
          }
        }
        addToast(content, {
          appearance: 'success',
          autoDismiss: false,
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

  const handleLiquiditySubmission = async (
    values: LiquidityValue,
    helpers: FormikHelpers<LiquidityValue>,
  ) => {
    const account = activeAccount?.address ? activeAccount : await connect();
    if (account?.address) {
      try {
        await swapLiquidity(
          values.tradeType,
          market.marketId,
          tokenMultiplyUp(Number(values.quantity)),
        );

        addToast(content, {
          appearance: 'success',
          autoDismiss: false,
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
    () =>
      market?.winningPrediction
        ? []
        : [
            {
              label: `${TokenType.yes}`,
              value: `${yes} PMM`,
            },
            {
              label: `${TokenType.no}`,
              value: `${no} PMM`,
              selectedColor: 'error',
            },
          ],
    [market, yes, no],
  );

  const headerStats: ToggleButtonItems[] = React.useMemo(
    () =>
      market?.winningPrediction
        ? []
        : [
            {
              label: `${TokenType.yes}`,
              value: `${typeof yes === 'number' ? yes * 100 : yes}%`,
            },
            {
              label: `${TokenType.no}`,
              value: `${typeof no === 'number' ? no * 100 : no}%`,
              selectedColor: 'error',
            },
          ],
    [market, yes, no],
  );

  const marketHeaderData: MarketHeaderProps = {
    title: market?.question ?? '',
    cardState: t('marketPhase'),
    closeDate: market ? getMarketStateLabel(market, t) : '',
    iconURL: market?.iconURL,
    stats: [...headerStats],
  };

  if (!market?.winningPrediction && marketHeaderData.stats) {
    marketHeaderData.stats.push({
      label: t('volume'),
      value: market?.liquidity ?? 0,
    });
  }

  if (market?.winningPrediction && marketHeaderData.stats) {
    marketHeaderData.stats.push({
      label: t('Winner'),
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

  const tradeData: TradeProps & MarketPositionProps = {
    connected: connected && !market?.winningPrediction,
    handleSubmit: handleTradeSubmission,
    initialValues: {
      outcome: TokenType.yes,
      quantity: '',
    },
    outcomeItems,
    poolTokens: poolTokenValues,
    userTokens: userTokenValues,
    marketId: market.marketId,
    tokenList: userTokenValues
      ? [
          {
            type: 'Yes Tokens',
            value: roundToTwo(tokenDivideDown(getTokenQuantityById(userTokenValues, yesTokenId))),
          },
          {
            type: 'No Tokens',
            value: roundToTwo(tokenDivideDown(getTokenQuantityById(userTokenValues, noTokenId))),
          },
        ]
      : undefined,
  };

  const liquidityData: LiquidityFormProps = {
    title: FormType.addLiquidity,
    tradeType: MarketTradeType.payIn,
    connected: connected && !market?.winningPrediction,
    handleSubmit: handleLiquiditySubmission,
    initialValues: {
      quantity: '',
    },
  };

  return (
    <MainPage>
      <Grid container spacing={3} direction={isTablet ? 'column' : 'row'}>
        <Grid item mt={3} xs={12}>
          <MarketHeader {...marketHeaderData} />
        </Grid>
        <Grid item xs={12} sm={8} container spacing={3}>
          {chartData && (
            <Grid item xs={12} width="100%" height="30rem">
              <ResponsiveLine
                data={chartData}
                margin={{ top: 50, right: 60, bottom: 65, left: 60 }}
                xScale={{ type: 'point' }}
                colors={[theme.palette.success.main, theme.palette.error.main]}
                yScale={{
                  type: 'linear',
                  min: 0,
                  max: 100,
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
                  legend: 'Yes/No %',
                  legendOffset: -40,
                  legendPosition: 'middle',
                }}
                pointSize={3}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={4}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh
                enableGridX={false}
                legends={[
                  {
                    anchor: 'top',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: -40,
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
        <Grid item xs={4} container spacing={3} direction="column" flexWrap="nowrap">
          {!market?.winningPrediction && (
            <>
              <Grid item xs={12}>
                <TradeContainer {...tradeData} tokenName="PMM" />
              </Grid>
              <Grid item xs={12}>
                <LiquidityContainer {...liquidityData} />
                <TwitterShare
                  urlHref={window.location.href}
                  twitterText="text=TZ%20Connect%20prediction%20market"
                />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
