import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { MarketTradeType } from '../../../interfaces';
import { PositionItem, PositionSummary } from '../SubmitBidCard/PositionSummary';

export type LiquidityValue = {
  quantity: string | number;
  tradeType: MarketTradeType;
};
export interface LiquidityFormProps {
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: LiquidityValue,
    formikHelpers: FormikHelpers<LiquidityValue>,
  ) => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: Omit<LiquidityValue, 'tradeType'>;

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
  initialValues,
  connected,
  tradeType,
}) => {
  const { t } = useTranslation('common');
  const [currentPosition, setcurrentPosition] = React.useState<PositionItem[]>([]);
  const [adjustedPosition, setadjustedPositions] = React.useState<PositionItem[]>([]);

  const validationSchema = Yup.object({
    quantity: Yup.number().min(0.000001, `Min quantity is 0.000001`).required('Required'),
  });

  const initialFormValues: LiquidityValue = initialValues
    ? {
        ...initialValues,
        tradeType,
      }
    : {
        quantity: '',
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
          {({ isValid }) => (
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
                    inputMode="decimal"
                    pattern="[0-9]*"
                    fullWidth
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
                    label={!connected ? `${t('connectWallet')} + ${t(title)}` : t(title)}
                    fullWidth
                    disabled={!isValid}
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
