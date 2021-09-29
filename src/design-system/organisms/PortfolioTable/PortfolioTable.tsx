import * as React from 'react';
import { Box, Paper, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';
import { CustomChip } from '../../atoms/CustomChip';
import { Label } from '../../atoms/Label';

const PaperWrapperStyled = styled(Paper)`
  padding: 2rem;
  height: fit-content;
  display: block;
  overflow: hidden;
`;

const TableContainer = styled.div<{ theme: Theme }>`
  position: relative;

  &:after {
    pointer-events: none;
    background: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    content: '';
    right: 0;
    top: 0;
    position: absolute;
    width: 5rem;
    height: calc(100% - ${({ theme }) => theme.spacing(3.25)});
    z-index: 1;
  }
`;

interface TableStyledProps {
  theme: Theme;
}
interface StyledTdProps {
  key: number;
  arrLength: number;
}

const StyledCustomChip = styled(CustomChip)`
  width: fit-content;
  height: fit-content;
  padding: 1px;
  font-weight: 500;
`;

const StyledTd = styled.td<StyledTdProps>`
  fontWeight:${({ key, arrLength }) => (key === arrLength - 1 ? 700 : 'normal')}
  maxWidth: ${({ key, arrLength }) => (key === arrLength - 1 ? '120px' : 'inherit')}
`;
const StyledLabel = styled(Label)`
  width: fit-content;
  height: fit-content;
  padding: 3px;
`;
const TableStyled = styled.table<TableStyledProps>`
  width: 100%;
  overflow-x: auto;
  max-width: 100%;
  display: block;

  th {
    color: ${({ theme }) => theme.palette.primary.main};
    text-align: left;
    padding: 1.4875rem;
  }
  td {
    padding: 1.4875rem;
    border-top: solid 1px ${({ theme }) => theme.palette.grey[500]};
  }

  tbody > tr:hover {
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
`;

type RowAction = {
  label: string;
  handleAction?: () => void | Promise<void>;
};
export interface Row {
  columns: (string | string[])[];
  rowAction?: RowAction;
  handleClick?: () => void | Promise<void>;
}

export interface PortfolioTableProps {
  title?: string;
  heading: string[];
  rows: Row[];
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ title, heading, rows }) => {
  const theme = useTheme();
  return (
    <PaperWrapperStyled square>
      <Typography size="h2" fontWeight="bold" marginBottom={5}>
        {title}
      </Typography>
      <TableContainer theme={theme}>
        <TableStyled theme={theme} cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              {heading.map((item) => (
                <th key={item}>
                  <Typography size="h4">{item}</Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {row.columns.map((item, i, arr) => (
                  <StyledTd
                    key={i}
                    arrLength={arr.length}
                    onClick={i === 0 ? row.handleClick : undefined}
                    onKeyDown={i === 0 ? row.handleClick : undefined}
                    className={i === 0 && row.handleClick ? 'pointer' : undefined}
                  >
                    <Box display="flex" flexDirection="column">
                      {item[1] === undefined || typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          {item.map((value, x) =>
                            typeof value === 'string' && value.includes('RESOLVED') ? (
                              <StyledLabel
                                key={`${value + x}`}
                                text={value}
                                backgroundColor={theme.palette.grey[400]}
                                fontColor={theme.palette.grey[800]}
                              />
                            ) : (
                              <div
                                key={`${value + x}`}
                                style={{
                                  marginTop:
                                    typeof item[1] === 'string' && item[1].includes('RESOLVED')
                                      ? '0'
                                      : x === 1
                                      ? '2rem'
                                      : 'inherit',
                                }}
                              >
                                {value}
                              </div>
                            ),
                          )}
                        </>
                      )}
                      {row.rowAction && i === arr.length - 1 && (
                        <StyledCustomChip
                          label={row.rowAction.label}
                          onClick={row.rowAction.handleAction}
                        />
                      )}
                    </Box>
                  </StyledTd>
                ))}
              </tr>
            ))}
          </tbody>
        </TableStyled>
      </TableContainer>
    </PaperWrapperStyled>
  );
};
