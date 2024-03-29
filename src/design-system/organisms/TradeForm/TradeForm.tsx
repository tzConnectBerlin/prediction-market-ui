import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { RiRefreshLine } from 'react-icons/ri';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { FormikToggleButton } from '../../molecules/FormikToggleButton';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';
import { MarketTradeType, Token, TokenType } from '../../../interfaces';
import { getNoTokenId, getTokenQuantityById, getYesTokenId } from '../../../utils/misc';
import {
  roundToTwo,
  roundTwoAndTokenDown,
  tokenDivideDown,
  tokenMultiplyUp,
} from '../../../utils/math';
import {
  buyTokenCalculation,
  closePosition,
  priceValueCalculation,
  add,
  tokensToCurrency,
  totalTokensValue,
} from '../../../contracts/MarketCalculations';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import { useStore } from '../../../store/store';
import { AuctionBid } from '../SubmitBidCard';
import { CURRENCY_SYMBOL } from '../../../globals';

const defaultTokenPrice = {
  yes: 0,
  no: 0,
};

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };

export type TradeValue = {
  outcome: TokenType;
  quantity: number | string;
  tradeType: MarketTradeType;
};
export interface TradeFormProps {
  /**
   * Callback to get the form values
   */
  handleSubmit:
    | ((values: TradeValue, formikHelpers: FormikHelpers<TradeValue>) => void | Promise<void>)
    | (() => void);
  /**
   * Callback to refresh prices
   */
  handleRefreshClick?: () => void | Promise<void>;
  /**
   * Callback to get maximum amount
   */
  handleMaxAmount?: (tradeType: MarketTradeType, tokenType: TokenType) => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: Omit<TradeValue, 'tradeType'>;
  /**
   * Market Id
   */
  marketId: string;
  /**
   * Pool token values
   */
  poolTokens?: Token[];
  /**
   * User token values
   */
  userTokens?: Token[];
  /**
   * liquidity position in the market if there is one
   */
  liquidityPosition?: AuctionBid;
  /**
   * Title form to display
   */
  title: string;
  /**
   * TokenName to display
   */
  tokenName?: string;
  /**
   * Trade type
   */
  tradeType: MarketTradeType;
  /**
   * Outcome Items
   */

  outcomeItems: ToggleButtonItems[];
  /**
   * holding the winning token
   */
  holdingWinner?: boolean;
  /**
   * Is wallet connected
   */
  connected?: boolean;
  /**
   * Token Price
   */
  tokenPrice?: {
    yes: number;
    no: number;
  };
  /**
   * disable button
   */
  disabled: boolean;
}

