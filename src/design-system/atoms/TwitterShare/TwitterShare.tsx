import React from 'react';
import styled from '@emotion/styled';
import { Grid, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Typography } from '../Typography';

export interface TwitterShareProps {
  /**
   * Color of the Twitter icon background
   */
  color?: string;
  /**
   *
   */
  urlHostname?: string;
  urlHref?: string;
  marketId?: number | string;
  marketQuestion?: string;
  twitterText?: string;
}

export const TwitterShare: React.FC<TwitterShareProps> = ({
  color = 'blue',
  urlHostname,
  urlHref,
  marketId,
  marketQuestion,
  twitterText,
}) => {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const twitterColor =
    color === 'grey'
      ? '/twitter-dark-grey-circle.svg'
      : '/Twitter social icons - circle - blue.svg';
  const twitterUrl = urlHostname
    ? `https://twitter.com/intent/tweet?url=http%3A%2F%2F${urlHostname}%2F${marketId}%2F${marketQuestion}&${twitterText}`
    : `https://twitter.com/intent/tweet?url=${urlHref}&${twitterText}`;

  return (
    <Grid
      container
      justifyContent="center"
      textAlign="center"
      alignItems="center"
      flexDirection="column"
      marginTop={1}
    >
      <Grid item justifyContent="center" alignItems="center" marginTop={2}>
        <Typography textAlign="center" size="h4" color={theme.palette.grey[700]}>
          {t('shareNow')}
        </Typography>
      </Grid>

      <Grid item width={25} height={25} marginTop={1}>
        <a href={twitterUrl}>
          <img src={twitterColor} alt="twitter-share" />
        </a>
      </Grid>
    </Grid>
  );
};
