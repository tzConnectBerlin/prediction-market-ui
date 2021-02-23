import {
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
  FormLabel,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import React, { ChangeEvent } from 'react';

export interface RadioButtonField {
  fieldValue: string;
  fieldLabel: string;
}

export interface RadioButtonGroupProps extends RadioGroupProps, FieldProps {
  labelPlacement?: FormControlLabelProps['labelPlacement'];
  values: RadioButtonField[];
  title?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, val: string) => void | Promise<void>;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  form: { setFieldValue, validateForm },
  field: { value, name },
  values,
  labelPlacement = 'top',
  title,
  onChange,
  ...rest
}) => {
  return (
    <>
      {title && <FormLabel component="legend">{title}</FormLabel>}
      <RadioGroup
        {...rest}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>, val: string) => {
          setFieldValue(name, val);
          onChange && onChange(event, val);
          validateForm();
        }}
      >
        {values.map(({ fieldLabel, fieldValue }) => {
          return (
            <FormControlLabel
              key={fieldValue}
              value={fieldValue}
              control={<Radio />}
              label={fieldLabel}
              labelPlacement={labelPlacement}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};
