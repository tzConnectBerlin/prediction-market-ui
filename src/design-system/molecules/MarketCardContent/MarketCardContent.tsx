import React from 'react';
import { Grid, Skeleton } from '@material-ui/core';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import styled from '@emotion/styled';
import { lightTheme as theme } from '../../../theme';
import {
  Currency,
  CurrencyTypes,
  MarketCardStatistic,
  MarketCardToken,
  TokenType,
} from '../../../interfaces/market';
import { Typography } from '../../atoms/Typography';

interface StyledLabelProps {
  icon?: string;
  fontColor?: string;
}

const StyledGrid = styled(Grid)`
  font-size: 0.8em;
  padding: 1em;
  margin-top: auto;
`;

const StyledLabel = styled.div<StyledLabelProps>`
  color: ${({ fontColor }) => fontColor};
  padding: 0.2em;
  &.hasIcon {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    & > * {
      margin-left: 0.2em;
    }
  }
`;
export interface MarketCardContentProps {
  /**
   * market token list
   */
  tokenList?: MarketCardToken[];
  /**
   * market statistic List
   */
  statisticList?: MarketCardStatistic[];
  /**
   * Used for displaying a skeleton for loading values
   */
  cardState?: string;
}

export const MarketCardContent: React.FC<MarketCardContentProps> = ({
  tokenList = [],
  statisticList = [],
  cardState,
}) => {
  const getTokenList = () => {
    return tokenList.map((token, i) => {
      const color =
        token.type === TokenType.yes ? theme.palette.success.main : theme.palette.error.main;
      return (
        <Grid item xs={6} key={i}>
          <StyledLabel fontColor={theme.palette.text.secondary}>
            <Typography size="h4">{token.type}</Typography>
          </StyledLabel>
          <StyledLabel fontColor={color}>
            <Typography size="h3">
              {cardState === 'skeleton' ? <Skeleton /> : `${token.value}%`}
            </Typography>
          </StyledLabel>
        </Grid>
      );
    });
  };

  const getStatisticList = () => {
    return statisticList.map((item, i) => {
      const color =
        item.tokenType === TokenType.yes
          ? theme.palette.success.main
          : item.tokenType === TokenType.no
          ? theme.palette.error.main
          : undefined;

      return (
        <Grid item xs={6} key={i}>
          <StyledLabel
            fontColor={theme.palette.text.secondary}
            className={item.changes ? 'hasIcon' : ''}
          >
            <Typography size="h4">
              {item.type}{' '}
              {item.changes &&
                cardState !== 'skeleton' &&
                (item.changes === 'up' ? <AiFillCaretUp /> : <AiFillCaretDown />)}
            </Typography>
          </StyledLabel>
          <StyledLabel fontColor={color}>
            <Typography size="h3">
              {cardState === 'skeleton' ? <Skeleton /> : `${item.tokenType ?? ''} ${item.value}`}
              {typeof item.currency !== 'undefined' &&
                Currency[item.currency as unknown as CurrencyTypes]}
            </Typography>
          </StyledLabel>
        </Grid>
      );
    });
  };

  return (
    <StyledGrid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        {tokenList.length > 0 && getTokenList()}
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {statisticList.length > 0 && getStatisticList()}
      </Grid>
    </StyledGrid>
  );
};
