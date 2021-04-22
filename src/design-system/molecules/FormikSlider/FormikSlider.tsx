import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core/styles';
import {
  Slider as MaterialSlider,
  SliderProps as MaterialSliderProps,
  TextField,
  TextFieldProps,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputLabel } from '../CustomInputLabel';
import { CustomTooltipProps } from '../../atoms/CustomTooltip';

interface SliderWrapperProps {
  color?: string;
  backgroundColor?: string;
}

const SliderWrapper = styled.div<SliderWrapperProps>`
  width: 100%;
  margin-top: 2rem;
  & .MuiSlider {
    &-root {
      color: ${({ color }) => color};
      &.Mui-disabled {
        color: ${({ color }) => color};
      }
    }
    &-thumb {
      background-color: ${({ backgroundColor }) => backgroundColor};
      &.Mui-disabled {
        background-color: ${({ backgroundColor }) => backgroundColor};
      }
    }
  }
`;

export interface FormikSliderProps extends FieldProps {
  color?: string;
  backgroundColor?: string;
  step?: number;
  min?: number;
  max?: number;
  tooltip?: MaterialSliderProps['valueLabelDisplay'];
  marks?: MaterialSliderProps['marks'];
  label?: string;
  showValueInLabel?: boolean;
  required?: boolean;
  noTextField?: boolean;
  disabled?: boolean;
  textFieldInputProps?: TextFieldProps['InputProps'];
  tooltipProps?: CustomTooltipProps;
}

export const FormikSlider: React.FC<FormikSliderProps> = ({
  color,
  backgroundColor = '#fffff',
  min = 1,
  max = 100,
  step = 1,
  tooltip = 'off',
  field: { name, value },
  marks,
  label,
  showValueInLabel,
  required = false,
  disabled = false,
  noTextField = false,
  form: { setFieldValue },
  textFieldInputProps,
  tooltipProps,
  ...rest
}) => {
  const theme = useTheme();
  const sliderColor = color ?? theme.palette.primary.main;
  const [fieldValue, setValue] = React.useState(value);
  useEffect(() => {
    setFieldValue(name, fieldValue);
  }, [fieldValue, name, setFieldValue]);
  const labelValue =
    // eslint-disable-next-line no-nested-ternary
    showValueInLabel && label
      ? `${label} : ${fieldValue}`
      : showValueInLabel && !label
      ? fieldValue
      : undefined;
  const sliderLabel = labelValue ?? label;

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!Number.isNaN(e.target.value)) {
      setValue(e.target.value);
    }
  };

  return (
    <SliderWrapper color={sliderColor} backgroundColor={backgroundColor}>
      {sliderLabel && (
        <CustomInputLabel
          label={sliderLabel}
          required={required}
          disabled={disabled}
          tooltipProps={tooltipProps}
        />
      )}
      <MaterialSlider
        valueLabelDisplay={tooltip}
        defaultValue={fieldValue}
        value={fieldValue}
        step={step}
        min={min}
        max={max}
        marks={marks}
        name={name}
        onChange={(e, v) => {
          setValue(v);
        }}
        onBlur={(e: any) => {
          handleTextFieldChange(e);
        }}
        disabled={disabled}
        {...rest}
      />
      {!noTextField && (
        <TextField
          variant="standard"
          value={fieldValue}
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldChange}
          disabled={disabled}
          InputProps={textFieldInputProps}
        />
      )}
    </SliderWrapper>
  );
};
