import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { CardTitle } from '../MarketCardHeader/CardTitle';
import { MarketCardHeaderProps } from '../MarketCardHeader';
import { CardAvatar } from '../MarketCardHeader/CardAvatar';
import { Typography } from '../../atoms/Typography';
import { Currency, CurrencyTypes, TokenType } from '../../../interfaces/market';

interface HeaderStats {
  label: string;
  value: string | number | React.ReactNode;
  currency?: Currency;
}

export interface MarketHeaderProps extends MarketCardHeaderProps {
  stats?: HeaderStats[];
}

export const MarketHeader: React.FC<MarketHeaderProps> = ({
  title,
  hash,
  iconURL,
  iconSize = 'max',
  iconType = 'blockies',
  stats,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={1} direction="row">
      <Grid item md={2}>
        <CardAvatar
          iconURL={iconURL}
          iconSize={iconSize}
          iconType={iconType}
          title={title}
          hash={hash}
        />
      </Grid>
      <Grid container item md={10} mt="1rem" direction="column">
        <Grid item>
          <CardTitle title={title} {...rest} titleSize="h5" />
        </Grid>
        {stats && (
          <Grid container item mt="1rem" xs={3}>
            {stats?.map((data, index) => (
              <Grid container item direction="column" key={`${data.label}-${index}`} xs={3}>
                <Grid item>
                  <Typography size="subtitle2" color="text.secondary">
                    {data.label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    size="subtitle2"
                    color={
                      data.label === TokenType.yes
                        ? theme.palette.success.main
                        : data.label === TokenType.no
                        ? theme.palette.error.main
                        : 'inherit'
                    }
                  >
                    {data.value}{' '}
                    {typeof data.currency !== 'undefined' &&
                      Currency[data.currency as unknown as CurrencyTypes]}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};
