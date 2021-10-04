import * as React from 'react';
import { Button, ButtonProps as MaterialButtonProps } from '@material-ui/core';
import styled from '@emotion/styled';
import { lightTheme as theme } from '../../../styles/theme';
import { Typography } from '../Typography';

interface StyledButtonProps {
  bordercolor: string;
  texttype: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0.2em;
  border: solid 2px ${({ bordercolor }) => bordercolor};
  text-transform: ${({ texttype }) => texttype};
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
  /**
   * without uppercase text
   */
  lowercase?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void | Promise<string> | Promise<void>;
}

const defaultBackground = 'primary';
const defaultSize = 'small';
const defaultVariant = 'contained';
const defaultPosition = 'right';

export const CustomButton: React.FC<ButtonProps> = ({
  backgroundVariant = defaultBackground,
  size = defaultSize,
  variant = defaultVariant,
  lowercase,
  label,
  icon,
  iconPosition = defaultPosition,
  sx,
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
      texttype={lowercase ? 'none' : 'uppercase'}
      fullWidth
      sx={{ py: '0.2rem', px: '1.2rem', ...sx }}
      {...props}
    >
      <Typography size="h3">{label}</Typography>
    </StyledButton>
  );
};
