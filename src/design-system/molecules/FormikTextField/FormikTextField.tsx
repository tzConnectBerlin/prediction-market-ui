import React from 'react';
import { FormControl, TextField, TextFieldProps, FormHelperText } from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputLabel } from '../CustomInputLabel';

interface InternalFieldProps extends FieldProps {
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
  handleChange: (
    val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void | Promise<void>;
}

export type FormikTextFieldProps = InternalFieldProps & TextFieldProps;

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { touched, errors, handleBlur, handleChange: formikHandleChange },
  field: { value, name },
  handleChange,
  label,
  required,
  helpMessage,
  tooltip,
  tooltipText,
  disabled = false,
  ...rest
}) => {
  const helperText = touched[name] ? errors[name] : '';
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
      />
      <TextField
        {...rest}
        name={name}
        value={value}
        onChange={(val) => {
          formikHandleChange(val);
          handleChange && handleChange(val);
        }}
        onBlur={handleBlur}
        variant="standard"
        error={touched[name] && Boolean(errors[name])}
        disabled={disabled}
      />
      {helperText && <FormHelperText variant="standard">{helperText}</FormHelperText>}
    </FormControl>
  );
};
