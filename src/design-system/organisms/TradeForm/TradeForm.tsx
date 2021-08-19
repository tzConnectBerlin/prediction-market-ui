import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { RiRefreshLine } from 'react-icons/ri';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { useToasts } from 'react-toast-notifications';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { FormikToggleButton } from '../../molecules/FormikToggleButton';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';
import { MarketTradeType, Token, TokenType } from '../../../interfaces';
import { getNoTokenId, getTokenQuantityById, getYesTokenId } from '../../../utils/misc';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../../utils/math';
import {
  buyTokenCalculation,
  closePosition,
  tokensToCurrency,
} from '../../../contracts/MarketCalculations';
import { logError } from '../../../logger/logger';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import { claimWinnings } from '../../../contracts/Market';

const TokenPriceDefault = {
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
  handleSubmit: (
    values: TradeValue,
    formikHelpers: FormikHelpers<TradeValue>,
  ) => void | Promise<void>;
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
   * claims winnings
   */
  handleClaimWinnings: () => Promise<void>;
  /**
   * disabled button
   */
  disabled: boolean;
}

export const TradeForm: React.FC<TradeFormProps> = ({
  title,
  tokenName,
  handleSubmit,
  handleRefreshClick,
  handleMaxAmount,
  handleClaimWinnings,
  initialValues,
  outcomeItems,
  disabled,
  connected,
  tradeType,
  holdingWinner,
  marketId,
  poolTokens,
  userTokens,
  tokenPrice = TokenPriceDefault,
}) => {
  const { t } = useTranslation('common');
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
  }, [outcome, tokenName, tradeType]);

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
      const currentTokens =
        tokenPrice.yes * userAmounts.yesToken + userAmounts.noToken * tokenPrice.no;
      const currentPrice = outcome === TokenType.yes ? tokenPrice.yes : tokenPrice.no;
      const newCurrentPosition: PositionItem[] = [
        {
          label: `${t('price')} (${t(outcome)})`,
          value: roundToTwo(currentPrice),
        },
        {
          label: `${t(TokenType.yes)} ${t('tokens')}`,
          value: roundToTwo(tokenDivideDown(userAmounts.yesToken)),
        },
        {
          label: `${t(TokenType.no)} ${t('tokens')}`,
          value: roundToTwo(tokenDivideDown(userAmounts.noToken)),
        },
        {
          label: t('totalValue'),
          value: `${roundToTwo(tokenDivideDown(currentTokens))} ${tokenName}`,
        },
      ];
      tokenPrice.yes === 0
        ? newCurrentPosition.splice(1, 1)
        : tokenPrice.no === 0
        ? newCurrentPosition.splice(2, 1)
        : null;
      return newCurrentPosition;
    }
    return [];
  }, [connected, userAmounts, userTokens, tokenPrice, outcome, tokenName]);

  useEffect(() => {
    if (tradeType === MarketTradeType.payOut) {
      const max = TokenType.yes === outcome ? userAmounts.yesToken : userAmounts.noToken;
      setMaxQuantity(Math.floor(tokenDivideDown(max)));
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
        if (Number.parseFloat(e.target.value)) {
          const { quantity, swap, price } = buyTokenCalculation(
            tokenType,
            Number(e.target.value),
            pools.yesPool,
            pools.noPool,
            tokenPrice.yes,
            tokenPrice.no,
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
              value: roundToTwo(tokenDivideDown(quantity + swap + selected)),
            },
            {
              label: `${t(otherTokenType)} ${t('tokens')}`,
              value: roundToTwo(tokenDivideDown(other)),
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
        if (Number.parseFloat(e.target.value)) {
          const [aPool, bPool] =
            TokenType.yes === tokenType
              ? [pools.yesPool, pools.noPool]
              : [pools.noPool, pools.yesPool];
          const quantity = tokenMultiplyUp(e.target.value);
          const sellPositionSummary: PositionItem[] = [];
          const { aLeft, bReceived, aToSwap } = closePosition(aPool, bPool, quantity);
          const [newAPool, newBPool] = [aPool - aToSwap, bPool + bReceived];
          const newPrice = roundToTwo(newBPool / (newAPool + newBPool));
          const currentTokens = selected - quantity * newPrice + other * (1 - newPrice);
          sellPositionSummary.push(
            {
              label: `${t(tokenType)} ${t('tokens')}`,
              value: roundToTwo(tokenDivideDown(selected - quantity)),
            },
            {
              label: `${t(otherTokenType)} ${t('tokens')}`,
              value: roundToTwo(tokenDivideDown(other)),
            },
            {
              label: t('totalValue'),
              value: `${roundToTwo(tokenDivideDown(currentTokens))} ${tokenName}`,
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
    [pools, tradeType, userAmounts, tokenPrice],
  );
  const handleChange = React.useCallback(
    (e: any) => {
      handleOutcomeChange(e, outcome);
    },
    [handleOutcomeChange, outcome],
  );

  let validationSchema = Yup.object({
    outcome: Yup.string()
      .oneOf([TokenType.yes, TokenType.no], t('selectYesNo'))
      .required(t('required')),
    quantity: Yup.number()
      .min(0.000001, `${t('minBuy')} 0.000001`)
      .required(t('required')),
  });
  if (tradeType === MarketTradeType.payOut) {
    const minToken = maxQuantity > 0 ? 0.000001 : 0;
    validationSchema = Yup.object({
      outcome: Yup.string()
        .oneOf([TokenType.yes, TokenType.no], t('selectYesNo'))
        .required(t('required')),
      quantity: Yup.number()
        .min(minToken, `${t('minSell')} ${minToken}`)
        .max(maxQuantity, `${t('maxSell')} ${maxQuantity}`)
        .required(t('required')),
    });
  }

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

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialFormValues}
      enableReinitialize
    >
      {({ isValid, values }) => (
        <Form>
          <Grid
            container
            spacing={3}
            direction="column"
            alignContent="flex-start"
            justifyContent="center"
          >
            {!!outcomeItems.length && (
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
                    required
                    toggleButtonItems={outcomeItems}
                    onChange={(e: any, item: any) => {
                      const tokenType = TokenType.yes === item ? TokenType.yes : TokenType.no;
                      setOutcome(tokenType);
                      handleOutcomeChange({ target: { value: values.quantity } }, tokenType);
                    }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={FormikTextField}
                    label={t('quantity')}
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
                    required
                  />
                </Grid>
              </>
            )}

            {connected && userTokens && userTokens?.length > 0 && (holdingWinner || outcomeItems) && (
              <Grid item width="100%">
                <PositionSummary title={t('currentPosition')} items={currentPositions} />
              </Grid>
            )}
            <Grid item width="100%">
              {tradeType === MarketTradeType.payIn && buyPositions.length > 0 && (
                <PositionSummary
                  title={connected ? t('expectedAdjustedPosition') : t('expectedPosition')}
                  items={buyPositions}
                />
              )}
              {connected && tradeType === MarketTradeType.payOut && sellPosition.length > 0 && (
                <PositionSummary title={t('expectedAdjustedPosition')} items={sellPosition} />
              )}
            </Grid>
            <Grid item>
              <CustomButton
                color="primary"
                type={holdingWinner ? 'button' : 'submit'}
                onClick={holdingWinner ? handleClaimWinnings : undefined}
                label={
                  holdingWinner
                    ? t('claimWinningsPage')
                    : !connected
                    ? `${t('connectWallet')} + ${t(title)}`
                    : t(title)
                }
                fullWidth
                disabled={!isValid || disabled}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
