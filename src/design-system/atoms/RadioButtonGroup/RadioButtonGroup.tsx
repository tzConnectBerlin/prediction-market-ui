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
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  form: { setFieldValue },
  field: { value, name },
  values,
  labelPlacement = 'top',
  title,
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
