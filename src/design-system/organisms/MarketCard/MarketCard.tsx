import React from 'react';
import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import { DATETIME_FORMAT } from '../../../utils/globals';
import { MarketCardHeader } from '../../molecules/MarketCardHeader';
import { MarketCardContent } from '../../molecules/MarketCardContent';

const StyledCard = styled(Card)`
  margin: 1em;
  max-width: 21em;
  min-width: 21em;
  cursor: pointer;
`;

interface TokenLabelValue {
  label: string;
  value: string | number;
  valueColor: string;
}

interface StatisticLabelValue {
  label: string;
  value: string | number;
  valueColor: string;
  changes?: 'up' | 'down';
}

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
   * market step to display on the card
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

  /**
   * market token list
   */
  tokenList?: TokenLabelValue[];
  /**
   * market statistic List
   */
  statisticList?: StatisticLabelValue[];

  onClick?: () => void | Promise<void>;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  title,
  hash,
  iconURL,
  cardLabel = 'Market',
  timestamp,
  timestampFormat = DATETIME_FORMAT.MEDIUM_FORMAT,
  tokenList,
  statisticList,
  onClick,
}) => {
  return (
    <StyledCard
      onClick={() => {
        onClick && onClick();
      }}
    >
      <MarketCardHeader
        title={title}
        cardLabel={cardLabel}
        timestampFormat={timestampFormat}
        timestamp={timestamp}
        hash={hash}
        iconURL={iconURL}
      />
      {(tokenList || statisticList) && (
        <MarketCardContent tokenList={tokenList} statisticList={statisticList} />
      )}
    </StyledCard>
  );
};
