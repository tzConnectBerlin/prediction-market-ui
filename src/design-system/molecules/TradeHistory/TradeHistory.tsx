import * as React from 'react';
import { Paper, Theme, useTheme } from '@material-ui/core';
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

const StyledDataGrid = styled(DataGrid)<{ theme: Theme }>`
  border: none !important;
  .MuiDataGrid-main {
    .MuiDataGrid-row {
      &.Mui-selected {
        background-color: ${({ theme }) => theme.palette.secondary.main};
      }
      &:hover {
        background-color: ${({ theme }) => theme.palette.secondary.dark};
      }
    }
    .MuiDataGrid-columnsContainer {
      border-bottom: none;
      .MuiDataGrid-columnSeparator {
        display: none;
      }
      .MuiDataGrid-colCellTitle {
        color: ${({ theme }) => theme.palette.primary.main};
        font-weight: bold;
      }
    }
    .MuiDataGrid-dataContainer {
      .MuiDataGrid-cell {
        &:focus-within {
          outline: none;
        }
      }
      .MuiDataGrid-renderingZone {
        & > div:last-child {
          .MuiDataGrid-cell {
            border-bottom: none;
          }
        }
      }
    }
  }
  .MuiTablePagination-actions .MuiButtonBase-root {
    color: ${({ theme }) => theme.palette.text.primary};
    background-color: transparent;
    &.Mui-disabled {
      color: ${({ theme }) => theme.palette.text.disabled};
      background-color: transparent;
    }
  }
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
  const theme = useTheme();
  return (
    <PaperWrapperStyled square>
      <Typography size="h2" fontWeight="bold">
        {title}
      </Typography>
      <StyledDataGrid {...rest} autoHeight disableColumnMenu theme={theme} />
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
