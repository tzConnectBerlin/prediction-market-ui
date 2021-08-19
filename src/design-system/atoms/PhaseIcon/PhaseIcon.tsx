import * as React from 'react';
import { useTheme } from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import styled from '@emotion/styled';

const StyledPhaseIcon = styled(FiberManualRecord)<{ iconColor?: string }>`
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
  color: ${({ iconColor }) => iconColor};
`;

export interface PhaseIconProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const PhaseIcon: React.FC<PhaseIconProps> = ({ variant = 'primary' }) => {
  const theme = useTheme();
  const color =
    variant === 'primary'
      ? theme.palette.primary.light
      : variant === 'secondary'
      ? theme.palette.primary.main
      : theme.palette.grey[400];
  return <StyledPhaseIcon iconColor={color} />;
};
