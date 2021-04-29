import React from 'react';
import { AppBar, Box, Button, Grid, Link, Toolbar } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { ArrowRtIcon } from '../../atoms/ArrowRtIcon';

export interface FooterProps {
  footerText: string;
  footerTextSecond: string;
  footerTitle: string;
  footerWorks: string;
  footerAbout: string;
  handleSecondaryAction?: () => void | Promise<void>;
}

export const Footer: React.FC<FooterProps> = ({
  footerText,
  footerTextSecond,
  footerTitle,
  footerWorks,
  footerAbout,
  handleSecondaryAction,
}) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ display: 'flex', marginTop: 2, width: '100%' }}
    >
      <Toolbar>
        <Grid container marginY={1.5} marginX={1.5} justifyContent="center">
          <Grid container direction="column" xs={12} sm={8} md={6}>
            <Grid item>
              <Typography
                size="1.375em"
                component="h3"
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
                {footerTitle}
              </Typography>
            </Grid>
            <Grid item direction="column">
              <Typography size="0.9375em" color="textSecondary" component="p" sx={{ marginY: 1 }}>
                {footerText}
              </Typography>
              <Typography size="0.9375em" color="textSecondary" component="p" sx={{ marginY: 1 }}>
                {footerTextSecond}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1} md={2} lg={3} />
          <Grid container xs={12} sm={3} md={4} lg={3} justifyContent="center">
            <Grid container item xs={12} sm={12} md={6} justifyContent="center">
              <Typography
                onClick={handleSecondaryAction}
                color="primary"
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', paddingTop: 3 }}
              >
                {footerWorks}
              </Typography>
            </Grid>
            <Grid container item xs={12} sm={12} md={6} justifyContent="center">
              <Typography
                onClick={handleSecondaryAction}
                color="primary"
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', paddingTop: 3 }}
              >
                {footerAbout}
                <ArrowRtIcon />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
