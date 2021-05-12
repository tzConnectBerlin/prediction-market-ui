import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link, LinkProps } from 'react-router-dom';
import { Typography } from '../../atoms/Typography';
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

interface FooterAction {
  label?: string;
  action?: () => void | Promise<void>;
  isExternal?: boolean;
}

interface FooterDescription {
  description: string;
}

interface FooterProps {
  title: string;
  actions?: FooterAction[];
  description: FooterDescription[];
}

export interface Props {
  footerDescriptionFirst: string;
  footerDescriptionSecond: string;
  title: string;
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
  title,
  /**
   * link how it works on footer
   */
  footerLinkHow,
  /**
   * link about tezos on footer
   */
  footerLinkAbout,
}) => {
  const theme = useTheme();
  return (
    <AppBarStyled>
      <ToolBarStyled>
        <Grid container>
          <Grid container item xs={12} md={8} lg={9}>
            <Grid item lg={12}>
              <Typography color={theme.palette.text.primary} size="h6">
                {title}
              </Typography>
            </Grid>
            <Grid container item direction="column" maxWidth={910}>
              {/* 
                {description.map((description) => (
                  <Typography color={theme.palette.text.secondary} size="body2" marginY={0.5}>
                  {description}
                  </Typography>
                ))}
                   */}
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
              {/*
                  {actions.map((action) => (
                    <Grid container item xs={12} md={4}>
                      <Link to={actions.action}>
                        <TypographyLinkStyled color={theme.palette. primary.main} size="subtitle1">
                        {actions.label}
                        {actions.isExternal && (<VectorLinkIcon />)}
                        </TypographyLinkStyled>
                      </Link> 
                    </Grid>
                  ))}
              */}
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
