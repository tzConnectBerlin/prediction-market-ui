import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Card, Grid, useTheme } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';

const StyledCard = styled(Card)`
  margin: 1rem;
  padding: 3rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;
type Position = {
  type: string;
  value: number;
  weekly?: number;
  currency?: string;
};

export interface PortfolioSummaryProps {
  positions: Position[];
  weekly?: boolean;
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  positions,
  weekly = false,
}) => {
  const totalValue = positions.reduce(
    (prev, curr) => ({
      value: prev.value + curr.value,
      weekly: curr.weekly ? prev.weekly + curr.weekly : prev.weekly,
      currency: curr.currency,
    }),
    { value: 0, weekly: 0, currency: '$' },
  );
  const theme = useTheme();
  const { t } = useTranslation('portfolio');
  return (
    <StyledCard>
      <Grid marginBottom="1rem">
        <Typography color={theme.palette.primary.main} marginBottom="1rem">
          {t('total')} {weekly && t('weekly')}
        </Typography>
        <Typography size="h4">
          {totalValue.value}
          {totalValue.currency}{' '}
          {weekly && (
            <span
              style={{
                color:
                  totalValue.weekly ?? 1 > 0
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            >
              ({totalValue.weekly ?? 1 > 0 ? '+' : '-'}
              {totalValue.weekly}%)
            </span>
          )}
        </Typography>
      </Grid>
      <Grid container justifyContent="space-between">
        {positions.map((item) => (
          <Grid item key={item.type} md={4} xs={8}>
            <Typography color={theme.palette.primary.main} marginBottom="1rem">
              {t(item.type)} {weekly && t('weekly')}
            </Typography>
            <Typography>
              {item.value}
              {item.currency ?? 'PMM'}{' '}
              {weekly && (
                <span
                  style={{
                    color:
                      item.weekly ?? 1 > 0 ? theme.palette.success.main : theme.palette.error.main,
                  }}
                >
                  ({item.weekly ?? 1 > 0 ? '+' : '-'}
                  {item.weekly}%)
                </span>
              )}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </StyledCard>
  );
};
