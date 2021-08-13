import React from 'react';
import { useTheme } from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import styled from '@emotion/styled';

const StyledPhaseIcon = styled(FiberManualRecord)`
  width: 0.9375rem;
  height: 0.9375rem;
  margin: 0.375rem 0.9375rem 0.375rem 0;
  border-radius: 2.75rem;
  padding: 0;
  min-width: 0;
  border: solid 1px rgba(29, 34, 39, 0.04);
  & circle {
    r: 12;
  }
`;

export const PreTradingIcon = () => {
  const theme = useTheme();
  return <StyledPhaseIcon style={{ color: theme.palette.primary.light }} />;
};

export const TradingIcon = () => {
  const theme = useTheme();
  return <StyledPhaseIcon style={{ color: theme.palette.primary.main }} />;
};

export const ResolvedIcon = () => {
  const theme = useTheme();
  return <StyledPhaseIcon style={{ color: theme.palette.grey[400] }} />;
};
