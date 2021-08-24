import * as React from 'react';
import { Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { lightTheme as theme } from '../../../styles/theme';
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
export interface MarketPositionProps {
  tokenList?: { type: string; value?: number }[];
}

export const MarketPosition: React.FC<MarketPositionProps> = ({ tokenList }) => {
  if (!tokenList) {
    return null;
  }
  const getTokenList = () => {
    return tokenList?.map((item, i) => {
      return (
        <Grid container item xs={6} key={i} direction="row" justifyContent="space-between">
          <StyledLabel fontColor={theme.palette.text.secondary}>
            <Typography size="h4">{item.type}</Typography>
          </StyledLabel>
          <StyledLabel>
            <Typography size="h3">{item.value}</Typography>
          </StyledLabel>
        </Grid>
      );
    });
  };

  return (
    <StyledGrid container spacing={1}>
      <Typography size="h2" marginLeft="1rem">
        Position Summary
      </Typography>
      {/* add translation */}
      <Grid container item xs={12} spacing={1} direction="column" marginRight="1rem" marginLeft="0">
        {getTokenList()}
      </Grid>
    </StyledGrid>
  );
};
