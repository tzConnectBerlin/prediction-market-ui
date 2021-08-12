import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { RiRefreshLine } from 'react-icons/ri';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { FormikToggleButton } from '../../molecules/FormikToggleButton';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';
import { MarketTradeType, Token, TokenType } from '../../../interfaces';
import { getNoTokenId, getTokenQuantityById, getYesTokenId } from '../../../utils/misc';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../../utils/math';
import { calcSwapOutput, closePosition } from '../../../contracts/MarketCalculations';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';

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
   * Is wallet connected
   */
  connected?: boolean;
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
  marketId,
  poolTokens,
  userTokens,
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

  useEffect(() => {
    if (tradeType === MarketTradeType.payOut) {
      const max = TokenType.yes === outcome ? userAmounts.yesToken : userAmounts.noToken;
      setMaxQuantity(Math.floor(tokenDivideDown(max)));
    }
  }, [outcome, tradeType, userAmounts]);

  const handleOutcomeChange = React.useCallback(
    (e: any, tokenType: TokenType) => {
      const value = tokenMultiplyUp(e.target.value);
      if (tradeType === MarketTradeType.payIn) {
        if (e.target.value) {
          const [aPool, bPool] =
            TokenType.yes === tokenType
              ? [pools.noPool, pools.yesPool]
              : [pools.yesPool, pools.noPool];
          const maxSwap = calcSwapOutput(aPool, bPool, value);
          const maxToken = value + maxSwap;
          const [newAPool, newBPool] =
            tokenType === TokenType.yes
              ? [pools.yesPool - maxSwap, pools.noPool + value]
              : [pools.noPool - maxSwap, pools.yesPool + value];
          const buyPositionSummary: PositionItem[] = [
            {
              label: t('expectedPrice'),
              value: roundToTwo(newBPool / (newAPool + newBPool)),
            },
            {
              label: t('expectedBought'),
              value: roundToTwo(tokenDivideDown(maxToken)),
            },
          ];
          setBuyPositions(buyPositionSummary);
        } else {
          setBuyPositions([]);
        }
      }
      if (tradeType === MarketTradeType.payOut) {
        if (e.target.value) {
          const quantity = tokenMultiplyUp(e.target.value);
          const sellPositionSummary: PositionItem[] = [];
          const canSellWithoutSwap =
            userAmounts.yesToken >= quantity && userAmounts.noToken >= quantity;
          if (canSellWithoutSwap) {
            sellPositionSummary.push({
              label: t('expectedPMM'),
              value: e.target.value,
            });
          } else {
            const [aPool, bPool] =
              TokenType.yes === tokenType
                ? [pools.yesPool, pools.noPool]
                : [pools.noPool, pools.yesPool];
            const computed = closePosition(aPool, bPool, quantity);
            sellPositionSummary.push({
              label: t('expectedPMM'),
              value: roundToTwo(tokenDivideDown(Math.floor(computed.aLeft))),
            });
          }
          setSellPositions(sellPositionSummary);
        } else {
          setSellPositions([]);
        }
      }
    },
    [pools, tradeType, userAmounts],
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
                  tokenName
                    ? {
                        endAdornment: <Typography color="text.secondary">{tokenName}</Typography>,
                      }
                    : undefined
                }
                required
              />
            </Grid>
            <Grid item>
              {connected && tradeType === MarketTradeType.payIn && buyPositions.length > 0 && (
                <PositionSummary title="Summary" items={buyPositions} />
              )}
              {connected && tradeType === MarketTradeType.payOut && sellPosition.length > 0 && (
                <PositionSummary title="Summary" items={sellPosition} />
              )}
            </Grid>
            <Grid item>
              <CustomButton
                color="primary"
                type="submit"
                label={!connected ? `${t('connectWallet')} + ${t(title)}` : t(title)}
                fullWidth
                disabled={!isValid}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
