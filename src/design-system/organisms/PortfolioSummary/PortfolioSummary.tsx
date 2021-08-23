import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, useTheme } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { PaperWrapperStyled } from '../PortfolioTable/PortfolioTable';
import { CURRENCY_SYMBOL } from '../../../globals';

export type Position = {
  type?: string;
  value: number;
  weekly?: number | string;
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
  const theme = useTheme();
  const { t } = useTranslation('portfolio');
  const totalValue = React.useMemo(() => {
    return positions.reduce(
      (prev, curr) => ({
        value: prev.value + curr.value,
        weekly:
          curr.weekly && typeof curr.weekly === 'number'
            ? prev.weekly ?? 0 + curr.weekly
            : prev.weekly,
        currency: curr.currency,
      }),
      { value: 0, weekly: 0, currency: CURRENCY_SYMBOL },
    );
  }, [positions]);
  const weeklyChangeColor = React.useMemo(
    () => (totalValue.weekly ?? 1 > 0 ? theme.palette.success.main : theme.palette.error.main),
    [theme.palette.error.main, theme.palette.success.main, totalValue.weekly],
  );

  return (
    <PaperWrapperStyled square>
      <Grid marginBottom="3rem" container flexDirection="column">
        <Typography color={theme.palette.primary.main} marginBottom="1rem" size="h4">
          {t('total')} {weekly && t('weekly')}
        </Typography>
        <Typography size="h1">
          {totalValue.value} {totalValue.currency}
          {weekly && (
            <Typography component="span" color={weeklyChangeColor}>
              ({totalValue.weekly ?? 1 > 0 ? '+' : '-'}
              {totalValue.weekly}%)
            </Typography>
          )}
        </Typography>
      </Grid>
      <Grid container justifyContent="space-between">
        {positions.map((item) => (
          <Grid item key={item.type} md={4} sm={6}>
            <Typography color={theme.palette.primary.main} marginBottom="1rem" size="h4">
              {t(item.type ?? '')} {weekly && t('weekly')}
            </Typography>
            <Typography>
              {item.value} {item.currency ?? CURRENCY_SYMBOL}
              {weekly && (
                <Typography
                  component="span"
                  color={
                    item.weekly ?? 1 > 0 ? theme.palette.success.main : theme.palette.error.main
                  }
                >
                  ({item.weekly ?? 1 > 0 ? '+' : '-'}
                  {item.weekly}%)
                </Typography>
              )}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </PaperWrapperStyled>
  );
};
