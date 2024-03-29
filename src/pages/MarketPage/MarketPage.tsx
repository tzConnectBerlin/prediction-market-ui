import * as React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import styled from '@emotion/styled';
import { FormikHelpers } from 'formik';
import { Serie } from '@nivo/line';
import format from 'date-fns/format';
import { useQueryClient } from 'react-query';
import {
  useMarketBets,
  useMarketPriceChartData,
  useTokenByAddress,
  useTotalSupplyByMarket,
  useUserBalance,
} from '../../api/queries';
import {
  getLQTTokenId,
  getMarketLocalStorage,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
  toChartData,
} from '../../utils/misc';
import { logError } from '../../logger/logger';
import {
  Market,
  MarketEnterExitDirection,
  MarketTradeType,
  TokenType,
} from '../../interfaces/market';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { MainPage } from '../MainPage/MainPage';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { TradeForm, TradeValue } from '../../design-system/organisms/TradeForm/TradeForm';
import { ToggleButtonItems } from '../../design-system/molecules/FormikToggleButton/FormikToggleButton';
import {
  addLiquidity,
  basicAddLiquidity,
  basicRemoveLiquidity,
  buyTokens,
  claimWinnings,
  mintBurnTokens,
  removeLiquidity,
  resolveMarket,
  sellTokens,
  swapTokens,
} from '../../contracts/Market';
import { CURRENCY_SYMBOL, MARKET_ADDRESS } from '../../globals';
import {
  buyTokenCalculation,
  closePosition,
  swapTokenCalculations,
} from '../../contracts/MarketCalculations';
import { TwitterShare } from '../../design-system/atoms/TwitterShare';
import { TradeFormProps } from '../../design-system/organisms/TradeForm';
import {
  LiquidityForm,
  LiquidityFormProps,
  LiquidityValue,
} from '../../design-system/organisms/LiquidityForm/LiquidityForm';
import { LineChart } from '../../design-system/organisms/LineChart';
import { ActionBox } from '../../design-system/organisms/ActionBox';
import { useStore } from '../../store/store';
import { AuctionBid } from '../../design-system/organisms/SubmitBidCard';
import { findBetByOriginator } from '../../api/utils';
import {
  MintBurnForm,
  MintBurnFormProps,
  MintBurnFormValues,
} from '../../design-system/organisms/MintBurnForm/MintBurnForm';
import {
  TabContainer,
  TabContainerProps,
} from '../../design-system/organisms/TabContainer/TabContainer';
import { BasicLiquidityForm } from '../../design-system/organisms/LiquidityForm/BasicLiquidityForm';
import { SwapForm, SwapFormProps } from '../../design-system/organisms/SwapForm';
import { SwapFormValues } from '../../design-system/organisms/SwapForm/SwapForm';
import { useConditionalWallet } from '../../wallet/hooks';
import {
  TradeSummary,
  TradeSummaryProps,
} from '../../design-system/organisms/TradeForm/TradeSummary';

