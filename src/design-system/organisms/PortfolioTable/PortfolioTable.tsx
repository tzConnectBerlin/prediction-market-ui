import React from 'react';
import { Paper, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';
import { CustomChip } from '../../atoms/CustomChip';

const PaperWrapperStyled = styled(Paper)`
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
    padding: 0.8rem;
  }
  td {
    padding: 0.8rem;
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
  columns: (string | number | string[] | number[])[];
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
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.columns.map((item, i, arr) => (
                <td
                  key={i}
                  onClick={i === 0 ? row.handleClick : undefined}
                  onKeyDown={i === 0 ? row.handleClick : undefined}
                  className={i === 0 && row.handleClick ? 'pointer' : undefined}
                >
                  {typeof item === 'number' || typeof item === 'string' ? (
                    item
                  ) : (
                    <div>
                      {item.map((value) =>
                        value === 'Closed' ? (
                          <CustomChip label={value} />
                        ) : (
                          <div key={value}>{value}</div>
                        ),
                      )}
                    </div>
                  )}
                  {row.rowAction && i === arr.length - 1 && (
                    <CustomChip label={row.rowAction.label} onClick={row.rowAction.handleAction} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </PaperWrapperStyled>
  );
};
