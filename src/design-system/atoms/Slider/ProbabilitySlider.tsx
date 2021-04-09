import React from 'react';
import { withStyles, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  InputLabel,
  Grid,
  Slider as MaterialSlider,
  SliderProps as MaterialSliderProps,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import { Typography } from '../Typography';
import { roundToTwo } from '../../../utils/math';

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
  isPercentage?: boolean;
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
}) => {
  const classes = useStyles();
  const PrettoSlider = getSlider(color, backgroundColor);
  const yesValue = field.value;
  const noValue = roundToTwo(100 - field.value);
  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      {label && <InputLabel htmlFor={field.name}>{label}</InputLabel>}
      <Grid container alignItems="self-start">
        <Grid item xs={6}>
          <Typography size="subtitle1">{`${noValue}%`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="row-reverse">
            <Grid item>
              <Typography size="subtitle1">{`${yesValue}%`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
