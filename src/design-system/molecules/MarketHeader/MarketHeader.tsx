import * as React from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
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
const defaultIconSize = 'max';
const defaultIconType = 'blockies';

export const MarketHeader: React.FC<MarketHeaderProps> = ({
  title,
  hash,
  iconURL,
  iconSize = defaultIconSize,
  iconType = defaultIconType,
  stats,
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container columnSpacing={{ md: 1 }} direction="row" px={isMobile ? 3 : 0}>
      {!isMobile && (
        <Grid item sm={3}>
          <CardAvatar
            iconURL={iconURL}
            iconSize={iconSize}
            iconType={iconType}
            title={title}
            hash={hash}
          />
        </Grid>
      )}
      <Grid container item xs={12} sm={9}>
        <Grid item>
          <CardTitle title={title} {...rest} titleSize={isMobile ? 'h1' : 'h2'} />
        </Grid>
        {stats && (
          <Grid container item mt={isMobile ? 0 : '1rem'} rowSpacing={isMobile ? 3 : 0}>
            {stats?.map((data, index) => (
              <Grid container item direction="column" key={`${data.label}-${index}`} xs={6} sm={3}>
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
