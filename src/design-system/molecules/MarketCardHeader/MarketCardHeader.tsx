import React from 'react';
import { CardHeader, Grid } from '@material-ui/core';
import { format } from 'date-fns';
import styled from '@emotion/styled';
import { GiAlarmClock } from 'react-icons/gi';
import { Identicon, IdenticonProps } from '../../atoms/Identicon';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { Label } from '../../atoms/Label';

const StyledTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0.3em 0;
  font-size: 1em;
  font-weight: bold;
`;

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

  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * card label mostly used for market steps (Market,Auction,...)
   */
  cardLabel?: string;
  /**
   * market close timestamp to display on the card
   */
  timestamp: Date;
  /**
   * format to use for the timestamp
   * default: dd MMM yyyy hh:mm
   */
  timestampFormat?: string;

  iconType?: IdenticonProps['type'];
}

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  title,
  hash,
  iconURL,
  iconSize = 'xl',
  cardLabel = 'Market',
  timestamp,
  timestampFormat = DATETIME_FORMAT.MEDIUM_FORMAT,
  iconType = 'blockies',
}) => {
  const currentDate = new Date();
  /**
   * TODO: move this 'Closed' to prop
   */
  const marketClosedText = currentDate < timestamp ? format(timestamp, timestampFormat) : 'Closed';
  const LabelGroup: React.FC = () => (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Label text={cardLabel} />
      </Grid>
      <Grid item>
        <Label
          text={marketClosedText}
          backgroundVariant="grey"
          backgroundColor="500"
          icon={<GiAlarmClock />}
        />
      </Grid>
    </Grid>
  );

  const CardTitle: React.FC = () => (
    <>
      <LabelGroup />
      <StyledTitle>{title}</StyledTitle>
    </>
  );
  return (
    <CardHeader
      avatar={<Identicon seed={hash ?? title} url={iconURL} iconSize={iconSize} type={iconType} />}
      title={<CardTitle />}
    />
  );
};
