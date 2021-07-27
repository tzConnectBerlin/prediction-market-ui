import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import { useMarkets, useTokenByAddress } from '../../api/queries';
import { findByMarketId } from '../../api/utils';
import {
  getMarketStateLabel,
  getNoTokenId,
  getTokenQuantityById,
  getYesTokenId,
} from '../../utils/misc';
import { logError } from '../../logger/logger';
import { Currency, FormType, MarketTradeType, TokenType } from '../../interfaces/market';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../utils/math';
import { MainPage } from '../MainPage/MainPage';
import { TradeProps } from '../../design-system/organisms/TradeForm';
import { MarketDetailCard } from '../../design-system/molecules/MarketDetailCard';
import {
  MarketHeader,
  MarketHeaderProps,
} from '../../design-system/molecules/MarketHeader/MarketHeader';
import { Loading } from '../../design-system/atoms/Loading';
import { TradeFormProps, TradeValue } from '../../design-system/organisms/TradeForm/TradeForm';
import { ToggleButtonItems } from '../../design-system/molecules/FormikToggleButton/FormikToggleButton';
import { buyTokens, sellTokens } from '../../contracts/Market';
import { MARKET_ADDRESS } from '../../utils/globals';
import { closePosition } from '../../contracts/MarketCalculations';
import { FormNavigation } from '../../design-system/organisms/FormNavigation';
import { CurrentAction } from '../../design-system/organisms/FormNavigation/FormNavigation';

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
  const [yesPrice, setYesPrice] = React.useState(0);
  const { data: poolTokenValues } = useTokenByAddress([yesTokenId, noTokenId], MARKET_ADDRESS);
  const { data: userTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId],
    activeAccount?.address,
  );
  const market = typeof data !== 'undefined' ? findByMarketId(data, marketId) : undefined;
  const yes = yesPrice < 0 ? '--' : roundToTwo(yesPrice);
  const no = yesPrice < 0 ? '--' : roundToTwo(1 - yesPrice);
  const [currentAction, setCurrentAction] = useState<CurrentAction>();

  useEffect(() => {
    if (market) {
      setYesPrice(market.yesPrice);
    }
  }, [market]);

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

  const buyData: TradeFormProps = {
    title: 'Buy',
    tradeType: MarketTradeType.buy,
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

  const marketActionList = [
    {
      name: 'Buy',
      formType: FormType.buy,
    },
    {
      name: 'Sell',
      formType: FormType.sell,
    },
    {
      name: 'Add Liquidity',
      formType: FormType.addLiquidity,
    },
    {
      name: 'Remove Liquidity',
      formType: FormType.removeLiquidity,
    },
  ];

  const handleCurrentAction = (actionType?: FormType) => {
    switch (actionType) {
      case FormType.buy:
        setCurrentAction({
          formType: actionType,
          formValues: buyData,
        });
        break;
      default: {
        setCurrentAction(undefined);
        console.log(actionType);
      }
    }
  };

  return (
    <MainPage>
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
              {/* <TradeContainer {...tradeData} /> */}
              <FormNavigation
                title="Position Summary"
                actionList={marketActionList}
                handleAction={handleCurrentAction}
                current={currentAction}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
