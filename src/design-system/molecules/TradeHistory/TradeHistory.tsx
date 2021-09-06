import * as React from 'react';
import { Paper } from '@material-ui/core';
import { DataGrid, DataGridProps, GridColumnHeaderParams } from '@material-ui/data-grid';
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

const defaultTitle = 'Trade History';

export const TradeHistory: React.FC<TradeHistoryProps> = ({
  title = defaultTitle,
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

export const RenderHeading = ({ colDef }: GridColumnHeaderParams) => {
  return (
    <Typography size="h3" color="primary">
      {colDef.headerName}
    </Typography>
  );
};
