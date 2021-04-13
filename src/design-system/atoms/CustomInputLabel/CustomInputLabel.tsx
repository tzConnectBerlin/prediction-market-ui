import styled from '@emotion/styled';
import { InputLabel, InputLabelProps, TextFieldProps, Theme } from '@material-ui/core';

interface StyledInputLabelProps extends InputLabelProps {
  /**
   * Material-UI Theme
   */
  theme?: Theme;
  /**
   * Font weight to provide (default: 600)
   */
  fontWeight?: number | string;
  /**
   * Margin top (default: -12%)
   */
  marginTop?: number | string;
  /**
   * Custom class to add to asterisk (default: label-asterisk)
   */
  asteriskClass?: string;
}
export interface CustomInputLabelProps extends StyledInputLabelProps {
  /**
   * Show asterisk or not
   */
  required?: boolean;
  /**
   * Text to show
   */
  label: TextFieldProps['label'];
}

const StyledInputLabel = styled(InputLabel)<StyledInputLabelProps>`
  margin-top: ${({ marginTop }) => marginTop ?? '-12%'};
  font-weight: ${({ fontWeight }) => fontWeight ?? 600};
  & .label-asterisk {
    vertical-align: sub;
  }
  color: ${({ theme }) => (theme && theme.palette ? theme.palette.primary.main : 'inherit')};
`;

export const CustomInputLabel: React.FC<CustomInputLabelProps> = ({
  label,
  required,
  asteriskClass = 'label-asterisk',
  ...rest
}) => {
  return (
    <StyledInputLabel required={required} classes={{ asterisk: asteriskClass }} {...rest}>
      {label}
    </StyledInputLabel>
  );
};
