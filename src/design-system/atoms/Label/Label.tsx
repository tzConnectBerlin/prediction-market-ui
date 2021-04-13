import React from 'react';
import { SimplePaletteColorOptions, PaletteOptions } from '@material-ui/core/styles';
import styled from '@emotion/styled';
import { theme } from '../../../theme';

type PaletteOptionType = keyof PaletteOptions;
type PaletteColorOptionType = keyof SimplePaletteColorOptions;

interface StyledLabelProps {
  fontSize?: string;
  fontColor: string;
  backgroundColor?: string;
  iconSize?: string;
}

const StyledLabel = styled.span<StyledLabelProps>`
  font-size: ${({ fontSize }) => fontSize};
  border-radius: 0.2em;
  padding: 0.3em 0.6em;
  display: inline-block;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ fontColor }) => fontColor};
  &.label--icon {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    & > * {
      margin-right: 0.3em;
      font-size: ${({ iconSize }) => iconSize};
    }
  }
`;

export interface LabelProps {
  fontVariant?: PaletteOptionType;
  backgroundVariant?: PaletteOptionType;
  fontColor?: PaletteColorOptionType;
  backgroundColor?: PaletteColorOptionType;
  /**
   * Label text
   */
  text: string;
  /**
   * How large should the label be?
   */
  size?: 'small' | 'medium' | 'large';

  icon?: string | React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Label: React.FC<LabelProps> = ({
  backgroundVariant = 'primary',
  backgroundColor = 'dark',
  text,
  size = 'small',
  icon,
  ...props
}) => {
  const hasIcon = icon ? 'label--icon' : '';
  const fontSize =
    size && (size.includes('em') || size.includes('px'))
      ? size
      : size === 'large'
      ? '1.3em'
      : size === 'medium'
      ? '1em'
      : '0.8em';
  const iconSize = hasIcon && size && size === 'small' ? '1.1em' : fontSize;

  /**
   * TODO: find a way to do this without `any`
   */
  const internalBackgroundVariant: any = theme.palette[backgroundVariant];
  const internalBackgroundColor = internalBackgroundVariant[backgroundColor];

  const fontColor: string =
    backgroundColor && backgroundColor === 'dark'
      ? theme.palette.lightText.primary
      : theme.palette.text.primary;

  return (
    <StyledLabel
      fontSize={fontSize}
      fontColor={fontColor}
      backgroundColor={internalBackgroundColor}
      iconSize={iconSize}
      className={hasIcon}
      {...props}
    >
      {icon}
      {text}
    </StyledLabel>
  );
};
