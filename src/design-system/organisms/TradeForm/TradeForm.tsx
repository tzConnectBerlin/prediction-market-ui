import React from 'react';
import styled from '@emotion/styled';
import * as Yup from 'yup';
import { BsArrowLeft } from 'react-icons/bs';
import { RiRefreshLine } from 'react-icons/ri';
import { Field, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import { FormikTextField } from '../../molecules/FormikTextField';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { FormikToggleButton } from '../../molecules/FormikToggleButton';
import { ToggleButtonItems } from '../../molecules/FormikToggleButton/FormikToggleButton';

const StyledCardHeader = styled(CardHeader)`
  flex-direction: row-reverse;
  .MuiCardHeader-action {
    margin-right: 0.5rem;
    margin-top: 0.2rem;
    margin-bottom: 0;
  }
`;

export interface TradeFormProps {
  /**
   * Callback to get the form values
   */
  handleSubmit: () => void | Promise<void>;
  /**
   * Callback to back to the Postion Summary
   */
  handleBackClick?: () => void | Promise<void>;
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
   * OutCome List
   */
  outComeItems: ToggleButtonItems[];
}

export const TradeForm: React.FC<TradeFormProps> = ({
  title,
  tokenName,
  handleSubmit,
  handleBackClick,
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
    outcome: Yup.number().required(),
    quantity: Yup.number().required(),
  });
  const initialFormValues = {
    outcome: outComeItems[0].value,
    quantity: 0,
  };
  return (
    // <Card>
    //   <StyledCardHeader
    //     title={<Typography component="h3">{t(title)}</Typography>}
    //     action={<BsArrowLeft />}
    //   />
    //   <CardContent>
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialFormValues}
    >
      {({ isSubmitting, isValid, values }) => (
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
              label={t(title)}
              fullWidth
              disabled={isSubmitting || !isValid}
            />
          </Grid>
        </Grid>
      )}
    </Formik>
    //   </CardContent>
    // </Card>
  );
};
