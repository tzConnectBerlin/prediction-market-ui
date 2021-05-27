import React from 'react';
import styled from '@emotion/styled';
import { Paper } from '@material-ui/core';
import { Typography } from '../Typography';
import { Chart, ChartProps } from './Chart';

const PaperWrapperStyled = styled(Paper)`
  padding: 2rem;
`;

export const ChartContainer: React.FC<ChartProps> = ({ chartTitle, ...props }) => {
  return (
    <PaperWrapperStyled>
      <Typography size="h5" fontWeight="bold">
        {chartTitle}
      </Typography>
      <Chart {...props} />
    </PaperWrapperStyled>
  );
};
