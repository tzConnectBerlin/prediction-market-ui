import React from 'react';
import { Grid } from '@material-ui/core';
import { useTranslation, withTranslation } from 'react-i18next';
import { useToasts } from 'react-toast-notifications';
import { useParams } from 'react-router-dom';
import { FormikHelpers } from 'formik';
import { useWallet } from '@tz-contrib/react-wallet-provider';
import BigNumber from 'bignumber.js';
import { useMarkets, useTokenByAddress } from '../../api/queries';
import { findByMarketId, getNoTokenId, getYesTokenId } from '../../api/utils';
import { getMarketStateLabel } from '../../utils/misc';
import { logError } from '../../logger/logger';
import { Currency, MarketTradeType, TokenType } from '../../interfaces/market';
import { roundToTwo, tokenMultiplyUp } from '../../utils/math';
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
  const { addToast } = useToasts();
  const { marketId } = useParams<MarketPageProps>();
  const yesTokenId = getYesTokenId(marketId);
  const noTokenId = getNoTokenId(marketId);
  const { connected, activeAccount } = useWallet();
  const { data, isLoading } = useMarkets();
  const { data: userTokenValues } = useTokenByAddress(
    [yesTokenId, noTokenId],
    activeAccount?.address,
  );
  const { data: poolTokenValues } = useTokenByAddress([yesTokenId, noTokenId], MARKET_ADDRESS);
  const market = typeof data !== 'undefined' ? findByMarketId(data, marketId) : undefined;
  const handleTradeSubmission = async (values: TradeValue, helpers: FormikHelpers<TradeValue>) => {
    if (activeAccount?.address) {
      try {
        if (values.tradeType === MarketTradeType.buy) {
          await buyTokens(values.outcome, marketId, values.quantity, activeAccount.address);
        }
        if (values.tradeType === MarketTradeType.sell && userTokenValues && poolTokenValues) {
          const quantity = tokenMultiplyUp(values.quantity);
          const userYesBal = new BigNumber(userTokenValues[1].quantity);
          const userNoBal = new BigNumber(userTokenValues[0].quantity);
          const yesPool = new BigNumber(poolTokenValues[1].quantity);
          const noPool = new BigNumber(poolTokenValues[0].quantity);
          const aBal = values.outcome === TokenType.yes ? userYesBal : userNoBal;
          const [aPool, bPool] =
            values.outcome === TokenType.yes ? [yesPool, noPool] : [noPool, yesPool];
          const canSellWithoutSwap =
            userYesBal.isGreaterThanOrEqualTo(quantity) &&
            userNoBal.isGreaterThanOrEqualTo(quantity);
          if (canSellWithoutSwap) {
            await sellTokens(values.outcome, marketId, quantity);
          } else {
            const computed = { ...closePosition(aPool, bPool, aBal), bHeld: new BigNumber(-1) };
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
  const outcomeItems: ToggleButtonItems[] = [
    {
      label: [market?.yesPrice, Currency.USD].join(' '),
      value: TokenType.yes,
    },
    {
      label: [roundToTwo(1 - (market?.yesPrice ?? 0)), Currency.USD].join(' '),
      value: TokenType.no,
    },
  ];

  const marketHeaderData: MarketHeaderProps = {
    title: market?.question ?? '',
    cardState: t(market?.state ?? ''),
    closeDate: market ? getMarketStateLabel(market, t) : '',
    iconURL: market?.iconURL,
    cardStateProps: {
      backgroundVariant: 'secondary',
      backgroundColor: 'main',
    },
    stats: [
      ...outcomeItems,
      {
        label: t('volume'),
        value: [market?.volume, Currency.USD].join(' ') ?? 0,
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

  const tradeData: TradeProps = {
    connected,
    handleSubmit: handleTradeSubmission,
    initialValues: {
      outcome: TokenType.yes,
      quantity: 0,
    },
    outcomeItems,
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
            <TradeContainer {...tradeData} />
          </Grid>
        </Grid>
      )}
    </MainPage>
  );
};

const MarketPage = withTranslation(['common', 'create-market'])(MarketPageComponent);
export default MarketPage;
