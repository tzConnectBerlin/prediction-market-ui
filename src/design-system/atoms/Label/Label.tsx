import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { Typography } from '../Typography';

interface StyledLabelProps {
  fontSize?: string;
  fColor: string;
  bgColor: string;
  iconSize?: string;
}

const StyledLabel = styled.span<StyledLabelProps>`
  border-radius: 0.2em;
  padding: 0.3em 0.6em;
  display: inline-block;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fColor }) => fColor};
  &.label--icon {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    & > * {
      margin-right: 0.3em;
    }
    & > svg {
      width: ${({ iconSize }) => iconSize};
      height: ${({ iconSize }) => iconSize};
    }
  }
`;

export interface LabelProps {
  /**
   * Label text
   */
  text: string;
  /**
   * How large should the label be?
   */
  size?: 'small' | 'medium' | 'large';

  icon?: string | React.ReactNode;
  fontColor?: string;
  backgroundColor?: string;
}

const defaultSize = 'small';

/**
 * Primary UI component for user interaction
 */
export const Label: React.FC<LabelProps> = ({ text, size = defaultSize, icon, ...props }) => {
  const theme = useTheme();
  const hasIcon = icon ? 'label--icon' : '';
  const fontSize =
    size && (size.includes('em') || size.includes('px'))
      ? size
      : size === 'large'
      ? '1.3em'
      : size === 'medium'
      ? '1em'
      : '0.8em';
  const iconSize = hasIcon && size && size === 'small' ? '0.9em' : fontSize;

  const internalBackgroundColor = props.backgroundColor ?? theme.palette.primary.main;
  const internalFontColor = props.fontColor ?? theme.palette.primary.contrastText;
  return (
    <StyledLabel
      fColor={internalFontColor}
      bgColor={internalBackgroundColor}
      iconSize={iconSize}
      className={hasIcon}
      {...props}
    >
      {icon}
      <Typography size="h5" component="div">
        {text}
      </Typography>
    </StyledLabel>
  );
};
