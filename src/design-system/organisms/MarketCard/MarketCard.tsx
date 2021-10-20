import * as React from 'react';
import styled from '@emotion/styled';
import { Link as RouterLink } from 'react-router-dom';
import { Card, Link } from '@mui/material';
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
  marketURL: string;
}

export type MarketCardProps = CardProps & MarketCardHeaderProps & MarketCardContentProps;

export const MarketCard: React.FC<MarketCardProps> = ({
  tokenList,
  statisticList,
  marketURL,
  onClick,
  ...rest
}) => {
  return (
    <Link underline="none" display="flex" width="100%" component={RouterLink} to={marketURL}>
      <StyledCard onClick={onClick}>
        <MarketCardHeader {...rest} />
        {(tokenList || statisticList) && (
          <MarketCardContent tokenList={tokenList} statisticList={statisticList} />
        )}
      </StyledCard>
    </Link>
  );
};
