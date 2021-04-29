import React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormControlLabelProps,
  FormHelperText,
} from '@material-ui/core';
import { FieldProps } from 'formik';

export interface FormikCheckboxProps extends FieldProps {
  disabled?: boolean;
  required?: boolean;
  label: FormControlLabelProps['label'];
  labelPlacement?: FormControlLabelProps['labelPlacement'];
}

export const FormikCheckBox: React.FC<FormikCheckboxProps> = ({
  labelPlacement = 'end',
  required = false,
  disabled = false,
  label,
  field: { name, value, checked, onBlur },
  form: { errors, touched, handleChange },
}) => {
  const helperText = touched[name] ? errors[name] : '';
  return (
    <FormControl
      error={touched[name] && Boolean(errors[name])}
      required={required}
      disabled={disabled}
    >
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            checked={checked}
            className={helperText ? 'mui-checkbox-error' : undefined}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
