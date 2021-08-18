import * as React from 'react';
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
   * Pool share to show on position
   */
  poolShare?: number;
  /**
   * Probability
   */
  probability?: number;
  /**
   * current position to show yes/no tokens and pool share when user is connected
   */
  currentPosition?: PositionItem[];
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
  currentPosition,
  connected,
  tradeType,
}) => {
  const { t } = useTranslation('common');
  /**
   * expected position to show yes/no tokens and pool share based on amount when user is not connected
   */
  const [expectedPosition, setExpectedPosition] = React.useState<PositionItem[]>([]);
  /**
   * adjusted position to show yes/no tokens and pool share based on amount when user is connected
   */
  const [adjustedPosition, setAdjustedPositions] = React.useState<PositionItem[]>([]);

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
  const handleAmountChange = (e: any) => {
    console.log(e.target.value);
  };

  const FormContainer = () => (
    <Grid container direction="column" spacing={2}>
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
                    label={t('amount')}
                    name="amount"
                    type="number"
                    pattern="[0-9]*"
                    placeholder="Type here"
                    handleChange={handleAmountChange}
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
                {connected && currentPosition && currentPosition.length > 0 && (
                  <Grid item>
                    <PositionSummary title={t('currentPosition')} items={currentPosition} />
                  </Grid>
                )}
                {connected && adjustedPosition.length > 0 && (
                  <Grid item>
                    <PositionSummary title={t('adjustedPosition')} items={adjustedPosition} />
                  </Grid>
                )}
                {!connected && expectedPosition.length > 0 && (
                  <Grid item>
                    <PositionSummary title={t('expectedPosition')} items={expectedPosition} />
                  </Grid>
                )}
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
  return (
    <>
      {(connected || tradeType === MarketTradeType.payIn) && <FormContainer />}
      {!connected && tradeType === MarketTradeType.payOut && (
        <Typography size="body2">Only liquidity providers can remove liquidity</Typography>
      )}
    </>
  );
};
