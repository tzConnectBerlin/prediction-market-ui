import React from 'react';
import {
  InputLabel,
  InputLabelProps,
  TextFieldProps,
  Grid,
  FormHelperText,
} from '@material-ui/core';
import { CustomTooltip, CustomTooltipProps } from '../../atoms/CustomTooltip/CustomTooltip';
import { CustomChip } from '../../atoms/CustomChip';

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
  chipProps?: any;
}

export interface CustomChipProps {
  chip?: boolean;
  chipText?: string;
  chipIcon?: React.ReactNode;
  chipOnClick?: (event: React.MouseEvent<any>) => void | Promise<void>;
}

export type LabelProps = StyledInputLabelProps & CustomChipProps;

export interface CustomInputLabelProps extends LabelProps {
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
  chipProps,
  ...rest
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={chipProps ? 10 : 11}>
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
      {chipProps && (
        <Grid xs={2} item>
          <Grid container direction="row-reverse">
            <CustomChip {...chipProps} />
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
  chip = false,
  chipText,
  chipIcon,
  chipOnClick,
  ...rest
}) => {
  const [tooltipOpen, setTooltipState] = React.useState(false);
  const tooltipProps = tooltip
    ? {
        onClick: () => setTooltipState(!tooltipOpen),
        open: tooltipOpen,
      }
    : undefined;

  const chipProps = chip
    ? {
        label: chipText,
        onClick: chipOnClick,
        icon: chipIcon,
        chipSize: 'xs',
      }
    : undefined;
  return (
    <>
      <LabelComponents shrink tooltipProps={tooltipProps} chipProps={chipProps} {...rest} />
      {(helpMessage || tooltipOpen) && (
        <FormHelperText component="span" variant="standard" className="extra-help-message">
          {helpMessage ?? tooltipText}
        </FormHelperText>
      )}
    </>
  );
};
