import React from 'react';
import { Grid } from '@material-ui/core';

import styled from '@emotion/styled';
import { lightTheme as theme } from '../../../theme';
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
      font-size: 1.5em;
    }
  }
`;
export interface PositionProps {
  tokenList?: { type: string; value?: number }[];
}

export const PositionSummary: React.FC<PositionProps> = ({ tokenList }) => {
  if (!tokenList) {
    return null;
  }
  const getTokenList = () => {
    return tokenList?.map((item, i) => {
      return (
        <Grid item xs={6} key={i}>
          <StyledLabel fontColor={theme.palette.text.secondary}>{item.type}</StyledLabel>
          <StyledLabel>{item.value}</StyledLabel>
        </Grid>
      );
    });
  };

  return (
    <StyledGrid container spacing={1}>
      <Typography>Position Summary</Typography>
      {/* add translation */}
      <Grid container item xs={12} spacing={3}>
        {getTokenList()}
      </Grid>
    </StyledGrid>
  );
};
