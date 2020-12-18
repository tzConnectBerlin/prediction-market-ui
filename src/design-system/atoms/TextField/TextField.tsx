import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldProps } from 'formik';
import React from 'react';

export type FormikTextFieldProps = FieldProps & TextFieldProps;

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { setFieldValue },
  field: { value, name },
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      name={name}
      value={value}
      onChange={(val) => {
        setFieldValue(name, val.target.value);
      }}
    />
  );
};
