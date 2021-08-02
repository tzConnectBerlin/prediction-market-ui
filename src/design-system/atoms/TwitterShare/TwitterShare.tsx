import React from 'react';
import styled from '@emotion/styled';
import { Grid, useTheme } from '@material-ui/core';
import { Typography } from '../Typography';

export interface TwitterShareProps {
  /**
   * Color of the Twitter icon background
   */
  color?: string;
}

export const TwitterShare: React.FC<TwitterShareProps> = ({ color = 'blue' }) => {
  const theme = useTheme();
  const twitterColor =
    color === 'grey'
      ? '/twitter-dark-grey-circle.svg'
      : '/Twitter social icons - circle - blue.svg';
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
        <a href="https://twitter.com/intent/tweet?text=I%20participated%20in%20the%20TZConnect%20Prediction%20Market!">
          <img src={twitterColor} alt="twitter-share" />
        </a>
      </Grid>
    </Grid>
  );
};
