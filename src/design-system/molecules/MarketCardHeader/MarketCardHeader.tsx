import React from 'react';
import { CardHeader, Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { GiAlarmClock } from 'react-icons/gi';
import { Identicon, IdenticonProps } from '../../atoms/Identicon';
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
  cardState?: string;
  /**
   * market close timestamp to display on the card
   */
  closeDate: string;

  iconType?: IdenticonProps['type'];
}

export const MarketCardHeader: React.FC<MarketCardHeaderProps> = ({
  title,
  hash,
  iconURL,
  iconSize = 'xl',
  cardState = 'Market',
  closeDate = 'Closed',
  iconType = 'blockies',
}) => {
  const LabelGroup: React.FC = () => (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Label text={cardState} />
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
