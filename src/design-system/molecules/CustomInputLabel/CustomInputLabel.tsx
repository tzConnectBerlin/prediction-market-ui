import styled from '@emotion/styled';
import { InputLabel, InputLabelProps, TextFieldProps, Theme, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { CustomTooltip, CustomTooltipProps } from '../../atoms/CustomTooltip/CustomTooltip';

interface StyledInputLabelProps extends InputLabelProps {
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
        <InputLabel
          variant="standard"
          required={required}
          classes={{ asterisk: asteriskClass }}
          disabled={disabled}
          {...rest}
        >
          {label}
        </InputLabel>
      </Grid>
      {tooltipProps && (
        <Grid xs={1} item>
          <CustomTooltip {...tooltipProps} />
        </Grid>
      )}
    </Grid>
  );
};
