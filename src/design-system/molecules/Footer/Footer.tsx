import React from 'react';
import styled from '@emotion/styled';
import { Paper, Grid, Box, Container } from '@material-ui/core';
import { Typography } from '../../atoms/Typography';
import { VectorLinkIcon } from './VectorLinkIcon';

const FooterStyled = styled.footer`
  margin-top: auto;
`;

const FooterContainer = styled(Container)`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  flex-shrink: 0;
  position: relative;
  top: auto;
  bottom: 0;
`;

const PaperWrapper = styled(Paper)`
  width: 100%;
  padding: 2rem;
`;

const LinkTypographyStyled = styled(Typography)`
  cursor: pointer;
  padding: 1rem;
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
    <FooterStyled>
      <FooterContainer
        sx={{ backgroundColor: 'background.default' }}
        disableGutters
        maxWidth={false}
      >
        <PaperWrapper elevation={5}>
          <Grid container>
            {title && (
              <Grid item xs={12}>
                <Typography color="text.primary" size="h6">
                  {title}
                </Typography>
              </Grid>
            )}
            <Grid container item xs={12} md={8} lg={9}>
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
            <Grid container item xs={12} md={4} lg={3}>
              {links.map(({ label, isExternal, handleLinkClick }, index) => {
                return (
                  <React.Fragment key={`${label}-${index}`}>
                    {isExternal ? (
                      <Grid item xs={12} sm={6} md={4} lg={6} justifyContent="center">
                        <LinkTypographyStyled
                          color="primary.main"
                          size="h4"
                          onClick={handleLinkClick}
                          whiteSpace="nowrap"
                        >
                          {label}
                          <Box marginLeft="0.3rem" component="span">
                            <VectorLinkIcon />
                          </Box>
                        </LinkTypographyStyled>
                      </Grid>
                    ) : (
                      <Grid item xs={12} sm={6} md={4} justifyContent="center">
                        <LinkTypographyStyled
                          color="primary.main"
                          size="h4"
                          onClick={handleLinkClick}
                          whiteSpace="nowrap"
                        >
                          {label}
                        </LinkTypographyStyled>
                      </Grid>
                    )}
                  </React.Fragment>
                );
              })}
            </Grid>
          </Grid>
        </PaperWrapper>
      </FooterContainer>
    </FooterStyled>
  );
};
