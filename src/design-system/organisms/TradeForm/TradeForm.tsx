import React from 'react';
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
import { MarketTradeType, TokenType } from '../../../interfaces';

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
}) => {
  const { t } = useTranslation('common');
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
