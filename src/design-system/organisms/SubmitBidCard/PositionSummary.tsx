import React from 'react';
import { Grid } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';

export type PositionItem = {
  label: string;
  value: string | number;
};
export interface PositionSummaryProps {
  title: string;
  items: PositionItem[];
}

export const PositionSummary: React.FC<PositionSummaryProps> = ({ title, items }) => {
  return (
    <Grid container spacing={2} direction="row">
      <Grid item xs={8} md={10}>
        <Typography color="primary" size="subtitle1" component="h4">
          {title}
        </Typography>
      </Grid>
      {items.map(({ label, value }, index) => (
        <React.Fragment key={`${label}-${value}-${index}`}>
          <Grid item xs={8} md={10}>
            <Typography component="div" textAlign="start">
              {label}
            </Typography>
          </Grid>
          <Grid item xs={4} md={2}>
            <Typography component="div" textAlign="end">
              {value}
            </Typography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};
