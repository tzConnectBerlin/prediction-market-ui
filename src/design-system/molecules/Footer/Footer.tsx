import * as React from 'react';
import styled from '@emotion/styled';
import { Grid, Box, Theme, useTheme } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { VectorLinkIcon } from './VectorLinkIcon';

const FooterStyled = styled.footer<{ theme: Theme }>`
  margin-top: auto;
  width: 100%;
  display: flex;
  margin-top: auto;
  position: relative;
  padding: 2.5rem;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const LinkTypographyStyled = styled(Typography)`
  cursor: pointer;
  padding-left: 0;
  padding-bottom: 2rem;
`;

interface FooterLink {
  label: string;
  handleLinkClick?: () => void | Promise<void>;
  isExternal?: boolean;
}
export interface FooterProps {
  title?: string;
  links?: FooterLink[];
  description: string[];
}

const defaultLinks: FooterLink[] = [];

export const Footer: React.FC<FooterProps> = ({
  /**
   * List of descriptions
   */
  description,
  /**
   * header for description of tezos prediction markets
   */
  title,
  /**
   * list of allowed actions
   */
  links = defaultLinks,
}) => {
  const theme = useTheme();
  return (
    <FooterStyled theme={theme}>
      <Grid container direction="column" flexWrap="nowrap">
        {title && (
          <Grid item xs={12}>
            <Typography color="text.primary" size="h6">
              {title}
            </Typography>
          </Grid>
        )}
        <Grid container item xs={12} md={4} direction="row">
          {links.map(({ label, isExternal, handleLinkClick }, index) => {
            return (
              <Grid
                item
                xs={6}
                sm={6}
                md={4}
                lg={2}
                justifyContent="flex-start"
                key={`${label}-${index}`}
              >
                <LinkTypographyStyled
                  color="primary.main"
                  size="h4"
                  onClick={handleLinkClick}
                  whiteSpace="nowrap"
                >
                  {label}
                  {isExternal && (
                    <Box marginLeft="0.3rem" component="span">
                      <VectorLinkIcon />
                    </Box>
                  )}
                </LinkTypographyStyled>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Grid container item direction="column">
            {description.map((content, index) => (
              <Grid item key={index}>
                <Typography color="text.secondary" size="body1" marginY={0.5}>
                  {content}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </FooterStyled>
  );
};
