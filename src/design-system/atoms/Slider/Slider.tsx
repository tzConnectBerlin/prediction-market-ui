import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  Slider as MaterialSlider,
  SliderProps as MaterialSliderProps,
} from '@material-ui/core';
import { FieldProps } from 'formik';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300 + Number(theme.spacing(3)) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

export interface SliderProps extends FieldProps {
  color?: string;
  backgroundColor?: string;
  step?: number;
  min?: number;
  max?: number;
  tooltip?: MaterialSliderProps['valueLabelDisplay'];
  marks?: MaterialSliderProps['marks'];
  label?: string;
  showValueInLabel?: boolean;
}

const getSlider = (color: string, backgroundColor: string) =>
  withStyles({
    root: {
      color,
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor,
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
    mark: {
      visibility: 'hidden',
    },
  })(MaterialSlider);

export const Slider: React.FC<SliderProps> = ({
  color = '#52af77',
  backgroundColor = '#fffff',
  min = 1,
  max = 100,
  step = 1,
  tooltip = 'on',
  field,
  marks,
  label,
  showValueInLabel,
}) => {
  const classes = useStyles();
  const PrettoSlider = getSlider(color, backgroundColor);
  const labelValue =
    // eslint-disable-next-line no-nested-ternary
    showValueInLabel && label
      ? `${label} : ${field.value}`
      : showValueInLabel && !label
      ? field.value
      : undefined;
  const sliderLabel = labelValue || label || undefined;
  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      {sliderLabel && <InputLabel htmlFor={field.name}>{`${sliderLabel}`}</InputLabel>}
      <PrettoSlider
        valueLabelDisplay={tooltip}
        aria-label="slider"
        defaultValue={field.value}
        step={step}
        min={min}
        max={max}
        marks={marks}
        name={field.name}
        onChangeCommitted={(e, value) => {
          field.onChange({
            ...e,
            target: {
              ...e.target,
              name: field.name,
              value,
            },
          });
        }}
        onBlur={(e) => {
          field.onBlur({
            ...e,
            target: {
              ...e.target,
              name: field.name,
            },
          });
        }}
      />
    </div>
  );
};
