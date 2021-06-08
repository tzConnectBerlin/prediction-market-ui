import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { useMarketBets, useMarkets, useTokenByAddress } from '../../api/queries';
import { findBetByOriginator, findByMarketId, getNoTokenId, getYesTokenId } from '../../api/utils';
import { getMarketStateLabel, getTokenQuantityById } from '../../utils/misc';
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
import {
  buyTokens,
  claimWinnings,
  resolveMarket,
  sellTokens,
  withdrawAuction,
} from '../../contracts/Market';
import { MARKET_ADDRESS } from '../../utils/globals';
import { closePosition } from '../../contracts/MarketCalculations';
import { Typography } from '../../design-system/atoms/Typography';
import { CustomButton } from '../../design-system/atoms/Button';
import { AuctionBid } from '../../design-system/organisms/SubmitBidCard';
import {
  PositionItem,
  PositionSummary,
} from '../../design-system/organisms/SubmitBidCard/PositionSummary';
import { ResolveMarketModal } from '../../design-system/organisms/ResolveMarketModal/ResolveMarketModal';

interface MarketPageProps {
  marketId: string;
}

export const MarketPageComponent: React.FC = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useToasts();
  const { marketId } = useParams<MarketPageProps>();
  const yesTokenId = getYesTokenId(marketId);
  const noTokenId = getNoTokenId(marketId);
  const { connected, activeAccount } = useWallet();
  const { data, isLoading } = useMarkets();
  const { data: bets } = useMarketBets(marketId);
  const [additional, setAdditional] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [yesPrice, setYesPrice] = React.useState(0);
  const [currentPosition, setCurrentPosition] = useState<AuctionBid | undefined>(undefined);
  const { data: poolTokenValues } = useTokenByAddress([yesTokenId, noTokenId], MARKET_ADDRESS);
  const { data: userTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId],
    activeAccount?.address,
  );
  const market = typeof data !== 'undefined' ? findByMarketId(data, marketId) : undefined;
  const yes = yesPrice <= 0 ? '--' : roundToTwo(yesPrice);
  const no = yesPrice <= 0 ? '--' : roundToTwo(1 - yesPrice);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (poolTokenValues) {
      const yesPool = getTokenQuantityById(poolTokenValues, yesTokenId);
      const noPool = getTokenQuantityById(poolTokenValues, noTokenId);
      setYesPrice(yesPool / (yesPool + noPool));
    }
  }, [poolTokenValues, noTokenId, yesTokenId]);

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

  useEffect(() => {
    if (activeAccount?.address || connected) {
      setAdditional(true);
    } else {
      setAdditional(false);
    }
  }, [activeAccount?.address, connected, market]);
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
          const yesPool = getTokenQuantityById(poolTokenValues, yesTokenId);
          const noPool = getTokenQuantityById(poolTokenValues, noTokenId);
          const aBal = values.outcome === TokenType.yes ? userYesBal : userNoBal;
          const [aPool, bPool] =
            values.outcome === TokenType.yes ? [yesPool, noPool] : [noPool, yesPool];
          const canSellWithoutSwap = userYesBal >= quantity && userNoBal >= quantity;
          if (canSellWithoutSwap) {
            await sellTokens(values.outcome, marketId, quantity);
          } else {
            const computed = closePosition(aPool, bPool, aBal);
            await sellTokens(
              values.outcome,
              marketId,
              quantity,
              Number(computed.aToSwap.toString().split('.')[0]),
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
        label: `${TokenType.yes}(${[yes, Currency.USD].join(' ')})`,
        value: TokenType.yes,
      },
      {
        label: `${TokenType.no}(${[no, Currency.USD].join(' ')})`,
        value: TokenType.no,
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

  const bidToPosition = (bid: AuctionBid): PositionItem[] => {
    return [
      {
        label: t('Probability'),
        value: `${bid.probability}%`,
      },
      {
        label: t('Contribution'),
        value: `${bid.contribution} USDtz`,
      },
    ];
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

  const handleWithdrawAuction = async () => {
    if (activeAccount?.address && marketId) {
      try {
        await withdrawAuction(marketId);
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

  const handleResolveMarket = async (values: any) => {
    if (activeAccount?.address && marketId) {
      try {
        await resolveMarket(marketId, values.outcome);
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

  const handleClaimWinnings = async () => {
    if (activeAccount?.address && marketId) {
      try {
        await claimWinnings(marketId);
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

  return (
    <MainPage>
      <ResolveMarketModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleResolveMarket}
      />
      {isLoading && <Loading />}
      {market && (
        <Grid container spacing={3}>
          <Grid item mt={3} xs={12}>
            <MarketHeader {...marketHeaderData} />
          </Grid>
          <Grid item xs={8}>
            <MarketDetailCard {...marketDescription} />
          </Grid>
          <Grid item xs={4}>
            <Grid item xs={12}>
              <TradeContainer {...tradeData} />
            </Grid>
            {additional && (
              <Grid item xs={12} mt="1rem">
                <Card>
                  <CardHeader
                    title={
                      <Typography color="primary.main" component="h3">
                        Additional action(s)
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Grid container spacing={3} direction="column">
                      {currentPosition && (
                        <>
                          <Grid item>
                            <PositionSummary
                              title={t('Current Position')}
                              items={bidToPosition(currentPosition)}
                            />
                          </Grid>

                          <Grid item>
                            <CustomButton
                              fullWidth
                              label="Withdraw Auction Win"
                              onClick={handleWithdrawAuction}
                            />
                          </Grid>
                        </>
                      )}
                      {market.adjudicator === activeAccount?.address && !market.winningPrediction && (
                        <Grid item>
                          <CustomButton fullWidth label="Resolve Market" onClick={handleOpen} />
                        </Grid>
                      )}
                      {market.winningPrediction && (
                        <Grid item>
                          <CustomButton
                            fullWidth
                            label="Claim winnings"
                            onClick={handleClaimWinnings}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
