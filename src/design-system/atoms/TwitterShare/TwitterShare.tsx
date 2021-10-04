import * as React from 'react';
import { Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { Typography } from '../Typography';

export interface TwitterShareProps {
  /**
   * Color of the Twitter icon
   * Default: blue
   */
  color?: 'blue' | 'grey';
  /**
   * Title text
   */
  title?: string;
  /**
   * text to share
   */
  text: string;
}

const defaultColor = 'blue';
const defaultTitle = 'Share';

export const TwitterShare: React.FC<TwitterShareProps> = ({
  color = defaultColor,
  title = defaultTitle,
  text,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const iconURL = `/icons/social/twitter-${color}.svg`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;

  return (
    <Grid
      container
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      flexDirection="column"
      marginTop={isMobile ? 5 : 6}
    >
      <Grid item width={44} height={44}>
        <a href={twitterUrl} target="_blank" rel="noreferrer">
          <img src={iconURL} alt="twitter-share" />
        </a>
      </Grid>
      {title && (
        <Grid item justifyContent="center" alignItems="center" marginTop={1}>
          <Typography textAlign="center" size="h3" color={theme.palette.primary.main}>
            {title}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
