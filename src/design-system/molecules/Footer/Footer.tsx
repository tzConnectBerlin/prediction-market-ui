import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { lightTheme as theme } from '../../../theme';
import { VectorLinkIcon } from './VectorLinkIcon';

const AppBarStyled = styled(AppBar)`
  width: 100%;
  position: static;
  background-color: transparent;
  display: flex;
  padding: 2em;
  margin-top: 2em;
`;

const ToolBarStyled = styled(Toolbar)`
  justify-content: center;
`;

const TypographyLinkStyled = styled(Typography)`
  size: ${({ size }) => size};
  font-weight: bold;
  white-space: nowrap;
  padding-top: 2rem;
  text-transform: uppercase;
  color: ${({ color }) => color};
`;

export interface FooterProps {
  footerText: string;
  footerTextSecond: string;
  footerTitle: string;
  footerWorks: string;
  footerAbout: string;
}

export const Footer: React.FC<FooterProps> = ({
  footerText,
  footerTextSecond,
  footerTitle,
  footerWorks,
  footerAbout,
}) => {
  return (
    <AppBarStyled>
      <ToolBarStyled>
        <Grid container>
          <Grid container item xs={12} md={8} lg={9}>
            <Grid item lg={12}>
              <Typography color={theme.palette.text.primary} size="h6">
                {footerTitle}
              </Typography>
            </Grid>
            <Grid container item direction="column" maxWidth={910}>
              <Typography color={theme.palette.text.secondary} size="body2" marginY={0.5}>
                {footerText}
              </Typography>
              <Typography color={theme.palette.text.secondary} size="body2" marginY={0.5}>
                {footerTextSecond}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={3}>
            <Grid container item xs={12} md={8} justifyContent="center">
              <TypographyLinkStyled color={theme.palette.primary.main} size="subtitle1">
                {footerWorks}
              </TypographyLinkStyled>
            </Grid>
            <Grid container item xs={12} md={4} justifyContent="center">
              <TypographyLinkStyled color={theme.palette.primary.main} size="subtitle1">
                {footerAbout}
                <VectorLinkIcon />
              </TypographyLinkStyled>
            </Grid>
          </Grid>
        </Grid>
      </ToolBarStyled>
    </AppBarStyled>
  );
};
