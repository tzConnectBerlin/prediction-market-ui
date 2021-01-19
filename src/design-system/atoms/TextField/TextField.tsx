import { TextField, TextFieldProps } from '@material-ui/core';
import { FieldProps } from 'formik';
import React from 'react';

export interface InternalFieldProps extends FieldProps {
  handleChange: (
    val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void | Promise<void>;
}

export type FormikTextFieldProps = InternalFieldProps & TextFieldProps;

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { setFieldValue },
  field: { value, name },
  handleChange,
  ...rest
}) => {
  return (
    <TextField
      {...rest}
      name={name}
      value={value}
      onChange={(val) => {
        handleChange && handleChange(val);
        setFieldValue(name, val.target.value);
      }}
    />
  );
};
