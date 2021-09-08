import * as React from 'react';
import styled from '@emotion/styled';
import { Chip, ChipProps, useTheme, Theme } from '@material-ui/core';

interface StyledProps {
  theme: Theme;
}

const StyledChip = styled(Chip)<StyledProps>`
  &.xs {
    font-size: ${({ theme }) => theme.spacing(3 / 2)};
    height: ${({ theme }) => theme.spacing(5 / 2)};
  }

  &.sm {
    font-size: ${({ theme }) => theme.spacing(3 / 2)};
    height: ${({ theme }) => theme.spacing(3)};
  }

  &.md {
    font-size: ${({ theme }) => theme.spacing(2)};
    height: ${({ theme }) => theme.spacing(10 / 3)};
    padding: 0 ${({ theme }) => theme.spacing(3 / 2)};
  }

  &.lg {
    font-size: ${({ theme }) => theme.spacing(5 / 2)};
    height: ${({ theme }) => theme.spacing(4)};
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

export interface CustomChipProps extends ChipProps {
  chipSize?: 'xs' | 'sm' | 'md' | 'lg';
}

const defaultSize = 'xs';
const defaultColor = 'secondary';

export const CustomChip: React.FC<CustomChipProps> = ({
  chipSize = defaultSize,
  color = defaultColor,
  ...rest
}) => {
  const theme = useTheme();
  return <StyledChip color={color} className={chipSize} {...rest} theme={theme} />;
};
