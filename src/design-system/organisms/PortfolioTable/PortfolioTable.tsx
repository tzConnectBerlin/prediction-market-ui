import * as React from 'react';
import { Box, Paper, Theme, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';
import { CustomChip } from '../../atoms/CustomChip';
import { Label } from '../../atoms/Label';

const PaperWrapperStyled = styled(Paper)<{ theme: Theme }>`
  padding: 2rem;
  height: fit-content;
  display: block;
  overflow: hidden;

  table {
    width: 100%;
    overflow-x: auto;
    max-width: 100%;

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
  }

  ${({ theme }) => `${theme.breakpoints.down('md')} {
    > div {
      position: relative;
      &:after {
        pointer-events: none;
        background: linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
        content: '';
        right: 0;
        top: 0;
        position: absolute;
        width: 5rem;
        height: calc(100% - ${theme.spacing(3.25)});
        z-index: 1;
      }
      table {
        display: block;
      }
    }
  }`}
`;

interface TableStyledProps {
  theme: Theme;
}
interface StyledTdProps {
  index: number;
  arrLength: number;
}

const StyledCustomChip = styled(CustomChip)`
  width: fit-content;
  height: fit-content;
  padding: 1px;
  font-weight: 500;
`;

const StyledTd = styled.td<StyledTdProps>`
  fontWeight:${({ index, arrLength }) => (index === arrLength - 1 ? 700 : 'normal')}
  maxWidth: ${({ index, arrLength }) => (index === arrLength - 1 ? '120px' : 'inherit')}
`;
const StyledLabel = styled(Label)`
  width: fit-content;
  height: fit-content;
  padding: 3px;
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
    <PaperWrapperStyled square theme={theme}>
      <Typography size="h2" fontWeight="bold" marginBottom={5}>
        {title}
      </Typography>
      <div>
        <table cellPadding="0" cellSpacing="0">
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
                    key={i + item[0]}
                    index={i}
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
        </table>
      </div>
    </PaperWrapperStyled>
  );
};