const ChartContainer = styled.div`
  margin-bottom: 1.5rem;
`;
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
  const lqtTokenId = getLQTTokenId(market.marketId);
  const { connected, activeAccount, connect } = useConditionalWallet();
  const { data: priceValues } = useMarketPriceChartData(market.marketId);
  const [yesPrice, setYesPrice] = React.useState(0);
  const { data: poolTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId, lqtTokenId],
    MARKET_ADDRESS,
  );
  const { data: userTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId, lqtTokenId],
    activeAccount?.address,
  );
  const [closeMarketId, setCloseMarketId] = React.useState('');
  const { data: bets } = useMarketBets(market.marketId);
  const [currentPosition, setCurrentPosition] = React.useState<AuctionBid | undefined>(undefined);
  const { data: tokenTotalSupply } = useTotalSupplyByMarket(market.marketId);
  const { data: balance } = useUserBalance(activeAccount?.address);
  const yesPool = poolTokenValues && getTokenQuantityById(poolTokenValues, yesTokenId);
  const noPool = poolTokenValues && getTokenQuantityById(poolTokenValues, noTokenId);
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [chartData, setChartData] = React.useState<Serie[] | undefined>(undefined);
  const [range, setRange] = React.useState<string | number>(7);
  const yes = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : yesPrice;
  const no = yesPrice < 0 || Number.isNaN(yesPrice) ? '--' : 1 - yesPrice;
  const [disabled, setDisabled] = React.useState(false);
  const { slippage, advanced } = useStore();
  const [tradeFormData, setTradeFormData] = React.useState<TabContainerProps>(
    {} as TabContainerProps,
  );
  const [mintBurnFormData, setMintBurnFormData] = React.useState<TabContainerProps>(
    {} as TabContainerProps,
  );
  const [liquidityFormData, setLiquidityFormData] = React.useState<TabContainerProps>(
    {} as TabContainerProps,
  );
  const [swapFormData, setSwapFormData] = React.useState<TabContainerProps>(
    {} as TabContainerProps,
  );
  const liquidityFormRef = React.useRef<{ resetForm: () => void }>();

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
  }, [userTokenValues, market.winningPrediction, noTokenId, yesTokenId]);

  const rangeSelectorProps = React.useMemo(
    () => ({
      defaultValue: 7,
      values: [
        {
          label: isMobile ? '24 hours' : '24H',
          value: 1,
        },
        {
          label: isMobile ? '7 Days' : '7D',
          value: 7,
        },
        {
          label: isMobile ? '30 Days' : '30D',
          value: 30,
        },
        {
          label: isMobile ? '90 Days' : '90D',
          value: 90,
        },
        {
          label: 'All',
          value: 'all',
        },
      ],
      onChange: setRange,
    }),
    [isMobile],
  );

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
    if (market) {
      setYesPrice(market.yesPrice);
    }
  }, [market]);

  React.useEffect(() => {
    if (typeof priceValues !== 'undefined') {
      const newData: Serie[] = toChartData(priceValues, initialData, range);
      setChartData(newData);
    }
    // Do not add initialData to the dep array. it breaks the chart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceValues, market.marketId, range]);

  React.useEffect(() => {
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

  const handleResolveMarket = React.useCallback(
    async (values: any) => {
      if (activeAccount?.address && closeMarketId) {
        try {
          await resolveMarket(closeMarketId, values.outcome);
          setCloseMarketId('');
          getMarketLocalStorage(true, market.marketId, market.state, 'true');
          addToast(t('txSubmitted'), {
            appearance: 'success',
          });
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
          });
        }
      }
    },
    [activeAccount?.address, addToast, closeMarketId, market.marketId, market.state, t],
  );

  const handleTradeSubmission = React.useCallback(
    async (values: TradeValue, helpers: FormikHelpers<TradeValue>) => {
      if (
        activeAccount?.address &&
        poolTokenValues &&
        typeof yes === 'number' &&
        typeof no === 'number' &&
        yesPool &&
        noPool
      ) {
        try {
          if (values.tradeType === MarketTradeType.payIn) {
            const { quantity, swap } = buyTokenCalculation(
              values.outcome,
              Number(values.quantity),
              yesPool,
              noPool,
              roundToTwo(yes),
              roundToTwo(no),
              slippage,
            );
            await buyTokens(
              values.outcome,
              market.marketId,
              quantity,
              activeAccount?.address,
              Math.ceil(swap),
            );
          }
          if (values.tradeType === MarketTradeType.payOut && userTokenValues && poolTokenValues) {
            const quantity = tokenMultiplyUp(Number(values.quantity));
            const [aPool, bPool] =
              values.outcome === TokenType.yes ? [yesPool, noPool] : [noPool, yesPool];
            const { aLeft, aToSwap, bReceivedWithSlippage } = closePosition(
              aPool,
              bPool,
              quantity,
              slippage,
            );
            await sellTokens(
              values.outcome,
              market.marketId,
              aLeft < quantity ? Math.floor(aLeft) : quantity,
              Math.floor(aToSwap),
              Math.floor(bReceivedWithSlippage),
            );
          }
          addToast(t('txSubmitted'), {
            appearance: 'success',
          });
          helpers.resetForm();
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
          });
        }
      }
    },
    [
      activeAccount,
      poolTokenValues,
      yes,
      no,
      yesPool,
      noPool,
      userTokenValues,
      addToast,
      t,
      slippage,
      market.marketId,
    ],
  );

  const handleMintBurnSubmission = React.useCallback(
    async (values: MintBurnFormValues, helpers: FormikHelpers<MintBurnFormValues>) => {
      if (activeAccount?.address) {
        try {
          const amount =
            values.direction === MarketEnterExitDirection.mint
              ? tokenMultiplyUp(Number(values.mintAmount))
              : tokenMultiplyUp(Number(values.yesToken));
          await mintBurnTokens(market.marketId, amount, activeAccount?.address, values.direction);
          addToast(t('txSubmitted'), {
            appearance: 'success',
          });
          helpers.resetForm();
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
          });
        }
      }
    },
    [activeAccount, addToast, market.marketId, t],
  );

  const handleSwapSubmission = React.useCallback(
    async (values: SwapFormValues, helpers: FormikHelpers<SwapFormValues>) => {
      if (activeAccount?.address && yesPool && noPool) {
        try {
          const amount =
            values.swapTokenType === TokenType.yes
              ? tokenMultiplyUp(Number(values.yesToken))
              : tokenMultiplyUp(Number(values.noToken));
          const { swapSlippage } = swapTokenCalculations(amount, yesPool, noPool, slippage);
          await swapTokens(market.marketId, amount, Math.ceil(swapSlippage), values.swapTokenType);
          addToast(t('txSubmitted'), {
            appearance: 'success',
          });
          helpers.resetForm();
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
          });
        }
      }
    },
    [activeAccount, yesPool, noPool, slippage, market.marketId, addToast, t],
  );

  const handleLiquiditySubmission = React.useCallback(
    async (values: LiquidityValue, helpers: FormikHelpers<LiquidityValue>) => {
      let hash: string | null = null;
      if (activeAccount?.address && tokenTotalSupply && yesPool && noPool) {
        try {
          const slippageAToken = Math.ceil(values.minYesToken);
          const slippageBToken = Math.ceil(values.minNoToken);
          if (values.operationType === 'add') {
            if (advanced) {
              const yesTokens = Math.ceil(tokenMultiplyUp(Number(values.yesToken)));
              const noTokens = Math.ceil(tokenMultiplyUp(Number(values.noToken)));
              hash = await addLiquidity(
                market.marketId,
                yesTokens,
                noTokens,
                slippageAToken,
                slippageBToken,
              );
            } else if (typeof values.pmmAmount === 'number') {
              const limitingToken = yesPool > noPool ? TokenType.no : TokenType.yes;
              const [yesTokens, noTokens] =
                limitingToken === TokenType.yes
                  ? [
                      Math.ceil(
                        tokenMultiplyUp(
                          ((yesPool / (yesPool + noPool)) * values.pmmAmount) /
                            (noPool / (yesPool + noPool)),
                        ),
                      ),
                      Math.ceil(tokenMultiplyUp(values.pmmAmount)),
                    ]
                  : [
                      Math.ceil(tokenMultiplyUp(values.pmmAmount)),
                      Math.ceil(
                        tokenMultiplyUp(
                          ((noPool / (yesPool + noPool)) * values.pmmAmount) /
                            (yesPool / (yesPool + noPool)),
                        ),
                      ),
                    ];
              hash = await basicAddLiquidity(
                market.marketId,
                tokenMultiplyUp(values.pmmAmount),
                yesTokens,
                noTokens,
                activeAccount?.address,
                slippage,
              );
            }
          } else if (values.operationType === 'remove' && advanced) {
            const lqtTokens = Math.ceil(tokenMultiplyUp(Number(values.lqtToken)));
            hash = await removeLiquidity(
              market.marketId,
              lqtTokens,
              slippageAToken,
              slippageBToken,
            );
          } else if (
            values.operationType === 'remove' &&
            activeAccount?.address &&
            typeof values.noToken === 'number' &&
            typeof values.yesToken === 'number'
          ) {
            const poolToSwap = yesPool > noPool ? TokenType.yes : TokenType.no;
            const pools =
              yesPool > noPool
                ? {
                    aPool: yesPool,
                    bPool: noPool,
                    aHoldings: tokenMultiplyUp(values.yesToken),
                    bHoldings: tokenMultiplyUp(values.noToken),
                  }
                : {
                    aPool: noPool,
                    bPool: yesPool,
                    aHoldings: tokenMultiplyUp(values.noToken),
                    bHoldings: tokenMultiplyUp(values.yesToken),
                  };
            const lqtTokens = Math.ceil(tokenMultiplyUp(Number(values.lqtToken)));
            hash = await basicRemoveLiquidity(
              market.marketId,
              lqtTokens,
              slippageAToken,
              slippageBToken,
              activeAccount?.address,
              poolToSwap,
              pools,
              slippage,
            );
          }
          if (hash) {
            addToast(t('txSubmitted'), {
              appearance: 'success',
            });
            liquidityFormRef.current?.resetForm();
          }
        } catch (error: any) {
          logError(error);
          const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
          addToast(errorText, {
            appearance: 'error',
          });
        }
      }
    },
    [
      activeAccount?.address,
      tokenTotalSupply,
      yesPool,
      noPool,
      advanced,
      market.marketId,
      addToast,
      t,
      slippage,
    ],
  );

  const handleClaimWinnings = React.useCallback(async () => {
    if (connected) {
      try {
        const hash = await claimWinnings(market.marketId);
        if (hash) {
          setDisabled(true);
          addToast(t('txSubmitted'), {
            appearance: 'success',
          });
        }
      } catch (error: any) {
        logError(error);
        const errorText = error?.data?.[1]?.with?.string || error?.description || t('txFailed');
        addToast(errorText, {
          appearance: 'error',
        });
      }
    }
  }, [addToast, connected, market.marketId, t]);

  const outcomeItems: ToggleButtonItems[] = React.useMemo(
    () =>
      market?.winningPrediction
        ? []
        : [
            {
              label: `${TokenType.yes}`,
              value: `${typeof yes === 'number' ? roundToTwo(yes) : yes} ${CURRENCY_SYMBOL}`,
            },
            {
              label: `${TokenType.no}`,
              value: `${typeof no === 'number' ? roundToTwo(no) : no} ${CURRENCY_SYMBOL}`,
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
      iconSize: isTablet ? 'xxl' : 'max',
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
        label: t('liquidity'),
        value: `${market?.liquidity ?? 0} ${CURRENCY_SYMBOL}`,
      });
    }

    if (market?.winningPrediction && marketHeader.stats) {
      marketHeader.stats.push(
        {
          label: t('outcome'),
          value: market.winningPrediction.toUpperCase(),
        },
        {
          label: t('resolvedOn'),
          value: format(new Date(market.bakedAt), 'PP'),
        },
      );
    }

    return marketHeader;
  }, [headerStats, market, theme, isTablet, t]);

  const marketDescription = React.useMemo(
    () => ({
      title: t('marketDetails'),
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
          title: t('adjudicator'),
          item: market?.adjudicator ?? '',
        },
        {
          title: t('ticker'),
          item: `$${market?.ticker ?? 'NOTICKER'}`,
        },
      ],
    }),
    [market?.adjudicator, market?.description, market?.ticker, t],
  );

  const tradeData: TradeFormProps = React.useMemo(() => {
    const result = {
      title: holdingWinner ? 'claimWinningsPage' : !connected ? 'connectWalletContinue' : t('buy'),
      tradeType: MarketTradeType.payIn,
      connected,
      tokenName: CURRENCY_SYMBOL,
      handleSubmit: !connected
        ? connect
        : holdingWinner
        ? handleClaimWinnings
        : handleTradeSubmission,
      initialValues: {
        outcome: TokenType.yes,
        quantity: '',
      },
      outcomeItems,
      disabled,
      holdingWinner,
      liquidityPosition: currentPosition,
      poolTokens: poolTokenValues,
      userTokens: userTokenValues,
      marketId: market.marketId,
      handleRefreshClick: () => {
        queryClient.invalidateQueries('allMarketsLedgers');
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
    handleTradeSubmission,
    market.marketId,
    no,
    outcomeItems,
    poolTokenValues,
    userTokenValues,
    yes,
    holdingWinner,
    disabled,
    handleClaimWinnings,
    currentPosition,
    t,
    queryClient,
    connect,
  ]);

  const tradeSummaryData: TradeSummaryProps = React.useMemo(() => {
    const result = {
      tokenName: CURRENCY_SYMBOL,
      userTokens: userTokenValues,
      marketId: market.marketId,
      poolTokens: poolTokenValues,
      poolTotalSupply: Number(tokenTotalSupply?.totalSupply),
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
  }, [connected, userTokenValues, tokenTotalSupply, market.marketId, yes, no, advanced]);

  const mintData: MintBurnFormProps = React.useMemo(() => {
    const result = {
      title: t('Mint'),
      connected,
      tokenName: CURRENCY_SYMBOL,
      handleSubmit: !connected ? connect : handleMintBurnSubmission,
      initialValues: {
        mintAmount: '',
        yesToken: '',
        noToken: '',
      },
      userTokens: userTokenValues,
      marketId: market.marketId,
      direction: MarketEnterExitDirection.mint,
      tokenPrice: {
        yes: 0,
        no: 0,
      },
      userBalance: balance,
    };
    if (typeof yes === 'number' && typeof no === 'number') {
      result.tokenPrice = {
        yes,
        no,
      };
    }
    return result;
  }, [
    t,
    connected,
    handleMintBurnSubmission,
    userTokenValues,
    market.marketId,
    balance,
    yes,
    no,
    connect,
  ]);

  const liquidityData: LiquidityFormProps = React.useMemo(() => {
    const result: LiquidityFormProps = {
      title: t('addLiquidity'),
      operationType: 'add',
      connected: connected && !market?.winningPrediction,
      account: activeAccount?.address,
      tokenName: CURRENCY_SYMBOL,
      handleSubmit: !connected ? connect : handleLiquiditySubmission,
      poolTokens: poolTokenValues,
      userTokens: userTokenValues,
      marketId: market.marketId,
      poolTotalSupply: Number(tokenTotalSupply?.totalSupply),
      initialValues: {
        yesToken: '',
        noToken: '',
        lqtToken: '',
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
    t,
    connected,
    market?.winningPrediction,
    market.marketId,
    activeAccount?.address,
    handleLiquiditySubmission,
    connect,
    poolTokenValues,
    userTokenValues,
    tokenTotalSupply?.totalSupply,
    yes,
    no,
  ]);

  const swapData: SwapFormProps = React.useMemo(() => {
    const result: SwapFormProps = {
      title: `${t('swap')} ${t('yes')}`,
      swapTokenType: TokenType.yes,
      connected: connected && !market?.winningPrediction,
      tokenName: CURRENCY_SYMBOL,
      handleSubmit: !connected ? connect : handleSwapSubmission,
      poolTokens: poolTokenValues,
      userTokens: userTokenValues,
      marketId: market.marketId,
      userBalance: balance,
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
    t,
    connected,
    market?.winningPrediction,
    market.marketId,
    handleSwapSubmission,
    connect,
    poolTokenValues,
    userTokenValues,
    balance,
    yes,
    no,
  ]);

  const CloseMarketDetails = {
    address: activeAccount?.address,
    marketId: market.marketId,
    adjudicator: market.adjudicator,
    winningPrediction: market.winningPrediction,
    marketPhase: market.state,
    handleResolveMarket,
    closeMarketId,
    setCloseMarketId,
  };

  React.useEffect(() => {
    setTradeFormData({
      label: 'TradeForm',
      tabs: [
        {
          title: 'buy',
          children: <TradeForm {...tradeData} />,
        },
        {
          title: 'sell',
          children: (
            <TradeForm {...tradeData} title={t('sell')} tradeType={MarketTradeType.payOut} />
          ),
        },
      ],
    });
    setMintBurnFormData({
      label: 'MintBurnForm',
      tabs: [
        {
          title: 'mint',
          children: <MintBurnForm {...mintData} />,
        },
        {
          title: 'burn',
          children: (
            <MintBurnForm
              {...mintData}
              title={t('burn')}
              direction={MarketEnterExitDirection.burn}
            />
          ),
        },
      ],
    });
    setSwapFormData({
      label: 'SwapForm',
      tabs: [
        {
          title: `${t('swap')} ${t('yes')}`,
          children: <SwapForm {...swapData} />,
        },
        {
          title: `${t('swap')} ${t('no')}`,
          children: (
            <SwapForm
              {...swapData}
              title={`${t('swap')} ${t('no')}`}
              swapTokenType={TokenType.no}
            />
          ),
        },
      ],
    });
    setLiquidityFormData({
      label: 'LiquidityForm',
      tabs: [
        {
          title: 'addLiquidity',
          children: advanced ? (
            <LiquidityForm {...liquidityData} ref={liquidityFormRef} />
          ) : (
            <BasicLiquidityForm {...liquidityData} ref={liquidityFormRef} />
          ),
        },
        {
          title: 'removeLiquidity',
          children: advanced ? (
            <LiquidityForm
              {...liquidityData}
              operationType="remove"
              title={t('removeLiquidity')}
              ref={liquidityFormRef}
            />
          ) : (
            <BasicLiquidityForm
              {...liquidityData}
              operationType="remove"
              title={t('removeLiquidity')}
              ref={liquidityFormRef}
            />
          ),
        },
      ],
    });
  }, [mintData, tradeData, liquidityData, t, swapData, advanced]);

  return (
    <MainPage description={market.question}>
      <Grid container spacing={{ md: 3 }} direction={isTablet ? 'column' : 'row'}>
        <Grid item mt={3} mb={{ xs: 5, md: 0 }} xs={12}>
          <MarketHeader {...marketHeaderData} />
        </Grid>
        <Grid item xs={12} sm={8} container spacing={3} direction="column" flexWrap="nowrap">
          <Grid item xs={12}>
            {chartData && (
              <ChartContainer>
                <LineChart
                  data={chartData}
                  rangeSelector={rangeSelectorProps}
                  leftAxisLabel={t('chartLeftAxis')}
                  noDataMessage={t('noChartData')}
                />
              </ChartContainer>
            )}
            {!isTablet && <MarketDetailCard {...marketDescription} />}
          </Grid>
        </Grid>
        <Grid item xs={4} container spacing={3} direction="column" flexWrap="nowrap">
          <Grid item xs={12}>
            {(!getMarketLocalStorage(false, market.marketId, market.state) ||
              market.winningPrediction) &&
              connected && (
                <ActionBox
                  {...CloseMarketDetails}
                  closeMarketId={closeMarketId}
                  setCloseMarketId={setCloseMarketId}
                />
              )}
            {(!market.winningPrediction ||
              (connected && market.winningPrediction && holdingWinner)) &&
              tradeFormData &&
              !advanced && <TabContainer {...tradeFormData} />}
            {tradeSummaryData && connected && advanced && <TradeSummary {...tradeSummaryData} />}
            {mintBurnFormData && advanced && <TabContainer {...mintBurnFormData} />}
            {swapFormData && advanced && <TabContainer {...swapFormData} />}
            {!market.winningPrediction && liquidityFormData && (
              <TabContainer {...liquidityFormData} />
            )}
            {!isTablet && <TwitterShare text={window.location.href} />}
          </Grid>
        </Grid>
        {isTablet && (
          <Grid item xs={12}>
            <MarketDetailCard {...marketDescription} />
            <TwitterShare text={window.location.href} />
          </Grid>
        )}
      </Grid>
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
