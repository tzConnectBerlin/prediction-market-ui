import { TextField } from '@material-ui/core';
import { DateTimePicker, DateTimePickerProps } from '@material-ui/pickers';
import { FieldProps } from 'formik';
import React from 'react';

export type FormikDateTimePickerProps = DateTimePickerProps & FieldProps;

export const FormikDateTimePicker: React.FC<FormikDateTimePickerProps> = ({
  form: { setFieldValue },
  field: { value, name },
  ...rest
}) => {
  return (
    <DateTimePicker
      {...rest}
      value={value}
      onChange={(val) => setFieldValue(name, val.toISOString())}
      renderInput={(props) => <TextField name={name} {...props} />}
    />
  );
};
