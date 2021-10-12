import * as React from 'react';
import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { MarketCardHeader, MarketCardHeaderProps } from '../../molecules/MarketCardHeader';
import { MarketCardContent, MarketCardContentProps } from '../../molecules/MarketCardContent';

const StyledCard = styled(Card)`
  margin: 1em;
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

interface CardProps {
  onClick?: () => void | Promise<void>;
}

export type MarketCardProps = CardProps & MarketCardHeaderProps & MarketCardContentProps;

export const MarketCard: React.FC<MarketCardProps> = ({
  tokenList,
  statisticList,
  onClick,
  ...rest
}) => {
  return (
    <StyledCard onClick={onClick}>
      <MarketCardHeader {...rest} />
      {(tokenList || statisticList) && (
        <MarketCardContent tokenList={tokenList} statisticList={statisticList} />
      )}
    </StyledCard>
  );
};
