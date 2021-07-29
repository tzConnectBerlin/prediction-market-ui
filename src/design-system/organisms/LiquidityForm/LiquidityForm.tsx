import React from 'react';
import * as Yup from 'yup';
import { BsArrowLeft } from 'react-icons/bs';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton, useTheme } from '@material-ui/core';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';
import { MarketTradeType, Token, TokenType } from '../../../interfaces';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';
import { TradeValue } from '../TradeForm/TradeForm';

export type LiquidityValue = Omit<TradeValue, 'outcome'>;
export interface LiquidityFormProps {
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: LiquidityValue,
    formikHelpers: FormikHelpers<LiquidityValue>,
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
   * Callback to back the FormNavigation
   */
  handleBackClick?: () => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: Omit<LiquidityValue, 'tradeType'>;
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
   * Is wallet connected
   */
  connected?: boolean;
}

export const LiquidityForm: React.FC<LiquidityFormProps> = ({
  title,
  tokenName,
  handleSubmit,
  handleMaxAmount,
  handleBackClick,
  initialValues,
  connected,
  tradeType,
  marketId,
  userTokens,
}) => {
  const { t } = useTranslation('common');
  const [currentPosition, setcurrentPosition] = React.useState<PositionItem[]>([]);
  const [adjustedPosition, setadjustedPositions] = React.useState<PositionItem[]>([]);
  const [maxQuantity, setMaxQuantity] = React.useState(0);

  let validationSchema = Yup.object({
    quantity: Yup.number().min(0.000001, `Min tokens to buy 0.000001`).required('Required'),
  });
  if (tradeType === MarketTradeType.payOut) {
    const minToken = maxQuantity > 0 ? 0.000001 : 0;
    validationSchema = Yup.object({
      quantity: Yup.number()
        .min(minToken, `Min tokens to sell ${minToken}`)
        .max(maxQuantity, `Max tokens to sell ${maxQuantity}`)
        .required('Required'),
    });
  }
  const initialFormValues: LiquidityValue = initialValues
    ? {
        ...initialValues,
        tradeType,
      }
    : {
        quantity: 0,
        tradeType,
      };
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        {tradeType === MarketTradeType.payIn && currentPosition.length > 0 && (
          <PositionSummary title="Position Summary" items={currentPosition} />
        )}
        {tradeType === MarketTradeType.payOut && adjustedPosition.length > 0 && (
          <PositionSummary title="Position Summary" items={adjustedPosition} />
        )}
      </Grid>
      <Grid item>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          initialValues={initialFormValues}
          enableReinitialize
        >
          {({ isSubmitting, isValid, values }) => (
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
                    component={FormikTextField}
                    label={t('quantity')}
                    name="quantity"
                    type="number"
                    fullWidth
                    chip={!!handleMaxAmount}
                    chipText="Max Amount"
                    chipOnClick={handleMaxAmount}
                    InputProps={
                      tokenName
                        ? {
                            endAdornment: (
                              <Typography color="text.secondary">{tokenName}</Typography>
                            ),
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
      </Grid>
    </Grid>
  );
};
