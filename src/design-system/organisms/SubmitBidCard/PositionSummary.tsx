import * as React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';
import { CustomTooltip } from '../../atoms/CustomTooltip';

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
  tooltip?: string;
  title: string;
  items: PositionItem[];
}

export const PositionSummary: React.FC<PositionSummaryProps> = ({ title, items, tooltip }) => {
  const theme = useTheme();
  return (
    <Grid container item spacing={2} direction="row">
      <Grid container item xs={8} md={10} direction="row">
        <Typography color="primary" size="subtitle1" component="h4">
          {title}
        </Typography>
        {tooltip && <CustomTooltip title={tooltip} />}
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
