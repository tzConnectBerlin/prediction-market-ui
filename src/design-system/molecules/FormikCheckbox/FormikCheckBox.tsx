import * as React from 'react';
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  FormControlLabelProps,
  FormHelperText,
  Theme,
  useTheme,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import styled from '@emotion/styled';

const StyledCheckbox = styled(Checkbox)<{ theme: Theme }>`
  &.MuiButtonBase-root.MuiIconButton-root.Mui-checked {
    color: ${({ theme }) => theme.palette.primary.main};
  }
  &.mui-checkbox-error > span > svg {
    color: ${({ theme }) => theme.palette.warning.main};
  }
`;
export interface FormikCheckboxProps extends FieldProps {
  disabled?: boolean;
  required?: boolean;
  label: FormControlLabelProps['label'];
  labelPlacement?: FormControlLabelProps['labelPlacement'];
}

const defaultPlacement = 'end';
const defaultRequired = false;
const defaultDisabled = false;

export const FormikCheckBox: React.FC<FormikCheckboxProps> = ({
  labelPlacement = defaultPlacement,
  required = defaultRequired,
  disabled = defaultDisabled,
  label,
  field: { name, value, checked, onBlur },
  form: { errors, touched, handleChange },
}) => {
  const helperText = touched[name] ? errors[name] : '';
  const theme = useTheme();
  return (
    <FormControl
      error={touched[name] && Boolean(errors[name])}
      required={required}
      disabled={disabled}
    >
      <FormControlLabel
        control={
          <StyledCheckbox
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            checked={checked}
            theme={theme}
            className={helperText ? 'mui-checkbox-error' : undefined}
          />
        }
        label={label}
        labelPlacement={labelPlacement}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
