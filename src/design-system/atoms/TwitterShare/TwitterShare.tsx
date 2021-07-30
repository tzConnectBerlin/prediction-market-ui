import React from 'react';
import styled from '@emotion/styled';
import { Grid, Link, Paper, useTheme } from '@material-ui/core';
import { Typography } from '../Typography';

export const TwitterShare = () => {
  const theme = useTheme();
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
        <a href="https://twitter.com/intent/tweet?text=I%20did%20something!" data-size="large">
          <img src="/Twitter social icons - circle - blue.svg" alt="twitter-share" />
        </a>
      </Grid>
    </Grid>
  );
};
