import * as React from 'react';
import { Button, ButtonProps as MaterialButtonProps, Theme, useTheme } from '@mui/material';
import { SxProps } from '@mui/system';
import styled from '@emotion/styled';
import { Typography } from '../Typography';

type ButtonVariant = 'primary' | 'secondary';

interface StyledButtonProps {
  bordercolor: string;
  texttype: string;
  textcolor?: string;
  hovercolor?: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0.2em;
  padding: 0.75em 1.2em;
  border: solid 2px ${({ bordercolor }) => bordercolor};
  text-transform: ${({ texttype }) => texttype};
  box-shadow: none;
  color: ${({ textcolor }) => textcolor};
  &:hover {
    border-width: 2px;
    box-shadow: none;
    background-color: ${({ hovercolor }) => hovercolor};
  }
  &:disabled {
    border-color: transparent;
  }
`;

export interface ButtonProps extends MaterialButtonProps {
  backgroundVariant?: ButtonVariant;
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
  const theme = useTheme();
  const internalBorderColor =
    variant === 'outlined' ? theme.palette[backgroundVariant].main : 'transparent';
  const textcolor = theme.palette.buttonText[backgroundVariant];
  const hovercolor = theme.palette.buttonHover
    ? theme.palette.buttonHover[backgroundVariant]
    : undefined;
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
      textcolor={textcolor}
      hovercolor={hovercolor}
      {...props}
    >
      <Typography size="h3">{label}</Typography>
    </StyledButton>
  );
};
