import React from 'react';
import { Paper, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { Typography } from '../../atoms/Typography';
import Button from '../../atoms/Button';

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
  columns: (string | number)[];
  rowAction: RowAction;
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
      <Typography size="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
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
              {row.columns.map((item, i) => (
                <td key={i}>{item}</td>
              ))}
              <td align="right">
                {row.rowAction && (
                  <Button
                    label={row.rowAction.label}
                    onClick={row.rowAction.handleAction}
                    variant="outlined"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </TableStyled>
    </PaperWrapperStyled>
  );
};
