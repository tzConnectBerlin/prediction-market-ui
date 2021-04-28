import React from 'react';
import styled from '@emotion/styled';
import { FormControl, TextField, TextFieldProps, FormHelperText } from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputLabel } from '../CustomInputLabel';
import { CustomTooltipProps } from '../../atoms/CustomTooltip/CustomTooltip';

interface InternalFieldProps extends FieldProps {
  tooltipProps?: CustomTooltipProps;
  helpMessage?: string;
  bgColor?: string;
  handleChange: (
    val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void | Promise<void>;
}

interface StyledTextFieldProps {
  backgroundColor?: string;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export type FormikTextFieldProps = InternalFieldProps & TextFieldProps;

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { touched, errors, handleBlur, handleChange: formikHandleChange },
  field: { value, name },
  handleChange,
  label,
  required,
  helpMessage,
  tooltipProps,
  disabled = false,
  bgColor,
  children,
  ...rest
}) => {
  const helperText = touched[name] ? errors[name] : '';

  return (
    <FormControl>
      {label && (
        <CustomInputLabel
          shrink
          htmlFor={name}
          label={label}
          required={required}
          tooltipProps={tooltipProps}
          disabled={disabled}
        />
      )}
      {helpMessage && (
        <FormHelperText component="span" variant="standard">
          {helpMessage}
        </FormHelperText>
      )}
      <StyledTextField
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
        backgroundColor={bgColor}
      >
        {children}
      </StyledTextField>
      {helperText && <FormHelperText variant="standard">{helperText}</FormHelperText>}
    </FormControl>
  );
};
