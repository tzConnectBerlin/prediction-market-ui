import styled from '@emotion/styled';
import { CardHeader, CardContent, Card } from '@material-ui/core';
import { format } from 'date-fns';
import React from 'react';
import { LONG_DATE_FORMAT } from '../../../utils/globals';
import { Identicon } from '../../atoms/Identicon';
import { Typography } from '../../atoms/Typography';

const StyledCard = styled(Card)`
  margin: 1em;
  max-width: 21em;
  min-width: 21em;
  & .MuiCardHeader-title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  cursor: pointer;
`;

export interface MarketCardProps {
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
   * auction close timestamp to display on the card
   */
  auctionTimestamp: Date;
  /**
   * market close timestamp to display on the card
   */
  marketTimestamp: Date;
  /**
   * auction close text to display on the card
   */
  auctionCloseText: string;
  /**
   * market close text to display on the card
   */
  marketCloseText: string;
  /**
   * format to use for the timestamp
   * default: dd MMM yyyy hh:mm:ss aaaa
   */
  timestampFormat?: string;

  /**
   * Show both auction close date and market close data
   */
  showAllTimeStamps?: boolean;
  /**
   * On click event handler
   */

  /**
   * content
   */
  content?: React.ReactNode;

  onClick?: () => void | Promise<void>;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  title,
  hash,
  iconURL,
  auctionTimestamp,
  auctionCloseText,
  marketTimestamp,
  marketCloseText,
  timestampFormat = LONG_DATE_FORMAT,
  showAllTimeStamps = false,
  content,
  onClick,
}) => {
  const currentDate = new Date();
  const timestamp = currentDate < auctionTimestamp ? auctionTimestamp : marketTimestamp;
  const timestampText = currentDate < auctionTimestamp ? auctionCloseText : marketCloseText;
  const dynamicText = `${timestampText} ${format(timestamp, timestampFormat)}`;
  const BothTimestamps: React.FC = () => (
    <>
      <Typography size="body2" color="textSecondary" component="p">
        {auctionCloseText} {format(auctionTimestamp, timestampFormat)}
      </Typography>
      <Typography size="body2" color="textSecondary" component="p">
        {marketCloseText} {format(marketTimestamp, timestampFormat)}
      </Typography>
    </>
  );

  return (
    <StyledCard
      onClick={() => {
        onClick && onClick();
      }}
    >
      <CardHeader
        avatar={<Identicon seed={hash ?? title} url={iconURL} type="tzKtCat" />}
        title={title}
        subheader={showAllTimeStamps ? <BothTimestamps /> : dynamicText}
      />
      {content && <CardContent>{content}</CardContent>}
    </StyledCard>
  );
};
