import React from 'react';
import styled from '@emotion/styled';
import {
  FormControl,
  TextField,
  TextFieldProps,
  FormHelperText,
  useTheme,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputLabel } from '../CustomInputLabel';
import { CustomTooltipProps } from '../../atoms/CustomTooltip/CustomTooltip';

interface InternalFieldProps extends FieldProps {
  tooltipProps?: CustomTooltipProps;
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
  tooltipProps,
  ...rest
}) => {
  const helperText = touched[name] ? errors[name] : '';
  const theme = useTheme();
  return (
    <FormControl>
      <CustomInputLabel
        shrink
        htmlFor={name}
        label={label}
        required={required}
        tooltipProps={tooltipProps}
      />
      {helpMessage && (
        <FormHelperText component="span" variant="standard">
          {helpMessage}
        </FormHelperText>
      )}
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
      />
      {helperText && <FormHelperText variant="standard">{helperText}</FormHelperText>}
    </FormControl>
  );
};
