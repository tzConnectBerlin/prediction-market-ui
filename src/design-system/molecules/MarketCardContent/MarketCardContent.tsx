import React from 'react';
import { Grid } from '@material-ui/core';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import styled from '@emotion/styled';
import { lightTheme as theme } from '../../../theme';

interface StyledLabelProps {
  icon?: string;
  fontColor?: string;
}

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

const StyledGrid = styled(Grid)`
  font-size: 0.8em;
  padding: 1em;
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
  tokenList?: TokenLabelValue[];
  /**
   * market statistic List
   */
  statisticList?: StatisticLabelValue[];
}

export const MarketCardContent: React.FC<MarketCardContentProps> = ({
  tokenList = [],
  statisticList = [],
}) => {
  return (
    <StyledGrid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        {tokenList.map((token) => (
          <Grid item xs={6} key={token.label}>
            <StyledLabel fontColor={theme.palette.text.secondary}>{token.label}</StyledLabel>
            <StyledLabel fontColor={token.valueColor}>{token.value}</StyledLabel>
          </Grid>
        ))}
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {statisticList.map((item) => (
          <Grid item xs={6} key={item.label}>
            <StyledLabel
              fontColor={theme.palette.text.secondary}
              className={item.changes ? 'hasIcon' : ''}
            >
              {item.label}{' '}
              {item.changes && (item.changes === 'up' ? <AiFillCaretUp /> : <AiFillCaretDown />)}
            </StyledLabel>
            <StyledLabel fontColor={item.valueColor}>{item.value}</StyledLabel>
          </Grid>
        ))}
      </Grid>
    </StyledGrid>
  );
};
