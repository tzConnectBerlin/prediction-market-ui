import React, { useEffect } from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { FormikHelpers } from 'formik';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { Serie } from '@nivo/line';
import format from 'date-fns/format';
import { useQueryClient } from 'react-query';
import { useMarketPriceChartData, useTokenByAddress } from '../../api/queries';
import { getNoTokenId, getTokenQuantityById, getYesTokenId, toChartData } from '../../utils/misc';
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
import { buyTokenCalculation, closePosition } from '../../contracts/MarketCalculations';
import { TwitterShare } from '../../design-system/atoms/TwitterShare';
import { TradeContainer, TradeProps } from '../../design-system/organisms/TradeForm';
import { LiquidityContainer } from '../../design-system/organisms/LiquidityForm';
import {
  LiquidityFormProps,
  LiquidityValue,
} from '../../design-system/organisms/LiquidityForm/LiquidityForm';
import { MarketPositionProps } from '../../design-system/molecules/MarketPosition/MarketPosition';
import { LineChart } from '../../design-system/organisms/LineChart';

interface MarketPageProps {
  market: Market;
}

export const MarketPageComponent: React.FC<MarketPageProps> = ({ market }) => {
  const { t } = useTranslation(['common']);
  const theme = useTheme();
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
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
  const [range, setRange] = React.useState<string | number>(7);
  const yes = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : roundToTwo(yesPrice);
  const no = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : roundToTwo(1 - yesPrice);

  const rangeSelectorProps = {
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
  };

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
      const newData: Serie[] = toChartData(priceValues, initialData, range);
      setChartData(newData);
    }
  }, [priceValues, market.marketId, range]);

  const handleTradeSubmission = React.useCallback(
    async (values: TradeValue, helpers: FormikHelpers<TradeValue>) => {
      const account = activeAccount?.address ? activeAccount : await connect();
      if (
        account?.address &&
        poolTokenValues &&
        typeof yes === 'number' &&
        typeof no === 'number'
      ) {
        try {
          const yesPool = getTokenQuantityById(poolTokenValues, yesTokenId);
          const noPool = getTokenQuantityById(poolTokenValues, noTokenId);
          if (values.tradeType === MarketTradeType.payIn) {
            const { quantity } = buyTokenCalculation(
              values.outcome,
              Number(values.quantity),
              yesPool,
              noPool,
              yes,
              no,
            );
            await buyTokens(values.outcome, market.marketId, quantity, account.address);
          }
          if (values.tradeType === MarketTradeType.payOut && userTokenValues && poolTokenValues) {
            const quantity = tokenMultiplyUp(Number(values.quantity));
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
    },
    [
      activeAccount,
      market.marketId,
      no,
      noTokenId,
      poolTokenValues,
      userTokenValues,
      yes,
      yesTokenId,
    ],
  );

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
    () => [
      {
        label: `${TokenType.yes}`,
        value: `${typeof yes === 'number' ? roundToTwo(yes * 100) : yes}%`,
      },
      {
        label: `${TokenType.no}`,
        value: `${typeof no === 'number' ? roundToTwo(no * 100) : no}%`,
        selectedColor: 'error',
      },
    ],
    [yes, no],
  );

  const marketHeaderData: MarketHeaderProps = React.useMemo(() => {
    const marketHeader: MarketHeaderProps = {
      title: market?.question ?? '',
      cardState: market?.winningPrediction ? t('resolved') : t('marketPhase'),
      iconURL: market?.iconURL,
      stats: [...headerStats],
      cardStateProps: market?.winningPrediction
        ? {
            fontColor: theme.palette.text.primary,
            backgroundColor: theme.palette.grey[400],
          }
        : undefined,
    };

    if (!market?.winningPrediction && marketHeader.stats) {
      market.weekly &&
        marketHeader.stats.push({
          label: t('weekly'),
          value: `+${market.weekly.change}`,
          tokenType: market.weekly.tokenType,
        });
      marketHeader.stats.push({
        label: t('volume'),
        value: `${market?.liquidity ?? 0} PMM`,
      });
    }

    if (market?.winningPrediction && marketHeader.stats) {
      marketHeader.stats.push(
        {
          label: t('resolution'),
          value: market.winningPrediction.toUpperCase(),
        },
        {
          label: t('resolvedOn'),
          value: format(new Date(market.bakedAt), 'PP'),
        },
      );
    }

    return marketHeader;
  }, [headerStats, market, theme]);

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

  const tradeData: TradeProps & MarketPositionProps = React.useMemo(() => {
    const result = {
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
      tokenPrice: {
        yes: 0,
        no: 0,
      },
    };
    if (typeof yes === 'number' && typeof no === 'number') {
      result.tokenPrice = {
        yes,
        no,
      };
    }
    return result;
  }, [
    connected,
    handleTradeSubmission,
    market.marketId,
    market?.winningPrediction,
    no,
    noTokenId,
    outcomeItems,
    poolTokenValues,
    userTokenValues,
    yes,
    yesTokenId,
  ]);

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
    <MainPage description={market.question}>
      <Grid container spacing={3} direction={isTablet ? 'column' : 'row'}>
        <Grid item mt={3} xs={12}>
          <MarketHeader {...marketHeaderData} />
        </Grid>
        <Grid item xs={12} sm={8} container spacing={3}>
          {chartData && (
            <Grid item xs={12} width="100%">
              <LineChart data={chartData} rangeSelector={rangeSelectorProps} />
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
                <TradeContainer
                  {...tradeData}
                  handleRefreshClick={() => {
                    queryClient.invalidateQueries('allMarketsLedgers');
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <LiquidityContainer {...liquidityData} />
                <TwitterShare text={window.location.href} />
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
