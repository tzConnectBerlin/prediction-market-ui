import React from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { CardTitle } from '../MarketCardHeader/CardTitle';
import { MarketCardHeaderProps } from '../MarketCardHeader';
import { CardAvatar } from '../MarketCardHeader/CardAvatar';
import { Typography } from '../../atoms/Typography';
import { TokenType } from '../../../interfaces/market';

interface HeaderStats {
  label: string;
  value: string | number | React.ReactNode;
  tokenType?: TokenType;
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={1} direction="row" justifyContent={isMobile ? 'center' : 'inherit'}>
      <Grid item md={3}>
        <CardAvatar
          iconURL={iconURL}
          iconSize={iconSize}
          iconType={iconType}
          title={title}
          hash={hash}
        />
      </Grid>
      <Grid container item xs={9} mt="1rem" alignItems={isMobile ? 'center' : 'inherit'}>
        <Grid item>
          <CardTitle title={title} {...rest} titleSize="h2" />
        </Grid>
        {stats && (
          <Grid container item mt="1rem" sm={12}>
            {stats?.map((data, index) => (
              <Grid container item direction="column" key={`${data.label}-${index}`} sm={3} xs={4}>
                <Grid item>
                  <Typography size="h4" color="text.secondary">
                    {data.label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    size="h3"
                    color={
                      data.label === TokenType.yes || data.tokenType === TokenType.yes
                        ? theme.palette.success.main
                        : data.label === TokenType.no || data.tokenType === TokenType.no
                        ? theme.palette.error.main
                        : 'inherit'
                    }
                  >
                    {data.value}
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
