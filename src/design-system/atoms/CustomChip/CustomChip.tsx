import React from 'react';
import styled from '@emotion/styled';
import { Chip, ChipProps } from '@material-ui/core';
import { lightTheme as theme } from '../../../theme';

const StyledChip = styled(Chip)`
  &.xs {
    font-size: ${theme.spacing(3 / 2)};
    height: ${theme.spacing(5 / 2)};
  }

  &.sm {
    font-size: ${theme.spacing(3 / 2)};
    height: ${theme.spacing(3)};
  }

  &.md {
    font-size: ${theme.spacing(2)};
    height: ${theme.spacing(10 / 3)};
    padding: 0 ${theme.spacing(3 / 2)};
  }

  &.lg {
    font-size: ${theme.spacing(5 / 2)};
    height: ${theme.spacing(4)};
    padding: 0 ${theme.spacing(2)};
  }
`;

export interface CustomChipProps extends ChipProps {
  chipSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export const CustomChip: React.FC<CustomChipProps> = ({
  chipSize = 'xs',
  color = 'secondary',
  onDelete = undefined,
  ...rest
}) => {
  return <StyledChip color={color} className={chipSize} {...rest} />;
};
