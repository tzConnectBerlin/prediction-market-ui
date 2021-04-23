import React from 'react';
import styled from '@emotion/styled';
import { CardContent, Card } from '@material-ui/core';
import { format } from 'date-fns';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCardHeader } from '../MarketCardHeader';

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
  content,
  onClick,
}) => {
  const currentDate = new Date();
  const timestamp = currentDate < auctionTimestamp ? auctionTimestamp : marketTimestamp;
  const timestampText = currentDate < auctionTimestamp ? auctionCloseText : marketCloseText;
  const timestampFormat = DATETIME_FORMAT.MEDIUM_FORMAT;

  return (
    <StyledCard onClick={onClick}>
      <MarketCardHeader
        hash={hash}
        iconURL={iconURL}
        title={title}
        closeDate={format(new Date(timestamp), timestampFormat)}
        cardState={timestampText}
        iconType="tzKtCat"
      />
      {content && <CardContent>{content}</CardContent>}
    </StyledCard>
  );
};
