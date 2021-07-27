import React from 'react';
import { Grid, Paper, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { FormikHelpers } from 'formik';
import { FormType, LiquidityValues } from '../../../interfaces';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { TradeFormProps } from '../TradeForm';

const PaperContainer = styled(Paper)`
  padding: 2rem;
`;

export interface AddLiquidityInterface {
  currentPosition: LiquidityValues;
  adjustedPosition: LiquidityValues;
  stablecoinSymbol?: string;
  handleSubmit: (
    values: LiquidityValues,
    formikHelpers: FormikHelpers<LiquidityValues>,
  ) => void | Promise<void>;
}

export interface RemoveLiquidityInterface {
  currentPosition: LiquidityValues;
  adjustedPosition: LiquidityValues;
  stablecoinSymbol?: string;
  handleSubmit: (values: number, formikHelpers: FormikHelpers<number>) => void | Promise<void>;
  handleMaxAmount?: () => void | Promise<void>;
}

export interface FormNavigationProps {
  title: string;
  liquidityShares?: number;
  expectedReturn?: number;
  stablecoinSymbol?: string;
  actionList: {
    formType: FormType;
    name: string;
  }[];
  current?: {
    formType: FormType;
    formValues: TradeFormProps | AddLiquidityInterface | RemoveLiquidityInterface;
    formComponent: string;
  };
  handleAction: (formType: FormType) => void | Promise<void>;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  title,
  liquidityShares,
  expectedReturn,
  stablecoinSymbol,
  actionList,
  current,
  handleAction,
}) => {
  const theme = useTheme();
  const { t } = useTranslation(['market']);

  return (
    <PaperContainer>
      {(!current || Object.keys(current).length === 0) && (
        <>
          <Typography component="h1" size="h5">
            {title}
          </Typography>
          {(liquidityShares || expectedReturn) && (
            <Grid container spacing={2} marginTop={3}>
              {liquidityShares && (
                <Grid item container flexDirection="row" justifyContent="space-between">
                  <Grid item>
                    <Typography color={theme.palette.text.secondary}>
                      {t('liquidityShares')}
                    </Typography>
                  </Grid>
                  <Grid item>{liquidityShares}%</Grid>
                </Grid>
              )}
              {expectedReturn && (
                <Grid item container flexDirection="row" justifyContent="space-between">
                  <Grid item>
                    <Typography color={theme.palette.text.secondary}>
                      {t('expectedReturn')}
                    </Typography>
                  </Grid>
                  <Grid item>
                    {expectedReturn} {stablecoinSymbol}
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
          {actionList && actionList.length > 0 && (
            <Grid container marginTop={3} flexDirection="column" spacing={1}>
              {actionList.map((item, i) => (
                <Grid item key={i}>
                  <CustomButton
                    label={item.name}
                    backgroundVariant="secondary"
                    sx={{ width: '100%' }}
                    onClick={() => handleAction(item.formType)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      {current && <current.formComponent />}
    </PaperContainer>
  );
};

export default FormNavigation;
