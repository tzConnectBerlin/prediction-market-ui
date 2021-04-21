import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@material-ui/core/styles';
import {
  Slider as MaterialSlider,
  SliderProps as MaterialSliderProps,
  TextFieldProps,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputLabel } from '../CustomInputLabel';
import { StyledTextField } from '../FormikTextField/FormikTextField';
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
      height: 0.5em;
      &.Mui-disabled {
        color: ${({ color }) => color};
        opacity: 0.38;
      }
    }
    &-mark {
      visibility: hidden;
    }
    &-rail {
      height: 0.375em;
      border-radius: 0.25em;
    }
    &-track {
      height: 0.375em;
      border-radius: 0.25em;
    }
    &-valueLabel {
      left: calc(-72%);
    }
    &-thumb {
      height: 1em;
      width: 1em;
      background-color: ${({ backgroundColor }) => backgroundColor};
      border: 0.125em solid currentColor;
      margin-top: -0.35em;
      margin-left: -0.75em;
      &.Mui-disabled {
        height: 1em;
        width: 1em;
        background-color: ${({ backgroundColor }) => backgroundColor};
        border: 0.125em solid currentColor;
        margin-top: -0.35em;
        margin-left: -0.75em;
      }
    }
  }
`;

const SliderTextField = styled(StyledTextField)`
  width: calc(100vw - 4em);
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
          marginTop="0"
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
        <SliderTextField
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
