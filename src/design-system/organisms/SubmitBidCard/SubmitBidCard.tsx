import React from 'react';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, Grid, useTheme, Theme } from '@material-ui/core';
import styled from '@emotion/styled';
import { FormikSlider } from '../../molecules/FormikSlider';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { PositionItem, PositionSummary } from './PositionSummary';
import { roundToTwo } from '../../../utils/math';

const CustomCard = styled(Card)<{ theme: Theme }>`
  ${({ theme }) => `${theme.breakpoints.up('md')} {
    position: sticky;
    top: ${theme.spacing(3)};
}`}
`;

export type AuctionBid = {
  probability: number;
  contribution: number;
};

export interface SubmitBidCardProps {
  /**
   * Callback to get the form values
   */
  handleSubmit: (
    values: AuctionBid,
    formikHelpers: FormikHelpers<AuctionBid>,
  ) => void | Promise<void>;
  /**
   * Token name to display
   */
  tokenName: string;
  /**
   * Initial values to use when initializing the form. Default is 0.
   */
  initialValues?: AuctionBid;
  /**
   * Is wallet connected
   */
  connected?: boolean;
  /**
   * User's current position in the auction
   */
  currentPosition?: AuctionBid;
}

const calculateAdjustedBid = (current: AuctionBid, formData: AuctionBid): AuctionBid => {
  const contribution = current.contribution + formData.contribution;
  const probability =
    (current.contribution * current.probability + formData.contribution * formData.probability) /
    contribution;
  return {
    contribution,
    probability: roundToTwo(probability),
  };
};

export const SubmitBidCard: React.FC<SubmitBidCardProps> = ({
  tokenName,
  handleSubmit,
  initialValues,
  connected,
  currentPosition,
}) => {
  const { t } = useTranslation('submit-bid');
  const theme = useTheme();
  const validationSchema = Yup.object({
    probability: Yup.number().required(),
    contribution: Yup.number().required(),
  });
  const initialFormValues: AuctionBid = initialValues ?? {
    probability: 0,
    contribution: 0,
  };
  const bidToPosition = (bid: AuctionBid): PositionItem[] => {
    return [
      {
        label: t('probability'),
        value: `${bid.probability}%`,
      },
      {
        label: t('contribution'),
        value: `${bid.contribution} ${tokenName}`,
      },
    ];
  };
  return (
    <CustomCard theme={theme}>
      <CardHeader
        title={
          <Typography color="primary.main" component="h3">
            {t('heading')}
          </Typography>
        }
      />
      <CardContent>
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
                    component={FormikSlider}
                    label={t('probability')}
                    name="probability"
                    min={0.01}
                    max={99.99}
                    step={0.01}
                    tooltip="auto"
                    required
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={FormikTextField}
                    label={t('contribution')}
                    name="contribution"
                    type="number"
                    fullWidth
                    InputProps={{
                      endAdornment: <Typography color="text.secondary">{tokenName}</Typography>,
                    }}
                    required
                  />
                </Grid>
                {currentPosition && (
                  <>
                    <Grid item>
                      <PositionSummary
                        title={t('currentPosition')}
                        items={bidToPosition(currentPosition)}
                      />
                    </Grid>
                    <Grid item>
                      <PositionSummary
                        title={t('adjustedPosition')}
                        items={bidToPosition(calculateAdjustedBid(currentPosition, values))}
                      />
                    </Grid>
                  </>
                )}
                <Grid item>
                  <CustomButton
                    color="primary"
                    label={connected ? t('submitConnected') : t('submitDisconnected')}
                    fullWidth
                    disabled={!isValid}
                    type="submit"
                  />
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </CustomCard>
  );
};
