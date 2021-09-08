import * as React from 'react';
import styled from '@emotion/styled';
import { FormControl, TextField, TextFieldProps, FormHelperText } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { FieldProps } from 'formik';
import { CustomInputChipProps, CustomInputLabel } from '../CustomInputLabel';

interface InternalFieldProps extends FieldProps {
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
  bgColor?: string;
  handleChange: (
    val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void | Promise<void>;
}

interface StyledTextFieldProps {
  backgroundcolor?: string;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledWarningIcon = styled(WarningIcon)`
  height: 0.825rem;
  width: 0.825rem;
  padding-right: 0.5rem;
  margin-top: 0.125rem;
  display: block;
`;

const StyledFormHelperText = styled(FormHelperText)`
  display: flex;
`;

export type FormikTextFieldProps = InternalFieldProps & TextFieldProps & CustomInputChipProps;

const defaultChip = false;
const defaultDisabled = false;

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { errors, handleBlur, handleChange: formikHandleChange },
  field: { value, name },
  handleChange,
  label,
  required,
  helpMessage,
  tooltip,
  tooltipText,
  chip = defaultChip,
  chipText,
  chipIcon,
  chipOnClick,
  disabled = defaultDisabled,
  bgColor,
  children,
  ...rest
}) => {
  const helperText = errors[name] ? errors[name] : '';
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
        chip={chip}
        chipText={chipText}
        chipIcon={chipIcon}
        chipOnClick={chipOnClick}
      />
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
        error={Boolean(errors[name])}
        disabled={disabled}
        backgroundcolor={bgColor}
      >
        {children}
      </StyledTextField>
      {helperText && (
        <StyledFormHelperText variant="standard">
          <StyledWarningIcon />
          {helperText}
        </StyledFormHelperText>
      )}
    </FormControl>
  );
};
