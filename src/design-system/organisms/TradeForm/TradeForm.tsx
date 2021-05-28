import React from 'react';
import * as Yup from 'yup';
import { RiRefreshLine } from 'react-icons/ri';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { FormikToggleButton } from '../../molecules/FormikToggleButton';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';

export interface TradeFormProps {
  /**
   * Callback to get the form values
   */
  handleSubmit: () => void | Promise<void>;
  /**
   * Callback to refresh prices
   */
  handleRefreshClick?: (event: React.MouseEvent<any>) => void | Promise<void>;
  /**
   * Title form to display
   */
  title: string;
  /**
   * TokenName to display
   */
  tokenName: string;
  /**
   * Outcome Items
   */
  outComeItems: ToggleButtonItems[];
}

export const TradeForm: React.FC<TradeFormProps> = ({
  title,
  tokenName,
  handleSubmit,
  handleRefreshClick,
  outComeItems,
}) => {
  const { t } = useTranslation('common');
  const [alignment, setAlignment] = React.useState<string | null>(outComeItems[0].value);
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    console.log(newAlignment);
    setAlignment(newAlignment);
  };
  const validationSchema = Yup.object({
    outcome: Yup.string().required(),
    quantity: Yup.number().required(),
  });
  const initialFormValues = {
    outcome: outComeItems[0].value,
    quantity: 0,
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
                chip
                chipText="Refresh Prices"
                chipOnClick={handleRefreshClick}
                chipIcon={<RiRefreshLine />}
                required
                onChange={handleAlignment}
                value={alignment}
                toggleButtonItems={outComeItems}
              />
            </Grid>
            <Grid item>
              <Field
                component={FormikTextField}
                label={t('quantity')}
                name="quantity"
                type="number"
                fullWidth
                chip
                chipText="Max Amount"
                InputProps={{
                  endAdornment: <Typography color="text.secondary">{tokenName}</Typography>,
                }}
                required
              />
            </Grid>
            <Grid item>
              <CustomButton
                color="primary"
                type="submit"
                label={`${t(title)}${isSubmitting ? '...' : ''}`}
                fullWidth
                disabled={isSubmitting || !isValid}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
