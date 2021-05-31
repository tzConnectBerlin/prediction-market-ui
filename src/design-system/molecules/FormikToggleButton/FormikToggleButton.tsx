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
  field: { name, value },
  form: { setFieldValue },
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
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setFieldValue(name, newAlignment);
  };
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
      <ToggleButtonGroup
        {...rest}
        exclusive
        fullWidth
        value={value}
        onChange={handleAlignment}
        id={name}
      >
        {toggleButtonItems.map((item: ToggleButtonItems, index) => (
          <ToggleButton value={item.value} key={`${item.value}-${index}`} disabled={disabled}>
            {item.value} ({item.label})
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};
