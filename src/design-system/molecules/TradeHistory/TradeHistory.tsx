import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { DataGrid, DataGridProps, GridColumnHeaderParams } from '@mui/x-data-grid';
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
      .MuiDataGrid-columnHeaderTitleContainer {
        padding-left: 0;
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

  ${({ theme }) => `${theme.breakpoints.down('sm')} {
    .MuiDataGrid-main {
      .MuiDataGrid-windowContainer {
        position: relative;
        &:before{
          pointer-events: none;
          background: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
          content: '';
          right: 0;
          top: 0;
          bottom: 7px;
          position: absolute;
          width: 3rem;
          z-index: 1;
        }
      }
    }
  }`}
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
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const titleHeading = (
    <Typography size="h2" fontWeight="bold">
      {title}
    </Typography>
  );
  const bodyContent = (
    <>
      <StyledDataGrid {...rest} autoHeight disableColumnMenu theme={theme} />
      {linkText && (
        <StyledLink>
          <CustomButton onClick={onClickHandler} label={linkText} variant="text" />
        </StyledLink>
      )}
    </>
  );
  return isTablet ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="trade-history"
        id="trade-header"
        sx={{ paddingY: '0.5rem' }}
      >
        {titleHeading}
      </AccordionSummary>
      <AccordionDetails>{bodyContent}</AccordionDetails>
    </Accordion>
  ) : (
    <PaperWrapperStyled square>
      {titleHeading}
      {bodyContent}
    </PaperWrapperStyled>
  );
};

export const RenderHeading = ({ colDef }: GridColumnHeaderParams) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Typography size={isMobile ? 'subtitle1' : 'h3'} color="primary">
      {colDef.headerName}
    </Typography>
  );
};
