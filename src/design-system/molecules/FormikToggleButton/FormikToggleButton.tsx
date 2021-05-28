import React from 'react';
import {
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputChipProps, CustomInputLabel } from '../CustomInputLabel';

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
  CustomInputChipProps;

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
        {toggleButtonItems.map((item: ToggleButtonItems) => (
          <ToggleButton value={item.label} key={item.label} disabled={disabled}>
            {item.label} ({item.value})
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};
