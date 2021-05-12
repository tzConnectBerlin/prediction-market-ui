import React from 'react';
import styled from '@emotion/styled';
import { Card } from '@material-ui/core';
import { MarketCardHeader } from '../../molecules/MarketCardHeader';
import { MarketCardContent } from '../../molecules/MarketCardContent';
import { MarketCardStatistic, MarketCardToken } from '../../../interfaces/market';

const StyledCard = styled(Card)`
  margin: 1em;
  max-width: 21em;
  min-width: 21em;
  cursor: pointer;
  display: flex;
  flex-direction: column;
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
   * card step to display on the card
   */
  cardState: string;
  /**
   * market close timestamp to display on the card
   */
  closeDate: string;
  /**
   * market token list
   */
  tokenList?: MarketCardToken[];
  /**
   * market statistic List
   */
  statisticList?: MarketCardStatistic[];

  onClick?: () => void | Promise<void>;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  title,
  hash,
  iconURL,
  cardState,
  closeDate,
  tokenList,
  statisticList,
  onClick,
}) => {
  return (
    <StyledCard onClick={onClick}>
      <MarketCardHeader
        title={title}
        cardState={cardState}
        closeDate={closeDate}
        hash={hash}
        iconURL={iconURL}
      />
      {(tokenList || statisticList) && (
        <MarketCardContent tokenList={tokenList} statisticList={statisticList} />
      )}
    </StyledCard>
  );
};
