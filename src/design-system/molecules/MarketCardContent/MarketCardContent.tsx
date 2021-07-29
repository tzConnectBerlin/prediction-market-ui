import React from 'react';
import { Grid } from '@material-ui/core';
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
import Button from '../../atoms/Button';

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
      font-size: 1.5em;
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
   * Sets actions for card
   */
  action?: () => void;
  /**
   * label for action button
   */
  actionLabel?: string;
}

export const MarketCardContent: React.FC<MarketCardContentProps> = ({
  tokenList = [],
  statisticList = [],
  action,
  actionLabel,
}) => {
  const getTokenList = () => {
    return tokenList.map((token, i) => {
      const color =
        token.type === TokenType.yes ? theme.palette.success.main : theme.palette.error.main;
      return (
        <Grid item xs={6} key={i}>
          <StyledLabel fontColor={theme.palette.text.secondary}>{token.type}</StyledLabel>
          <StyledLabel fontColor={color}>{token.value}</StyledLabel>
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
            {item.type}{' '}
            {item.changes && (item.changes === 'up' ? <AiFillCaretUp /> : <AiFillCaretDown />)}
          </StyledLabel>
          <StyledLabel fontColor={color}>
            {item.tokenType} {item.value}
            {typeof item.currency !== 'undefined' &&
              Currency[item.currency as unknown as CurrencyTypes]}
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
      {action && (
        <Grid container item xs={12} justifyContent="center" flexDirection="row" marginTop="1rem">
          <Button label={actionLabel ?? 'Take Action'} onClick={action} variant="outlined" />
        </Grid>
      )}
    </StyledGrid>
  );
};
