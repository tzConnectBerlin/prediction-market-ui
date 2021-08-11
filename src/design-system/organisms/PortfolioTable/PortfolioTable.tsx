import React from 'react';
import { Paper, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';
import { CustomChip } from '../../atoms/CustomChip';
import { Label } from '../../atoms/Label';

export const PaperWrapperStyled = styled(Paper)`
  padding: 2rem;
`;

interface TableStyledProps {
  theme: Theme;
}
const TableStyled = styled.table<TableStyledProps>`
  width: 100%;
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
      <Typography size="h2" fontWeight="bold" sx={{ marginBottom: 5 }}>
        {title}
      </Typography>
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
                <td
                  style={{
                    fontWeight: i === arr.length - 1 ? 700 : 'normal',
                    maxWidth: i === arr.length - 1 ? '120px' : 'inherit',
                  }}
                  key={i}
                  onClick={i === 0 ? row.handleClick : undefined}
                  onKeyDown={i === 0 ? row.handleClick : undefined}
                  className={i === 0 && row.handleClick ? 'pointer' : undefined}
                >
                  <div>
                    {item[1] === undefined || typeof item === 'string' ? (
                      item
                    ) : (
                      <>
                        {item.map((value, x) =>
                          typeof value === 'string' && value.includes('RESOLVED') ? (
                            <Label
                              key={value}
                              text={value}
                              backgroundColor={theme.palette.grey[400]}
                              fontColor={theme.palette.grey[800]}
                            />
                          ) : (
                            <div
                              key={value}
                              style={{
                                marginTop: item[1].includes('RESOLVED')
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
                      <CustomChip
                        label={row.rowAction.label}
                        onClick={row.rowAction.handleAction}
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </PaperWrapperStyled>
  );
};
