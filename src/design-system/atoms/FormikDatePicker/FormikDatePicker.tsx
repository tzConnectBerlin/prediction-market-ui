import React from 'react';
import { TextField } from '@material-ui/core';
import { DatePicker, DatePickerProps } from '@material-ui/lab';
import { FieldProps } from 'formik';

export type FormikDatePickerProps = DatePickerProps & FieldProps;

export const FormikDatePicker: React.FC<FormikDatePickerProps> = ({
  form: { setFieldValue, touched, errors, setFieldTouched, validateForm },
  field: { value, name },
  ...rest
}) => {
  const currentError = errors[name];
  const toShowError = Boolean(currentError && touched[name]);
  return (
    <DatePicker
      allowKeyboardControl
      clearable
      {...rest}
      value={value}
      onChange={(val) => {
        setFieldValue(name, val, false);
        validateForm();
      }}
      renderInput={(props) => (
        <TextField
          name={name}
          {...props}
          variant="standard"
          error={toShowError}
          helperText={toShowError ? currentError ?? props.helperText : undefined}
          onBlur={() => {
            setFieldTouched(name, true, false);
            validateForm();
          }}
        />
      )}
    />
  );
};
