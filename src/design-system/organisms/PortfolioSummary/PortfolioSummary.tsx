import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, useTheme } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { PaperWrapperStyled } from '../PortfolioTable/PortfolioTable';

export type Position = {
  type?: string;
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
      weekly: curr.weekly ? prev.weekly ?? 0 + curr.weekly : prev.weekly,
      currency: curr.currency,
    }),
    { value: 0, weekly: 0, currency: '$' },
  );
  const theme = useTheme();
  const { t } = useTranslation('portfolio');

  return (
    <PaperWrapperStyled square>
      <Grid marginBottom="3rem" container flexDirection="column">
        <Typography color={theme.palette.primary.main} marginBottom="1rem" size="h4">
          {t('total')} {weekly && t('weekly')}
        </Typography>
        <Typography size="h1">
          {totalValue.value} {totalValue.currency}
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
            <Typography color={theme.palette.primary.main} marginBottom="1rem" size="h4">
              {t(item.type ?? '')} {weekly && t('weekly')}
            </Typography>
            <Typography>
              {item.value} {item.currency ?? 'PMM'}
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
    </PaperWrapperStyled>
  );
};
