import styled from '@emotion/styled';
import { InputLabel, InputLabelProps, TextFieldProps, Theme, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { CustomTooltip, CustomTooltipProps } from '../../atoms/CustomTooltip/CustomTooltip';

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
  tooltipProps?: CustomTooltipProps;
}

const StyledInputLabel = styled(InputLabel)<StyledInputLabelProps>`
  margin-top: ${({ marginTop }) => marginTop ?? '-12%'};
  font-weight: ${({ fontWeight }) => fontWeight ?? 600};
  color: ${({ theme }) => (theme && theme.palette ? theme.palette.primary.main : 'inherit')};
  &.Mui-disabled {
    color: ${({ theme }) => (theme && theme.palette ? theme.palette.primary.main : 'inherit')};
    opacity: 0.38;
  }
  & .label-asterisk {
    vertical-align: sub;
  }
`;

export const CustomInputLabel: React.FC<CustomInputLabelProps> = ({
  label,
  required,
  asteriskClass = 'label-asterisk',
  disabled,
  tooltipProps,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Grid container>
      <Grid item xs={11}>
        <StyledInputLabel
          required={required}
          classes={{ asterisk: asteriskClass }}
          theme={theme}
          disabled={disabled}
          {...rest}
        >
          {label}
        </StyledInputLabel>
      </Grid>
      {tooltipProps && (
        <Grid xs={1} item marginTop={rest.marginTop ?? '-12%'}>
          <CustomTooltip {...tooltipProps} />
        </Grid>
      )}
    </Grid>
  );
};
