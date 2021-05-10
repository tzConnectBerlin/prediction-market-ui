import React from 'react';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { Card, CardHeader, CardContent, Typography, useTheme, Grid } from '@material-ui/core';
import { FormikSlider } from '../../molecules/FormikSlider';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';

type SubmitBidInitialValues = {
  probability: number;
  contribution: number;
};

export interface SubmitBidCardProps {
  title: string;
  handleSubmit: () => void | Promise<void>;
  initialValues?: SubmitBidInitialValues;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any;
}

export const SubmitBidCard: React.FC = () => {
  const theme = useTheme();
  const handleFormSubmit = (v: any) => console.log(v);
  const validationSchema = Yup.object({
    probability: Yup.number().required(),
    contribution: Yup.number().required(),
  });
  const initialValues = {
    probability: 0,
    contribution: 0,
  };
  const TOKEN_TYPE = 'USDtz';
  return (
    <Card>
      <CardHeader
        title={
          <Typography
            color={theme.palette.primary.main}
            fontWeight={theme.typography.fontWeightBold}
          >
            Submit Bid
          </Typography>
        }
      />
      <CardContent>
        <Formik
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Grid
              container
              spacing={3}
              direction="column"
              alignContent="flex-start"
              justifyContent="center"
            >
              <Grid item width="100%">
                <Field
                  component={FormikSlider}
                  label="Bid"
                  name="probability"
                  min={1}
                  max={99}
                  step={0.01}
                  tooltip="auto"
                  required
                />
              </Grid>
              <Grid item>
                <Field
                  component={FormikTextField}
                  label="contribution"
                  name="initialContribution"
                  type="number"
                  fullWidth
                  InputProps={{
                    endAdornment: TOKEN_TYPE,
                  }}
                  required
                />
              </Grid>
              <Grid item>
                <CustomButton color="primary" label="Submit bid" fullWidth />
              </Grid>
            </Grid>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
