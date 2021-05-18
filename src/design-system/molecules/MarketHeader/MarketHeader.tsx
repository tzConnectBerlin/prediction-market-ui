import React from 'react';
import { Grid } from '@material-ui/core';
import { CardTitle } from '../MarketCardHeader/CardTitle';
import { MarketCardHeaderProps } from '../MarketCardHeader';
import { CardAvatar } from '../MarketCardHeader/CardAvatar';

interface HeaderStats {
  label: string;
  value: string | number | React.ReactNode;
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
  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={2}>
        <CardAvatar
          iconURL={iconURL}
          iconSize={iconSize}
          iconType={iconType}
          title={title}
          hash={hash}
        />
      </Grid>
      <Grid item xs={10} mt="1rem">
        <CardTitle title={title} {...rest} />
      </Grid>
    </Grid>
  );
};
