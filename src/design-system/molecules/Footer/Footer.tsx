import React from 'react';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
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
        <Grid container marginY={1.5} marginX={2.5}>
          <Grid container direction="column" justifyContent="flex-starts" xs={12} md={8}>
            <Grid item>
              <Typography size="1.375em" component="h3" sx={{ fontWeight: 'bold' }}>
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
          <Grid container xs={12} md={4} justifyContent="flex-end">
            <Grid
              container
              item
              xs={12}
              md={6}
              sx={{
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <Typography
                onClick={handleSecondaryAction}
                color="primary"
                sx={{ fontWeight: 'bold', whiteSpace: 'nowrap', paddingTop: 3 }}
              >
                {footerWorks}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={6}
              sx={{
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
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
