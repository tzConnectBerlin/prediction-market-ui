import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import { FormikTextField } from '../../molecules/FormikTextField';
import { Typography } from '../../atoms/Typography';
import { CustomButton } from '../../atoms/Button';

const endAdornmentStyles: SxProps<Theme> = { whiteSpace: 'nowrap' };

export interface MintFormProps {
  title: string;
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => void | Promise<void>;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues: FormikValues;
  /**
   * Is wallet connected
   */
  connected: boolean;
  /**
   * TokenName to display
   */
  tokenName?: string;
}

export const MintForm: React.FC<MintFormProps> = ({
  title = 'mint',
  handleSubmit,
  initialValues,
  connected,
  tokenName,
}) => {
  const { t } = useTranslation('common');
  const validationSchema = Yup.object({
    amount: Yup.number()
      .min(0.000001, `${t('minBuy')} 0.000001`)
      .required(t('required')),
  });

  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
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
            <Grid item>
              <Field
                component={FormikTextField}
                label={t('amount')}
                name="amount"
                type="number"
                pattern="[0-9]*"
                fullWidth
                handleChange={handleChange}
                InputProps={
                  tokenName
                    ? {
                        endAdornment: (
                          <Typography
                            color="text.secondary"
                            component="span"
                            sx={endAdornmentStyles}
                          >
                            {tokenName}
                          </Typography>
                        ),
                      }
                    : undefined
                }
                required
              />
            </Grid>
            <Grid item flexDirection="column">
              <CustomButton
                color="primary"
                type="submit"
                label={!connected ? `${t('connectWallet')} + ${t(title)}` : t(title)}
                fullWidth
                disabled={!isValid}
              />
              <Typography size="body1" mt="1rem">
                {t('requiredField')}
              </Typography>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