export const TradeForm: React.FC<TradeFormProps> = ({
  title,
  tokenName,
  handleSubmit,
  handleRefreshClick,
  handleMaxAmount,
  initialValues,
  outcomeItems,
  connected,
  tradeType,
  holdingWinner,
  marketId,
  poolTokens,
  userTokens,
  tokenPrice = defaultTokenPrice,
  liquidityPosition,
}) => {
  const { t } = useTranslation('common');
  const { slippage } = useStore();
  const yesTokenId = React.useMemo(() => getYesTokenId(marketId), [marketId]);
  const noTokenId = React.useMemo(() => getNoTokenId(marketId), [marketId]);
  const [outcome, setOutcome] = React.useState(initialValues?.outcome ?? TokenType.yes);
  const [buyPositions, setBuyPositions] = React.useState<PositionItem[]>([]);
  const [sellPosition, setSellPositions] = React.useState<PositionItem[]>([]);
  const [maxQuantity, setMaxQuantity] = React.useState(0);
  const [pools, setPools] = React.useState({
    yesPool: 0,
    noPool: 0,
  });

  const [userAmounts, setUserAmounts] = React.useState({
    yesToken: 0,
    noToken: 0,
  });

  const quantityEndAdornment = React.useMemo(() => {
    if (tradeType === MarketTradeType.payOut) {
      return `${t(outcome)} ${t('token')}`;
    }
    return tokenName;
  }, [outcome, t, tokenName, tradeType]);

  const enableSell = React.useMemo(() => {
    if (tradeType === MarketTradeType.payIn) {
      return true;
    }
    if (typeof userTokens === 'undefined') {
      return false;
    }
    return userTokens.reduce((prev, item) => {
      if (Number(item.quantity) > 0 || prev) {
        return true;
      }
      return false;
    }, false);
  }, [tradeType, userTokens]);

  useEffect(() => {
    if (poolTokens) {
      const yesPool = getTokenQuantityById(poolTokens, yesTokenId);
      const noPool = getTokenQuantityById(poolTokens, noTokenId);
      setPools({
        yesPool,
        noPool,
      });
    }
    if (userTokens) {
      const yesToken = getTokenQuantityById(userTokens, yesTokenId);
      const noToken = getTokenQuantityById(userTokens, noTokenId);
      setUserAmounts({
        noToken,
        yesToken,
      });
    }
  }, [poolTokens, userTokens, yesTokenId, noTokenId, outcome]);

  const currentPositions = React.useMemo(() => {
    if (connected) {
      const currentTokens = totalTokensValue(
        userAmounts.yesToken,
        tokenPrice.yes,
        userAmounts.noToken,
        tokenPrice.no,
      );
      const liquidityContribution =
        typeof liquidityPosition?.contribution === 'number'
          ? liquidityPosition.contribution
          : Number.parseInt(liquidityPosition?.contribution ?? '0', 10);
      const totalPositions = roundToTwo(
        add(liquidityContribution, roundTwoAndTokenDown(currentTokens)),
      );

      const currentPrice = outcome === TokenType.yes ? tokenPrice.yes : tokenPrice.no;
      const newCurrentPosition: PositionItem[] = [
        {
          label: `${t('price')} (${t(outcome)})`,
          value: roundToTwo(currentPrice),
        },
        {
          label: `${t(TokenType.yes)} ${t('tokens')}`,
          value: roundTwoAndTokenDown(userAmounts.yesToken),
        },
        {
          label: `${t(TokenType.no)} ${t('tokens')}`,
          value: roundTwoAndTokenDown(userAmounts.noToken),
        },
        {
          label: t('totalValue'),
          value: `${roundTwoAndTokenDown(currentTokens)} ${tokenName}`,
        },
      ];
      return { current: newCurrentPosition, total: totalPositions };
    }
    return { current: [], total: 0 };
  }, [
    connected,
    tokenPrice.yes,
    tokenPrice.no,
    userAmounts.yesToken,
    userAmounts.noToken,
    liquidityPosition?.contribution,
    outcome,
    t,
    tokenName,
  ]);

  useEffect(() => {
    if (tradeType === MarketTradeType.payOut) {
      const max = TokenType.yes === outcome ? userAmounts.yesToken : userAmounts.noToken;
      setMaxQuantity(tokenDivideDown(max));
    }
  }, [outcome, tradeType, userAmounts]);

  const handleOutcomeChange = React.useCallback(
    (e: any, tokenType: TokenType) => {
      const otherTokenType = tokenType === TokenType.yes ? TokenType.no : TokenType.yes;
      const [selected, other] =
        tokenType === TokenType.yes
          ? [userAmounts.yesToken, userAmounts.noToken]
          : [userAmounts.noToken, userAmounts.yesToken];
      if (tradeType === MarketTradeType.payIn) {
        if (Number.parseFloat(e.target.value) > 0) {
          const { quantity, swap, price } = buyTokenCalculation(
            tokenType,
            Number(e.target.value),
            pools.yesPool,
            pools.noPool,
            roundToTwo(tokenPrice.yes),
            roundToTwo(tokenPrice.no),
            slippage,
          );
          const otherValue = tokenDivideDown(other) + roundToTwo(1 - price);
          const selectedValue = tokenDivideDown(quantity + swap + selected) * price;
          const newTotalValue = roundToTwo(otherValue + selectedValue);
          const buyPositionSummary: PositionItem[] = [
            {
              label: `${t('price')} (${t(tokenType)})`,
              value: roundToTwo(price),
            },
            {
              label: `${t(tokenType)} ${t('tokens')}`,
              value: roundTwoAndTokenDown(quantity + swap + selected),
            },
            {
              label: `${t(otherTokenType)} ${t('tokens')}`,
              value: roundTwoAndTokenDown(other),
            },
            {
              label: t('totalValue'),
              value: `${newTotalValue} ${tokenName}`,
            },
          ];
          setBuyPositions(buyPositionSummary);
        } else {
          setBuyPositions([]);
        }
      }
      if (tradeType === MarketTradeType.payOut) {
        if (Number.parseFloat(e.target.value) > 0) {
          const [aPool, bPool] =
            TokenType.yes === tokenType
              ? [pools.yesPool, pools.noPool]
              : [pools.noPool, pools.yesPool];
          const quantity = tokenMultiplyUp(e.target.value);
          const sellPositionSummary: PositionItem[] = [];
          const { aLeft, bReceivedWithSlippage, aToSwap } = closePosition(
            aPool,
            bPool,
            quantity,
            slippage,
          );
          const [newAPool, newBPool] = [aPool - aToSwap, bPool + bReceivedWithSlippage];
          const newPrice = roundToTwo(priceValueCalculation(newBPool, newAPool + newBPool));
          const currentTokens = totalTokensValue(
            selected - quantity,
            newPrice,
            other,
            1 - newPrice,
          );
          sellPositionSummary.push(
            {
              label: `${t(tokenType)} ${t('tokens')}`,
              value: roundTwoAndTokenDown(selected - quantity),
            },
            {
              label: `${t(otherTokenType)} ${t('tokens')}`,
              value: roundTwoAndTokenDown(other),
            },
            {
              label: t('totalValue'),
              value: `${roundTwoAndTokenDown(currentTokens)} ${tokenName}`,
            },
            {
              label: t('withdrawValue'),
              value: `${roundToTwo(
                tokensToCurrency(tokenDivideDown(Math.floor(aLeft))),
              )} ${tokenName}`,
            },
          );
          setSellPositions(sellPositionSummary);
        } else {
          setSellPositions([]);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      userAmounts.yesToken,
      userAmounts.noToken,
      tradeType,
      pools.yesPool,
      pools.noPool,
      tokenPrice.yes,
      tokenPrice.no,
      slippage,
      tokenName,
    ],
  );
  const handleChange = React.useCallback(
    (e: any) => {
      handleOutcomeChange(e, outcome);
    },
    [handleOutcomeChange, outcome],
  );

  const validationSchema = React.useMemo(() => {
    if (tradeType === MarketTradeType.payOut) {
      const minToken = maxQuantity > 0 ? 0.000001 : 0;
      return Yup.object({
        outcome: Yup.string()
          .oneOf([TokenType.yes, TokenType.no], t('selectYesNo'))
          .required(t('required')),
        quantity: Yup.number()
          .min(minToken, `${t('minSell')} ${minToken}`)
          .max(maxQuantity, `${t('maxSell')} ${maxQuantity}`)
          .required(t('required')),
      });
    }
    return Yup.object({
      outcome: Yup.string()
        .oneOf([TokenType.yes, TokenType.no], t('selectYesNo'))
        .required(t('required')),
      quantity: Yup.number()
        .min(0.000001, `${t('minBuy')} 0.000001`)
        .required(t('required')),
    });
  }, [userAmounts, outcome, tradeType, maxQuantity]);

  const initialFormValues: TradeValue = initialValues
    ? {
        ...initialValues,
        tradeType,
      }
    : {
        outcome: TokenType.yes,
        quantity: '',
        tradeType,
      };

  const bidToPosition = (bid: AuctionBid): PositionItem[] => {
    return [
      {
        label: t('probability'),
        value: `${bid.probability}%`,
      },
      {
        label: t('contribution'),
        value: `${bid.contribution} ${tokenName}`,
      },
    ];
  };

  return (
    <>
      {enableSell && (
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialFormValues}
          enableReinitialize
        >
          {({ values, setFieldValue, setTouched }) => (
            <Form noValidate>
              <Grid
                marginTop="0rem"
                container
                spacing={3}
                direction="column"
                alignContent="flex-start"
                justifyContent="center"
              >
                {outcomeItems.length > 0 && (
                  <>
                    <Grid item width="100%">
                      <Field
                        component={FormikToggleButton}
                        label={t('token')}
                        name="outcome"
                        fullWidth
                        chip={!!handleRefreshClick}
                        chipText={t('refreshPrices')}
                        chipOnClick={handleRefreshClick}
                        chipIcon={<RiRefreshLine />}
                        toggleButtonItems={outcomeItems}
                        onChange={(e: any, item: any) => {
                          const tokenType = TokenType.yes === item ? TokenType.yes : TokenType.no;
                          setOutcome(tokenType);
                          handleOutcomeChange({ target: { value: values.quantity } }, tokenType);
                          setFieldValue('quantity', '');
                          setTouched({ quantity: false });
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        placeholder="Type here"
                        component={FormikTextField}
                        label={t('amount')}
                        name="quantity"
                        type="number"
                        pattern="[0-9]*"
                        fullWidth
                        chip={!!handleMaxAmount}
                        chipText={t('maxAmount')}
                        chipOnClick={handleMaxAmount}
                        handleChange={handleChange}
                        InputProps={
                          quantityEndAdornment
                            ? {
                                endAdornment: (
                                  <Typography
                                    color="text.secondary"
                                    component="span"
                                    sx={endAdornmentStyles}
                                  >
                                    {quantityEndAdornment}
                                  </Typography>
                                ),
                              }
                            : undefined
                        }
                      />
                    </Grid>
                  </>
                )}
                {connected &&
                  (userAmounts.noToken > 0 || userAmounts.yesToken > 0) &&
                  (holdingWinner || outcomeItems) && (
                    <Grid item width="100%">
                      {holdingWinner && (
                        <Typography fontWeight={700} paddingBottom="2rem" paddingTop="1rem">
                          {t('yourPositions')}
                        </Typography>
                      )}
                      <PositionSummary
                        title={holdingWinner ? t('tradingPosition') : t('currentPosition')}
                        items={currentPositions.current}
                      />
                    </Grid>
                  )}
                {connected && liquidityPosition && outcomeItems.length === 0 && (
                  <Grid item width="100%" marginTop=".5rem">
                    <PositionSummary
                      title={t('liquidityPosition')}
                      items={bidToPosition(liquidityPosition)}
                    />
                    <Grid
                      container
                      item
                      paddingTop="2rem"
                      paddingBottom=".5rem"
                      justifyContent="space-between"
                    >
                      <Typography color="primary" size="subtitle1" component="h4">
                        {t('totalPositions')}
                      </Typography>
                      <Typography fontWeight={700}>
                        {currentPositions.total} {CURRENCY_SYMBOL}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {outcomeItems.length > 0 && values.quantity > 0 && (
                  <Grid item width="100%">
                    {tradeType === MarketTradeType.payIn && buyPositions.length > 0 && (
                      <PositionSummary
                        title={connected ? t('expectedAdjustedPosition') : t('expectedPosition')}
                        items={buyPositions}
                      />
                    )}
                    {connected &&
                      tradeType === MarketTradeType.payOut &&
                      sellPosition.length > 0 && (
                        <PositionSummary
                          title={t('expectedAdjustedPosition')}
                          items={sellPosition}
                        />
                      )}
                  </Grid>
                )}
                <Grid item flexDirection="column">
                  <CustomButton
                    lowercase
                    color="primary"
                    type={holdingWinner || !connected ? 'button' : 'submit'}
                    onClick={holdingWinner || !connected ? (handleSubmit as never) : undefined}
                    fullWidth
                    label={t(title)}
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      {!enableSell && (
        <Grid container alignContent="center" justifyContent="center">
          <Grid item>
            <Typography>{t('onlyTokenHolders')}</Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
