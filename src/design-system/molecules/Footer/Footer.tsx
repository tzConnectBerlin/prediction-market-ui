import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Grid, Toolbar } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { ArrowRtIcon } from '../../atoms/ArrowRtIcon';

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

const TypoHeaderStyled = styled(Typography)`
  font-weight: bold;
  font-size: 1.375rem;
  line-height: 1.8125rem;
  color: rgba(29, 34, 39, 0.87);
  margin-bottom: 0.5rem;
`;

const TypoTextStyled = styled(Typography)`
  color: rgba(29, 34, 39, 0.6);
  font-size: 0.9375rem;
  line-height: 1.1875rem;
  margin: 0.5rem 0;
`;

const TypoLinkStyled = styled(Typography)`
  color: #0e61f6;
  font-weight: bold;
  font-size: 0.9375rem;
  line-height: 1.1875rem;
  white-space: nowrap;
  padding-top: 2.5rem;
`;

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
    <AppBarStyled>
      <ToolBarStyled>
        <Grid container maxWidth={1280}>
          <Grid container item xs={12} md={8}>
            <Grid item lg={12}>
              <TypoHeaderStyled>{footerTitle}</TypoHeaderStyled>
            </Grid>
            <Grid container item direction="column" maxWidth={910}>
              <TypoTextStyled>{footerText}</TypoTextStyled>
              <TypoTextStyled>{footerTextSecond}</TypoTextStyled>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4}>
            <Grid container item xs={12} md={8} justifyContent="center">
              <TypoLinkStyled onClick={handleSecondaryAction}>{footerWorks}</TypoLinkStyled>
            </Grid>
            <Grid container item xs={12} md={4} justifyContent="center">
              <TypoLinkStyled onClick={handleSecondaryAction}>
                {footerAbout}
                <ArrowRtIcon />
              </TypoLinkStyled>
            </Grid>
          </Grid>
        </Grid>
      </ToolBarStyled>
    </AppBarStyled>
  );
};
