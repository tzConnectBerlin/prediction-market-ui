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
      sx={{ display: 'flex', marginTop: 1, width: '100%' }}
    >
      <Toolbar
        sx={{
          marginX: 7,
          paddingY: 1,
          justifyContent: 'space-between',
          // maxWidth: 1600,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginY: 4,
            marginX: 1,
            maxWidth: 910,
          }}
          aria-hidden="true"
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
        <Box
          alignSelf="start"
          aria-hidden="true"
          justifyItems="flex-end"
          flexWrap="wrap"
          sx={{
            display: { sm: 'block', md: 'flex' },
            // flexDirection: { sm: 'column', lg: 'row' },
            marginTop: 9,
            marginX: 1,
          }}
        >
          <Typography
            onClick={handleSecondaryAction}
            color="primary"
            sx={{ marginRight: 2, fontWeight: 'bold', whiteSpace: 'nowrap' }}
          >
            {footerWorks}
          </Typography>
          <Typography
            onClick={handleSecondaryAction}
            color="primary"
            sx={{ marginX: 1, fontWeight: 'bold', whiteSpace: 'nowrap' }}
          >
            {footerAbout}
          </Typography>
          <ArrowRtIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
