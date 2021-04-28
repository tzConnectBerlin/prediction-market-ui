import { TextField } from '@material-ui/core';
import { TimePicker, TimePickerProps } from '@material-ui/lab';
import { FieldProps } from 'formik';
import React from 'react';

export type FormikTimePickerProps = TimePickerProps & FieldProps;

export const FormikTimePicker: React.FC<FormikTimePickerProps> = ({
  form: { setFieldValue, touched, errors, setFieldTouched, validateForm },
  field: { value, name },
  ...rest
}) => {
  const currentError = errors[name];
  const toShowError = Boolean(currentError && touched[name]);
  return (
    <TimePicker
      allowKeyboardControl
      clearable
      {...rest}
      value={value}
      onChange={(val) => {
        console.log(val);
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
          onBlur={(e) => {
            setFieldTouched(name, true, false);
            validateForm();
          }}
        />
      )}
    />
  );
};
