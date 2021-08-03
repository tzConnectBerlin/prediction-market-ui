import React from 'react';
import styled from '@emotion/styled';
import { Grid, useTheme } from '@material-ui/core';
import { Typography } from '../Typography';

export interface TwitterShareProps {
  /**
   * Color of the Twitter icon background
   */
  color?: string;
  urlHost?: string;
  urlHref?: string;
  marketId?: number;
  marketQuestion?: string;
  twitterText?: string;
}

export const TwitterShare: React.FC<TwitterShareProps> = ({
  color = 'blue',
  urlHost,
  urlHref,
  marketId,
  marketQuestion,
  twitterText,
}) => {
  const theme = useTheme();
  const twitterColor =
    color === 'grey'
      ? '/twitter-dark-grey-circle.svg'
      : '/Twitter social icons - circle - blue.svg';
  const twitterUrl = urlHost
    ? `https://twitter.com/intent/tweet?url=http%3A%2F%2F${urlHost}%2F${marketId}%2F${marketQuestion}&${twitterText}`
    : `https://twitter.com/intent/tweet?url=${urlHref}`;

  return (
    <Grid
      container
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid item justifyContent="center" alignItems="center" marginTop={2}>
        <Typography textAlign="center" size="h4" color={theme.palette.grey[700]}>
          SHARE NOW
        </Typography>
      </Grid>

      <Grid item width={25} height={25} marginTop={1}>
        <a href={twitterUrl}>
          <img src={twitterColor} alt="twitter-share" />
        </a>
      </Grid>
    </Grid>
  );
};
