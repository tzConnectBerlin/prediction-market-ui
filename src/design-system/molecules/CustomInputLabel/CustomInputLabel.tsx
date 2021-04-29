import React from 'react';
import {
  InputLabel,
  InputLabelProps,
  TextFieldProps,
  Grid,
  FormHelperText,
} from '@material-ui/core';
import { CustomTooltip, CustomTooltipProps } from '../../atoms/CustomTooltip/CustomTooltip';

interface StyledInputLabelProps extends InputLabelProps {
  /**
   * Custom class to add to asterisk (default: label-asterisk)
   */
  asteriskClass?: string;
}

interface LabelComponentsProps extends StyledInputLabelProps {
  required?: boolean;
  label: TextFieldProps['label'];
  tooltipProps?: CustomTooltipProps;
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
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
}

const LabelComponents: React.FC<LabelComponentsProps> = ({
  label,
  required,
  asteriskClass = 'label-asterisk',
  disabled,
  tooltipProps,
  ...rest
}) => {
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
          <Grid container direction="row-reverse">
            <CustomTooltip {...tooltipProps} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export const CustomInputLabel: React.FC<CustomInputLabelProps> = ({
  tooltipText,
  helpMessage,
  tooltip,
  ...rest
}) => {
  const [tooltipOpen, setTooltipState] = React.useState(false);
  const tooltipProps = tooltip
    ? {
        onClick: () => setTooltipState(!tooltipOpen),
        open: tooltipOpen,
      }
    : undefined;
  return (
    <>
      <LabelComponents shrink tooltipProps={tooltipProps} {...rest} />
      {(helpMessage || tooltipOpen) && (
        <FormHelperText component="span" variant="standard" className="extra-help-message">
          {helpMessage ?? tooltipText}
        </FormHelperText>
      )}
    </>
  );
};
