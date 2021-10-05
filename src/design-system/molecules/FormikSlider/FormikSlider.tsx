import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import {
  Slider as MaterialSlider,
  SliderProps as MaterialSliderProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { FieldProps } from 'formik';
import { CustomInputLabel } from '../CustomInputLabel';

interface SliderWrapperProps {
  color?: string;
  backgroundColor?: string;
}

const SliderWrapper = styled.div<SliderWrapperProps>`
  width: 100%;
  & .MuiSlider {
    &-root {
      color: ${({ color }) => color};
      height: 0.5em;
      &.Mui-disabled {
        color: ${({ color }) => color};
        opacity: 0.38;
      }
    }
    &-thumb {
      height: 1em;
      width: 1em;
      border: 0.125em solid currentColor;
      &.Mui-disabled {
        height: 1em;
        width: 1em;
        border: 0.125em solid currentColor;
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
      line-height: 1.2;
      font-size: 0.75rem;
      background: unset;
      padding: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 50% 50% 50% 0;
      background-color: ${({ color }) => color};
      transform-origin: bottom left;
      transform: translate(50%, -100%) rotate(-45deg) scale(0);
      &:before {
        display: none;
      }
      &.MuiSlider-valueLabelOpen {
        transform: translate(50%, -100%) rotate(-45deg) scale(1);
      }
      & > * {
        transform: rotate(45deg);
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
  tooltipText?: string;
  helpMessage?: string;
}

const defaultBackground = '#fffff';
const defaultMin = 1;
const defaultMax = 100;
const defaultStep = 1;
const defaultTooltip = 'off';
const defaultRequired = false;
const defaultDisabled = false;
const defaultNoTextField = false;

export const FormikSlider: React.FC<FormikSliderProps> = ({
  color,
  backgroundColor = defaultBackground,
  min = defaultMin,
  max = defaultMax,
  step = defaultStep,
  tooltip = defaultTooltip,
  field: { name, value },
  marks,
  label,
  showValueInLabel,
  required = defaultRequired,
  disabled = defaultDisabled,
  noTextField = defaultNoTextField,
  form: { setFieldValue },
  textFieldInputProps,
  tooltipText,
  helpMessage,
  ...rest
}) => {
  const theme = useTheme();
  const sliderColor = color ?? theme.palette.primary.main;
  const [fieldValue, setValue] = React.useState(value ?? '');
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
          helpMessage={helpMessage}
          tooltipText={tooltipText}
          tooltip={!!tooltipText}
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
          margin="normal"
          variant="standard"
          value={fieldValue}
          onChange={handleTextFieldChange}
          onBlur={handleTextFieldChange}
          disabled={disabled}
          InputProps={textFieldInputProps}
          type="number"
        />
      )}
    </SliderWrapper>
  );
};
