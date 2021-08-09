import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
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

export const TwitterShare: React.FC<TwitterShareProps> = ({ color = 'blue', title, text }) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const iconURL = `/icons/social/twitter-${color}.svg`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;

  return (
    <Grid
      container
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      flexDirection="column"
      marginTop={1}
    >
      {title && (
        <Grid item justifyContent="center" alignItems="center" marginTop={2}>
          <Typography textAlign="center" size="h4" color={theme.palette.grey[700]}>
            {title}
          </Typography>
        </Grid>
      )}

      <Grid item width={25} height={25} marginTop={1}>
        <a href={twitterUrl} target="_blank" rel="noreferrer">
          <img src={iconURL} alt="twitter-share" />
        </a>
      </Grid>
    </Grid>
  );
};
