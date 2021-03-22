import React from 'react';
import styled from '@emotion/styled';
import { CardHeader, Card, Grid } from '@material-ui/core';
import { format } from 'date-fns';
import { GiAlarmClock } from 'react-icons/gi';
import { Identicon } from '../../atoms/Identicon';
import { DATETIME_FORMAT } from '../../../utils/globals';

import { Typography } from '../../atoms/Typography';

import { Label } from '../../atoms/Label';

export interface MarketCardHeaderProps {
  /**
   * market question
   */
  title: string;
  /**
   * market ipfs hash
   */
  hash?: string;
  /**
   * Icon url to use
   */
  iconURL?: string;
  /**
   * market step to display on the card (MARKET/AUCTION)
   */
  marketStep?: 'Market' | 'Auction';
  /**
   * market close timestamp to display on the card
   */
  marketTimestamp: Date;
  /**
   * format to use for the timestamp
   * default: dd MMM yyyy hh:mm:ss aaaa
   */
  timestampFormat?: string;
}

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  title,
  hash,
  iconURL,
  marketStep = 'Market',
  marketTimestamp,
  timestampFormat = DATETIME_FORMAT.MEDIUM_FORMAT,
}) => {
  const currentDate = new Date();
  const marketClosedText =
    currentDate < marketTimestamp ? format(marketTimestamp, timestampFormat) : 'Closed';
  const LabelGroup: React.FC = () => (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Label text={marketStep} />
      </Grid>
      <Grid item>
        <Label
          text={marketClosedText}
          backgroundVariant="secondary"
          backgroundColor="light"
          icon={<GiAlarmClock />}
        />
      </Grid>
    </Grid>
  );

  const CardTitle: React.FC = () => (
    <>
      <LabelGroup />
      {title}
    </>
  );
  return (
    <CardHeader avatar={<Identicon seed={hash ?? title} url={iconURL} />} title={<CardTitle />} />
  );
};
