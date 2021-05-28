import React from 'react';
import {
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputLabel } from '../CustomInputLabel';
import { CustomChipProps } from '../CustomInputLabel/CustomInputLabel';

interface InternalToggleButtonProps extends FieldProps {
  toggleButtonItems: ToggleButtonItems[];
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface ToggleButtonItems {
  value: string;
  label: string;
}

export type FormikToggleButtonProps = InternalToggleButtonProps &
  ToggleButtonGroupProps &
  CustomChipProps;

export const FormikToggleButton: React.FC<FormikToggleButtonProps> = ({
  toggleButtonItems,
  field: { value, name },
  label,
  required,
  helpMessage,
  tooltip,
  tooltipText,
  chip = false,
  chipText,
  chipIcon,
  chipOnClick,
  disabled = false,
  children,
  ...rest
}) => {
  return (
    <FormControl>
      <CustomInputLabel
        shrink
        htmlFor={name}
        label={label}
        required={required}
        disabled={disabled}
        helpMessage={helpMessage}
        tooltipText={tooltipText}
        tooltip={tooltip}
        chip={chip}
        chipText={chipText}
        chipIcon={chipIcon}
        chipOnClick={chipOnClick}
      />
      <ToggleButtonGroup {...rest} exclusive fullWidth>
        {toggleButtonItems.map((item) => (
          <ToggleButton value={item.value} key={item.value} disabled={disabled}>
            {item.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};
