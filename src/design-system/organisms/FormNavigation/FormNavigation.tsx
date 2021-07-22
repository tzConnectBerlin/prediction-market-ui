import { Grid, Paper, useTheme } from '@material-ui/core';
import React from 'react';
import { Links } from '../../../interfaces';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';

export interface FormNavigationProps {
  title: string;
  liquidityShares?: number;
  expectedReturn?: number;
  stablecoinSymbol?: string;
  formList: Links[];
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  title,
  liquidityShares,
  expectedReturn,
  stablecoinSymbol,
  formList,
}) => {
  const theme = useTheme();
  return (
    <Paper>
      <Typography component="h1" size="h5">
        {title}
      </Typography>
      <Grid container>
        <Grid item container flexDirection="row">
          <Grid item>1</Grid>
          <Grid item>1</Grid>
        </Grid>
        <Grid item container flexDirection="row">
          <Grid item>1</Grid>
          <Grid item>1</Grid>
        </Grid>
        {formList &&
          formList.length > 0 &&
          formList.map((item, i) => (
            <Grid item key={i}>
              <CustomButton label={item.label} backgroundVariant="secondary" color="primary" />
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};

export default FormNavigation;
