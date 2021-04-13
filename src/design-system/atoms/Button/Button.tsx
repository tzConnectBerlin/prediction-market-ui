import React from 'react';
import Button from '@material-ui/core/Button';
import styled, { CSSObject } from '@emotion/styled';
import { theme } from '../../../theme';

interface StyledButtonProps {
  bordercolor: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0.2em;
  padding: 0.2em 1.2em;
  border: solid 2px ${({ bordercolor }) => bordercolor};
  &:hover {
    border-width: 2px !important;
  }
  &:disabled {
    border-color: transparent;
  }
`;

export interface ButtonProps {
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
   * Button contents
   */
  variant?: 'contained' | 'outlined';
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
  href,
  icon,
  iconPosition = 'right',
  disabled = false,
  customStyle,
  ...props
}) => {
  const internalBorderColor = theme.palette[backgroundVariant].main;
  return (
    <StyledButton
      variant={variant}
      color={backgroundVariant}
      size={size}
      disabled={disabled}
      href={href}
      startIcon={iconPosition === 'left' ? icon : null}
      endIcon={iconPosition === 'right' ? icon : null}
      bordercolor={internalBorderColor}
      sx={{ ...customStyle }}
      {...props}
    >
      {label}
    </StyledButton>
  );
};
