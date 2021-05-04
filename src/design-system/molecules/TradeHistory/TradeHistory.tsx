import React from 'react';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';
import { Link, Paper, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

const StyledWrapper = styled(Paper)`
  padding: 1rem;
`;

const StyledLink = styled.div`
  text-align: center;
  padding-top: 1rem;
`;

export interface TradeHistoryProps extends DataGridProps {
  title?: string;
  linkText?: string;
  linkAddress: string;
}

export const TradeHistory: React.FC<TradeHistoryProps> = ({
  title = 'Trade History',
  linkAddress,
  linkText = 'See All',
  ...rest
}) => {
  return (
    <StyledWrapper square>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      <DataGrid {...rest} autoHeight />
      <StyledLink>
        <Link href={linkAddress} variant="body2" underline="none">
          {linkText}
        </Link>
      </StyledLink>
    </StyledWrapper>
  );
};
