import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { RiRefreshLine } from 'react-icons/ri';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { FormikToggleButton } from '../../molecules/FormikToggleButton';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';
import { MarketTradeType, Token, TokenType } from '../../../interfaces';
import { getYesTokenId, getNoTokenId } from '../../../api/utils';
import { getTokenQuantityById } from '../../../utils/misc';
import { roundToTwo, tokenDivideDown, tokenMultiplyUp } from '../../../utils/math';
import { calcSwapOutput } from '../../../contracts/MarketCalculations';

export type TradeValue = {
  outcome: TokenType;
  quantity: number;
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
}) => {
  const { t } = useTranslation('common');
  const yesTokenId = React.useMemo(() => getYesTokenId(marketId), [marketId]);
  const noTokenId = React.useMemo(() => getNoTokenId(marketId), [marketId]);
  const [outcome, setOutcome] = React.useState(initialValues?.outcome ?? TokenType.yes);
  const [maxBuy, setMaxBuy] = React.useState(0);
  const [pools, setPools] = React.useState({
    yesPool: new BigNumber(0),
    noPool: new BigNumber(0),
  });

  useEffect(() => {
    if (poolTokens) {
      const yesPool = new BigNumber(getTokenQuantityById(poolTokens, yesTokenId));
      const noPool = new BigNumber(getTokenQuantityById(poolTokens, noTokenId));
      setPools({
        yesPool,
        noPool,
      });
    }
  }, [poolTokens, yesTokenId, noTokenId]);

  const handleChange = React.useCallback(
    (e: any) => {
      if (tradeType === MarketTradeType.buy) {
        const val = tokenMultiplyUp(e.target.value);
        const value = new BigNumber(val);
        const [aPool, bPool] =
          TokenType.yes === outcome ? [pools.noPool, pools.yesPool] : [pools.yesPool, pools.noPool];
        const maxSwap = calcSwapOutput(aPool, bPool, value);
        const maxToken = val + maxSwap.toNumber();
        setMaxBuy(roundToTwo(tokenDivideDown(maxToken)));
      }
    },
    [outcome, pools],
  );

  const validationSchema = Yup.object({
    outcome: Yup.string().oneOf([TokenType.yes, TokenType.no]).required(),
    quantity: Yup.number().required(),
  });
  const initialFormValues: TradeValue = initialValues
    ? {
        ...initialValues,
        tradeType,
      }
    : {
        outcome: TokenType.yes,
        quantity: 0,
        tradeType,
      };
  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialFormValues}
      enableReinitialize
    >
      {({ isSubmitting, isValid }) => (
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
                label={t('outcome')}
                name="outcome"
                fullWidth
                chip={!!handleRefreshClick}
                chipText="Refresh Prices"
                chipOnClick={handleRefreshClick}
                chipIcon={<RiRefreshLine />}
                required
                toggleButtonItems={outcomeItems}
                onChange={(e: any, item: TokenType) => {
                  setOutcome(item);
                }}
              />
            </Grid>
            <Grid item>
              <Field
                component={FormikTextField}
                label={t('quantity')}
                name="quantity"
                type="number"
                fullWidth
                chip={!!handleMaxAmount}
                chipText="Max Amount"
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
              <CustomButton
                color="primary"
                type="submit"
                label={`${t(title)}${isSubmitting ? '...' : ''}`}
                fullWidth
                disabled={isSubmitting || !isValid || !connected}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
