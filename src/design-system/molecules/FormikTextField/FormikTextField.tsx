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
  formLabelMarginTop?: number | string;
  helpMessage?: string;
  handleChange: (
    val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void | Promise<void>;
}

export type FormikTextFieldProps = InternalFieldProps & TextFieldProps;

const StyledFormControl = styled(FormControl)`
  margin-top: 1em;
`;

export const StyledTextField = styled(TextField)`
  background-color: #f5f5f5;
  padding: 4px 1em 5px;
  & .MuiInput-root {
    ::before,
    ::after,
    :hover:not(.Mui-disabled):before {
      border-bottom: none;
      border-bottom-color: transparent;
    }
  }
`;

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { touched, errors, handleBlur, handleChange: formikHandleChange },
  field: { value, name },
  handleChange,
  label,
  required,
  helpMessage,
  formLabelMarginTop,
  tooltipProps,
  ...rest
}) => {
  const helperText = touched[name] ? errors[name] : '';
  const theme = useTheme();
  return (
    <StyledFormControl>
      <CustomInputLabel
        shrink
        htmlFor={name}
        label={label}
        theme={theme}
        required={required}
        marginTop={formLabelMarginTop}
        tooltipProps={tooltipProps}
      />
      {helpMessage && <FormHelperText component="span">{helpMessage}</FormHelperText>}
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
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
};
