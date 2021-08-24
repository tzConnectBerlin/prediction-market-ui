import * as React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';

const StyledTypography = styled(Typography)`
  word-wrap: break-word;
  text-align: end;
  font-weight: 700;
`;

export type PositionItem = {
  label: string;
  value: string | number;
};
export interface PositionSummaryProps {
  title: string;
  items: PositionItem[];
}

export const PositionSummary: React.FC<PositionSummaryProps> = ({ title, items }) => {
  const theme = useTheme();
  return (
    <Grid container item spacing={2} direction="row">
      <Grid item xs={8} md={10}>
        <Typography color="primary" size="subtitle1" component="h4">
          {title}
        </Typography>
      </Grid>
      {items.map(({ label, value }, index) => (
        <React.Fragment key={`${label}-${value}-${index}`}>
          <Grid item xs={7}>
            <Typography component="div" textAlign="start" color={theme.palette.text.secondary}>
              {label}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <StyledTypography component="div">{value}</StyledTypography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  );
};
