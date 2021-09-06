import * as React from 'react';
import { Button, ButtonProps as MaterialButtonProps, Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';
import styled from '@emotion/styled';
import { lightTheme as theme } from '../../../styles/theme';
import { Typography } from '../Typography';

interface StyledButtonProps {
  bordercolor: string;
  texttype: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0.2em;
  padding: 0.2em 1.2em;
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
  customStyle?: SxProps<Theme>;
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
      texttype={lowercase ? 'none' : 'uppercase'}
      sx={customStyle}
      {...props}
    >
      <Typography size="h3">{label}</Typography>
    </StyledButton>
  );
};
