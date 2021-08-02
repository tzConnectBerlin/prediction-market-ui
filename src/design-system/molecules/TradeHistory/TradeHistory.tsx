import React from 'react';
import { Paper, useMediaQuery, useTheme } from '@material-ui/core';
import {
  DataGrid,
  DataGridProps,
  GridCellParams,
  GridColumnHeaderParams,
} from '@material-ui/data-grid';
import styled from '@emotion/styled';
import { CustomButton } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';

const PaperWrapperStyled = styled(Paper)`
  padding: 2rem;
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
  linkText,
  onClickHandler,
  ...rest
}) => {
  return (
    <PaperWrapperStyled square>
      <Typography size="h2" fontWeight="bold">
        {title}
      </Typography>
      <DataGrid {...rest} autoHeight disableColumnMenu />
      {linkText && (
        <StyledLink>
          <CustomButton onClick={onClickHandler} label={linkText} variant="text" />
        </StyledLink>
      )}
    </PaperWrapperStyled>
  );
};

export const RenderCell = ({ value }: GridCellParams) => {
  return <Typography size="body1">{value}</Typography>;
};

export const RenderHeading = ({ field, colDef }: GridColumnHeaderParams) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Typography size="h3" color="primary">
      {isMobile ? colDef.mobileHeaderName : colDef.headerName}
    </Typography>
  );
};
