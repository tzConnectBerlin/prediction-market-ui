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

export interface Props {
  footerDescriptionFirst: string;
  footerDescriptionSecond: string;
  footerHeader: string;
  footerLinkHow: string;
  footerLinkAbout: string;
}

export const Footer: React.FC<Props> = ({
  /**
   * first paragraph of prediction markets description
   */
  footerDescriptionFirst,
  /**
   * second paragraph of prediction markets description
   */
  footerDescriptionSecond,
  /**
   * header for description of tezos prediction markets
   */
  footerHeader,
  /**
   * link how it works on footer
   */
  footerLinkHow,
  /**
   * link about tezos on footer
   */
  footerLinkAbout,
}) => {
  return (
    <AppBarStyled>
      <ToolBarStyled>
        <Grid container>
          <Grid container item xs={12} md={8} lg={9}>
            <Grid item lg={12}>
              <Typography color={theme.palette.text.primary} size="h6">
                {footerHeader}
              </Typography>
            </Grid>
            <Grid container item direction="column" maxWidth={910}>
              <Typography color={theme.palette.text.secondary} size="body2" marginY={0.5}>
                {footerDescriptionFirst}
              </Typography>
              <Typography color={theme.palette.text.secondary} size="body2" marginY={0.5}>
                {footerDescriptionSecond}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={3}>
            <Grid container item xs={12} md={8} justifyContent="center">
              <TypographyLinkStyled color={theme.palette.primary.main} size="subtitle1">
                {footerLinkHow}
              </TypographyLinkStyled>
            </Grid>
            <Grid container item xs={12} md={4} justifyContent="center">
              <TypographyLinkStyled color={theme.palette.primary.main} size="subtitle1">
                {footerLinkAbout}
                <VectorLinkIcon />
              </TypographyLinkStyled>
            </Grid>
          </Grid>
        </Grid>
      </ToolBarStyled>
    </AppBarStyled>
  );
};
