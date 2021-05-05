import React from 'react';
import { DataGrid, DataGridProps } from '@material-ui/data-grid';
import { Link, Paper, Typography } from '@material-ui/core';
import styled from '@emotion/styled';
import { CustomButton } from '../../atoms/Button';

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
  onClickHandler?: () => void | Promise<void>;
}

export const TradeHistory: React.FC<TradeHistoryProps> = ({
  title = 'Trade History',
  linkText = 'See All',
  onClickHandler,
  ...rest
}) => {
  return (
    <StyledWrapper square>
      <Typography variant="h5" component="h1">
        {title}
      </Typography>
      <DataGrid {...rest} autoHeight disableColumnMenu />
      <StyledLink>
        <CustomButton onClick={onClickHandler} label={linkText} variant="text" />
      </StyledLink>
    </StyledWrapper>
  );
};
