import * as React from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { FormikHelpers } from 'formik';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { Serie } from '@nivo/line';
import format from 'date-fns/format';
import { useQueryClient } from 'react-query';
import {
  useMarketPriceChartData,
  useTokenByAddress,
  useTotalSupplyByMarket,
} from '../../api/queries';
import {
  getMarketLocalStorage,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
  toChartData,
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
import { buyTokens, claimWinnings, sellTokens, swapLiquidity } from '../../contracts/Market';
import { CURRENCY_SYMBOL, MARKET_ADDRESS } from '../../utils/globals';
import {
  buyTokenCalculation,
  closePosition,
  liquidityTokensMovedToPool,
} from '../../contracts/MarketCalculations';
import { TwitterShare } from '../../design-system/atoms/TwitterShare';
import { TradeContainer, TradeProps } from '../../design-system/organisms/TradeForm';
import { LiquidityContainer } from '../../design-system/organisms/LiquidityForm';
import {
  LiquidityFormProps,
  LiquidityValue,
} from '../../design-system/organisms/LiquidityForm/LiquidityForm';
import { MarketPositionProps } from '../../design-system/molecules/MarketPosition/MarketPosition';
import { LineChart } from '../../design-system/organisms/LineChart';
import { CloseOpenMarketCard } from '../../design-system/organisms/CloseOpenMarketCard';

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
  const { data: tokenTotalSupply } = useTotalSupplyByMarket(market.marketId);
  const yesPool = poolTokenValues && getTokenQuantityById(poolTokenValues, yesTokenId);
  const noPool = poolTokenValues && getTokenQuantityById(poolTokenValues, noTokenId);
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [chartData, setChartData] = React.useState<Serie[] | undefined>(undefined);
  const [range, setRange] = React.useState<string | number>(7);
  const yes = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : roundToTwo(yesPrice);
  const no = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : roundToTwo(1 - yesPrice);
  const [disabled, setDisabled] = React.useState(false);

  const holdingWinner = React.useMemo(() => {
    if (userTokenValues && market.winningPrediction) {
      if (market.winningPrediction === 'yes') {
        const userTokens = getTokenQuantityById(userTokenValues, yesTokenId);
        return Boolean(userTokens);
      }
      const userTokens = getTokenQuantityById(userTokenValues, noTokenId);
      return Boolean(userTokens);
    }
    return false;
  }, [userTokenValues, market.winningPrediction]);

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
    [],
  );

  React.useEffect(() => {
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
        typeof no === 'number' &&
        yesPool &&
        noPool
      ) {
        try {
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
      noPool,
      yesPool,
    ],
  );

  const handleLiquiditySubmission = React.useCallback(
    async (values: LiquidityValue, helpers: FormikHelpers<LiquidityValue>) => {
      const account = activeAccount?.address ? activeAccount : await connect();
      if (account?.address && tokenTotalSupply && yesPool) {
        try {
          console.log(values);
          const liquidityTokensMoved = liquidityTokensMovedToPool(
            Number(values.yesToken),
            yesPool,
            Number(tokenTotalSupply.totalSupply),
          );
          await swapLiquidity(
            values.tradeType,
            market.marketId,
            liquidityTokensMoved,
            Number(values.yesToken),
            Number(values.noToken),
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
    },
    [tokenTotalSupply, yesPool, market.marketId],
  );

  const handleClaimWinnings = React.useCallback(async () => {
    if (connected) {
      try {
        const hash = await claimWinnings(market.marketId);
        if (hash) {
          setDisabled(true);
          addToast(t('txSubmitted'), {
            appearance: 'success',
            autoDismiss: false,
          });
        }
      } catch (error) {
        logError(error);
        const errorText = error?.data?.[1]?.with?.string || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }
  }, [connected, market.marketId]);

  const outcomeItems: ToggleButtonItems[] = React.useMemo(
    () =>
      market?.winningPrediction
        ? []
        : [
            {
              label: `${TokenType.yes}`,
              value: `${yes} ${CURRENCY_SYMBOL}`,
            },
            {
              label: `${TokenType.no}`,
              value: `${no} ${CURRENCY_SYMBOL}`,
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
          value: `+${market.weekly.change}%`,
          tokenType: market.weekly.tokenType,
        });
      marketHeader.stats.push({
        label: t('volume'),
        value: `${market?.liquidity ?? 0} ${CURRENCY_SYMBOL}`,
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

  const marketDescription = React.useMemo(
    () => ({
      title: t('aboutMarket'),
      items: [
        {
          title: t('description'),
          item: {
            text: market?.description ?? '',
            expandActionText: t('readMore'),
            shrinkActionText: t('readLess'),
          },
        },
        {
          title: t('ticker'),
          item: `$${market?.ticker ?? 'NOTICKER'}`,
        },
        {
          title: t('adjudicator'),
          item: market?.adjudicator ?? '',
        },
      ],
    }),
    [market?.adjudicator, market?.description, market?.ticker],
  );

  const tradeData: TradeProps & MarketPositionProps = React.useMemo(() => {
    const result = {
      connected,
      tokenName: CURRENCY_SYMBOL,
      handleSubmit: handleTradeSubmission,
      initialValues: {
        outcome: TokenType.yes,
        quantity: '',
      },
      outcomeItems,
      disabled,
      handleClaimWinnings,
      holdingWinner,
      poolTokens: poolTokenValues,
      userTokens: userTokenValues,
      marketId: market.marketId,
      tokenList: userTokenValues
        ? [
            {
              type: 'Yes Tokens',
              value: roundToTwo(tokenDivideDown(yesPool ?? 0)),
            },
            {
              type: 'No Tokens',
              value: roundToTwo(tokenDivideDown(noPool ?? 0)),
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
    no,
    outcomeItems,
    poolTokenValues,
    userTokenValues,
    yes,
    noPool,
    yesPool,
    holdingWinner,
    disabled,
    handleClaimWinnings,
  ]);

  const liquidityData: LiquidityFormProps = React.useMemo(() => {
    const result = {
      title: FormType.addLiquidity,
      tradeType: MarketTradeType.payIn,
      connected: connected && !market?.winningPrediction,
      tokenName: 'PMM',
      handleSubmit: handleLiquiditySubmission,
      poolTokens: poolTokenValues,
      userTokens: userTokenValues,
      marketId: market.marketId,
      poolTotalSupply: Number(tokenTotalSupply?.totalSupply),
      initialValues: {
        yesToken: '',
        noToken: '',
      },
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
    tokenTotalSupply,
    handleLiquiditySubmission,
    market.marketId,
    poolTokenValues,
    userTokenValues,
    yes,
    no,
  ]);

  const CloseMarketDetails = {
    marketId: market.marketId,
    adjudicator: market.adjudicator,
    winningPrediction: market.winningPrediction,
    marketPhase: market.state,
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
          <Grid item xs={12}>
            {(!getMarketLocalStorage(false, market.marketId, market.state) ||
              market.winningPrediction) && <CloseOpenMarketCard {...CloseMarketDetails} />}
            {(holdingWinner || tradeData.outcomeItems.length > 0) && connected && (
              <TradeContainer
                {...tradeData}
                handleRefreshClick={() => {
                  queryClient.invalidateQueries('allMarketsLedgers');
                }}
              />
            )}

            {!market.winningPrediction && <LiquidityContainer {...liquidityData} />}
            <TwitterShare text={window.location.href} />
          </Grid>
        </Grid>
      </Grid>
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
