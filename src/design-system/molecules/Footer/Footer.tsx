import React from 'react';
import { AppBar, Box, Grid, Link, Toolbar } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';

export interface FooterProps {
  footerText: string;
  footerTextSecond: string;
  footerTitle: string;
}

export const Footer: React.FC<FooterProps> = ({ footerText, footerTextSecond, footerTitle }) => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar className="wrapper" sx={{ paddingY: 1 }}>
        <Box
          sx={{
            display: { xs: 'flex' },
            alignItems: 'left',
            flexDirection: 'column',
            marginY: 5,
            marginX: 10,
          }}
          aria-hidden="true"
          className="flex-container"
        >
          <Typography
            size="1.375em"
            component="h3"
            sx={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
          >
            {footerTitle}
          </Typography>
          <Typography size="0.9375em" color="textSecondary" component="p" sx={{ marginY: 1 }}>
            {footerText}
          </Typography>
          <Typography size="0.9375em" color="textSecondary" component="p" sx={{ marginY: 1 }}>
            {footerTextSecond}
          </Typography>
        </Box>
        <Grid container direction="row" justifyContent="flex-end" spacing={2}>
          <Grid item />
          <Grid item />
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
