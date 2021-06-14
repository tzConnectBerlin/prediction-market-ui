import React from 'react';
import styled from '@emotion/styled';
import { TimePicker } from '@atlaskit/datetime-picker';
import { FieldProps } from 'formik';
import { setMinutes, setHours, isValid, format, parse } from 'date-fns';
import { FormControl, Grid, TextField, FormHelperText, Box, useTheme } from '@material-ui/core';
import { DatePicker } from '@material-ui/lab';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';
import { DATETIME_FORMAT } from '../../../utils/globals';

const defaultFormat = DATETIME_FORMAT.INPUT_FORMAT;

const TIMES = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

export interface FormikDateTimePickerProps extends FieldProps {
  showTimezone?: boolean;
  dateFormat?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
  onChange: (date: Date, time: string) => void | Promise<void>;
}

const StyledTimePickerWrapper = styled(Box)<{ selectedOptionColor: string }>`
  padding-top: 0.45rem;
  .react-select__input input {
    min-height: 1.28rem;
  }
  .react-select__option--is-selected {
    background-color: ${(props) => props.selectedOptionColor};
  }
`;

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
  const theme = useTheme();
  const helperText = touched[name] ? errors[name] : '';
  const currentDate = value ?? new Date();
  const [innerDate, setInnerDate] = React.useState(currentDate);
  const [innerTime, setInnerTime] = React.useState(format(currentDate, 'HH:mm'));
  React.useEffect(() => {
    onChange && onChange(innerDate, innerTime);
    const times = innerTime.split(':');
    let date = setHours(innerDate, Number(times[0]));
    date = setMinutes(date, Number(times[1]));
    setFieldValue(name, date, true);
  }, [innerDate, innerTime]);

  const handleTimeChange = (time: string): void => {
    if (!time || time.startsWith('Invalid')) {
      setFieldError(name, 'Invalid Time');
    } else {
      const isValidTime = isValid(parse(time, 'HH:mm', new Date()));
      if (isValidTime) {
        setInnerTime(time);
      } else {
        setFieldError(name, 'Invalid Time');
      }
    }
    setFieldTouched(name, true, true);
  };

  const handleDateChange = (date: string | Date | null): void => {
    let newDate = date;
    if (typeof newDate === 'string') {
      const dateParts = newDate.split('/');
      newDate = `${dateParts[1] ?? 0}/${dateParts[0] ?? 0}/${dateParts[2] ?? 0}`;
    }
    let newDate2 = typeof newDate === 'string' ? new Date(newDate) : newDate;
    if (newDate2 && isValid(newDate2)) {
      const times = innerTime.split(':');
      newDate2 = setHours(newDate2, Number(times[0]));
      newDate2 = setMinutes(newDate2, Number(times[1]));
      setInnerDate(newDate2);
    } else {
      setFieldError(name, 'Invalid date');
    }
    setFieldTouched(name, true, true);
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
        <Grid item xs={12} sm={12} md={6}>
          <DatePicker
            disablePast
            inputFormat={dateFormat}
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
        <Grid item xs={12} sm={12} md={6}>
          <StyledTimePickerWrapper selectedOptionColor={theme.palette.primary.main}>
            <TimePicker
              innerProps={{
                className: 'MuiInput-root MuiInputBase-formControl',
              }}
              times={TIMES}
              value={innerTime}
              spacing="compact"
              timeIsEditable
              defaultValue={innerTime}
              onChange={(val: any) => {
                handleTimeChange(val);
              }}
              selectProps={{
                classNamePrefix: 'react-select',
              }}
            />
          </StyledTimePickerWrapper>
        </Grid>
      </Grid>
      {helperText && <FormHelperText variant="standard">{helperText}</FormHelperText>}
    </FormControl>
  );
};
