import React from 'react';
import styled from '@emotion/styled';
import { AppBar, Grid, Toolbar, Box } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { VectorLinkIcon } from './VectorLinkIcon';

const AppBarStyled = styled(AppBar)`
  width: 100%;
  display: flex;
  padding: 2em;
  margin-top: 2em;
`;

const ToolBarStyled = styled(Toolbar)`
  justify-content: center;
`;

interface FooterLink {
  label: string;
  handleLinkClick?: () => void | Promise<void>;
  isExternal?: boolean;
}
export interface FooterProps {
  title: string;
  links?: FooterLink[];
  description: string[];
}

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
  links = [],
}) => {
  return (
    <footer>
      <AppBarStyled
        position="relative"
        sx={{ top: 'auto', bottom: 0, backgroundColor: 'background.default' }}
      >
        <ToolBarStyled>
          <Grid container>
            <Grid item lg={12}>
              <Typography color="text.primary" size="h6">
                {title}
              </Typography>
            </Grid>
            <Grid container item xs={12} md={8} lg={9}>
              <Grid container item direction="column">
                {description.map((content, index) => (
                  <Grid item key={index}>
                    <Typography color="text.secondary" size="body2" marginY={0.5}>
                      {content}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid container item xs={12} md={4} lg={3}>
              {links.map(({ label, isExternal, handleLinkClick }, index) => {
                return (
                  <React.Fragment key={`${label}-${index}`}>
                    {isExternal ? (
                      <Grid container item xs={12} md={4} justifyContent="center">
                        <Typography
                          color="primary.main"
                          size="subtitle1"
                          onClick={handleLinkClick}
                          whiteSpace="nowrap"
                        >
                          {label}
                          <Box marginLeft="0.3rem" component="span">
                            <VectorLinkIcon />
                          </Box>
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid container item xs={12} md={8} justifyContent="center">
                        <Typography
                          color="primary.main"
                          size="subtitle1"
                          onClick={handleLinkClick}
                          whiteSpace="nowrap"
                        >
                          {label}
                        </Typography>
                      </Grid>
                    )}
                  </React.Fragment>
                );
              })}
            </Grid>
          </Grid>
        </ToolBarStyled>
      </AppBarStyled>
    </footer>
  );
};
