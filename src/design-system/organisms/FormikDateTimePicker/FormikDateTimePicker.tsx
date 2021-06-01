import React from 'react';
import { FieldProps } from 'formik';
import { setMinutes, setHours, getMinutes, getHours, isValid, addHours } from 'date-fns';
import { FormControl, Grid, TextField, FormHelperText } from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/lab';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';
import { DATETIME_FORMAT } from '../../../utils/globals';

const defaultFormat = DATETIME_FORMAT.INPUT_FORMAT;

export interface FormikDateTimePickerProps extends FieldProps {
  showTimezone?: boolean;
  dateFormat?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
  onChange: (date: Date, time: Date) => void | Promise<void>;
}

export const FormikDateTimePicker: React.FC<FormikDateTimePickerProps> = ({
  form: { touched, errors, setFieldValue, setFieldError, setFieldTouched },
  field: { value, name },
  onChange,
  label,
  required,
  helpMessage,
  tooltip,
  tooltipText,
  disabled = false,
  dateFormat = defaultFormat,
}) => {
  const helperText = touched[name] ? errors[name] : '';
  const currentDate = value ?? new Date();
  const [innerDate, setInnerDate] = React.useState(currentDate);
  const [innerTime, setInnerTime] = React.useState(currentDate);
  React.useEffect(() => {
    onChange && onChange(innerDate, innerTime);
    let date = setHours(innerDate, getHours(innerTime));
    date = setMinutes(innerDate, getMinutes(innerTime));
    setFieldValue(name, date, true);
  }, [innerDate, innerTime]);

  const handleTimeChange = (date: Date | null): void => {
    if (date && isValid(date)) {
      setInnerTime(date);
    } else {
      setFieldError(name, 'Invalid time');
    }
    setFieldTouched(name, true, true);
  };

  const handleDateChange = (date: string | Date | null): void => {
    let newDate = date;
    if (typeof newDate === 'string') {
      const dateParts = newDate.split('/');
      newDate = `${dateParts[1] ?? 0}/${dateParts[0] ?? 0}/${dateParts[2] ?? 0}`;
    }
    if (newDate && isValid(typeof newDate === 'string' ? new Date(newDate) : newDate)) {
      setInnerDate(typeof newDate === 'string' ? new Date(newDate) : newDate);
    } else {
      setFieldError(name, 'Invalid date');
    }
    setFieldTouched(name, true, true);
  };

  const handleTimeBlur = (timeString: string | null) => {
    if (timeString) {
      const time = timeString.split(':');
      const hours = Number(time[0]) ?? 0;
      const minParts = time[1].split(' ');
      const min = Number(minParts[0]) ?? 0;
      let date = new Date();
      date = setMinutes(date, min);
      date = setHours(date, hours);
      if (minParts[1].toLowerCase() === 'am') {
        handleTimeChange(date);
      } else if (minParts[1].toLowerCase() === 'pm') {
        date = addHours(date, 12);
        handleTimeChange(date);
      } else {
        handleTimeChange(null);
      }
    } else {
      handleTimeChange(null);
    }
  };

  return (
    <FormControl>
      <CustomInputLabel
        shrink
        htmlFor={name}
        label={label}
        required={required}
        helpMessage={helpMessage}
        tooltipText={tooltipText}
        tooltip={tooltip}
        disabled={disabled}
      />
      <Grid container spacing={1}>
        <Grid item xs={6} sm={6} md={6}>
          <DatePicker
            disablePast
            inputFormat={dateFormat}
            allowKeyboardControl
            clearable
            value={value}
            onChange={handleDateChange}
            renderInput={(props) => (
              <TextField
                {...props}
                variant="standard"
                onBlur={(e) => {
                  handleDateChange(e.currentTarget.value);
                }}
                helperText={null}
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <TimePicker
            allowKeyboardControl
            clearable
            value={value}
            onChange={(val: any) => {
              handleTimeChange(val);
            }}
            renderInput={(props) => (
              <TextField
                {...props}
                variant="standard"
                helperText={null}
                onBlur={(e) => {
                  handleTimeBlur(e.target.value);
                }}
              />
            )}
          />
        </Grid>
      </Grid>
      {helperText && <FormHelperText variant="standard">{helperText}</FormHelperText>}
    </FormControl>
  );
};
