import * as React from 'react';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import { lightTheme as theme } from '../../../styles/theme';
import { MarketCardStatistic, MarketCardToken, TokenType } from '../../../interfaces/market';
import { Typography } from '../../atoms/Typography';

interface StyledLabelProps {
  icon?: string;
  fontColor?: string;
}

const StyledGrid = styled(Grid)`
  font-size: 0.8em;
  padding: 1em;
  padding-top: 0;
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
}

const defaultTokenList: MarketCardToken[] = [];
const defaultStatisticList: MarketCardStatistic[] = [];

export const MarketCardContent: React.FC<MarketCardContentProps> = ({
  tokenList = defaultTokenList,
  statisticList = defaultStatisticList,
}) => {
  const getTokenList = () => {
    return tokenList.map((token, i) => {
      const color =
        token.type === TokenType.yes ? theme.palette.success.main : theme.palette.error.main;
      return (
        <Grid item xs={6} key={i}>
          <StyledLabel fontColor={theme.palette.text.secondary}>
            <Typography size="h4" component="h3">
              {token.type}
            </Typography>
          </StyledLabel>
          <StyledLabel fontColor={color}>
            <Typography size="h3">{token.value}%</Typography>
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
            <Typography size="h4" component="h3">
              {item.type}
            </Typography>
          </StyledLabel>
          <StyledLabel fontColor={color}>
            <Typography size="h3">
              {item.tokenType} {item.value}
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
