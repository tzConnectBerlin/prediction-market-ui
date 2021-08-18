import React from 'react';
import { Button, ButtonProps as MaterialButtonProps } from '@material-ui/core';
import styled, { CSSObject } from '@emotion/styled';
import { lightTheme as theme } from '../../../theme';
import { Typography } from '../Typography';

interface StyledButtonProps {
  bordercolor: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0.2em;
  padding: 0.2em 1.2em;
  border: solid 2px ${({ bordercolor }) => bordercolor};
  box-shadow: none;
  &:hover {
    border-width: 2px;
    box-shadow: none;
  }
  &:disabled {
    border-color: transparent;
  }
`;

export interface ButtonProps extends MaterialButtonProps {
  backgroundVariant?: 'primary' | 'secondary';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Disable or Enable button
   */
  disabled?: boolean;
  /**
   * Button contents
   */
  label: string;
  /**
   * When Button works as link
   */
  href?: string;
  /**
   * Button contains icon in LeftSide
   */
  icon?: string | React.ReactNode;
  /**
   * Button contains icon in RightSide
   */
  iconPosition?: 'left' | 'right';
  customStyle?: CSSObject;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const CustomButton: React.FC<ButtonProps> = ({
  backgroundVariant = 'primary',
  size = 'small',
  variant = 'contained',
  label,
  icon,
  iconPosition = 'right',
  customStyle,
  ...props
}) => {
  const internalBorderColor =
    variant === 'outlined' ? theme.palette[backgroundVariant].main : 'transparent';
  return (
    <StyledButton
      variant={variant}
      color={backgroundVariant}
      size={size}
      startIcon={iconPosition === 'left' ? icon : null}
      endIcon={iconPosition === 'right' ? icon : null}
      bordercolor={internalBorderColor}
      sx={{ ...customStyle }}
      {...props}
    >
      <Typography size="h3">{label}</Typography>
    </StyledButton>
  );
};
