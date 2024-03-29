import * as React from 'react';
import styled from '@emotion/styled';
import { FormControl, TextField, TextFieldProps, FormHelperText } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import { FieldProps } from 'formik';
import { CustomInputChipProps, CustomInputLabel } from '../CustomInputLabel';

interface InternalFieldProps extends FieldProps {
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
  alignright?: boolean;
  hasBorder?: boolean;
  margintop?: string;
  marginbottom?: string;
  bgColor?: string;
  handleChange: (
    val: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void | Promise<void>;
}

interface StyledTextFieldProps {
  backgroundcolor?: string;
  alignright?: boolean;
  margintop?: string;
  marginbottom?: string;
}

const StyledTextField = styled(TextField)<StyledTextFieldProps>`
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  margin-top: ${({ margintop }) => margintop || '0.5rem'};
  margin-bottom: ${({ marginbottom }) => marginbottom || '0.5rem'};
  & input {
    text-align: ${({ alignright }) => (alignright ? 'end' : 'inherit')};
  }
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
const defaultAlign = false;

export const FormikTextField: React.FC<FormikTextFieldProps> = ({
  form: { errors, handleBlur, handleChange: formikHandleChange, touched },
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
  alignright = defaultAlign,
  margintop,
  marginbottom,
  ...rest
}) => {
  const hasError = Boolean(errors[name] && touched[name]);
  const helperText = hasError ? errors[name] : '';
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
        margintop={margintop}
        marginbottom={marginbottom}
        alignright={alignright}
        name={name}
        value={value}
        onChange={(val) => {
          formikHandleChange(val);
          handleChange && handleChange(val);
        }}
        onBlur={handleBlur}
        variant="standard"
        error={hasError}
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
