import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MenuItem from '@material-ui/core/MenuItem';
import { GiAlarmClock } from 'react-icons/gi';
import * as Yup from 'yup';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FastField, Formik } from 'formik';
import { FormikTextField, FormikTextFieldProps } from './FormikTextField';

export default {
  title: 'Molecule/FormikTextField',
  component: FormikTextField,
} as Meta;

const CreateQuestionSchema = Yup.object().shape({
  question: Yup.string().min(10, 'must be at least 10 characters').required('Required'),
});

const items = [
  {
    label: 'Open',
    value: 1,
  },
  {
    label: 'Closed',
    value: 2,
  },
  {
    label: 'Investment Phase',
    value: 3,
  },
];

const getMenuItem = () =>
  items.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

const formikProps = {
  initialValues: {
    question: '',
  },
  validationSchema: CreateQuestionSchema,
  onSubmit: () => {},
};

const Template: Story<FormikTextFieldProps> = (args) => (
  <Formik {...formikProps}>
    <FastField component={FormikTextField} {...args} />
  </Formik>
);

export const Default = Template.bind({});

Default.args = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  required: true,
  // eslint-disable-next-line no-console
  handleChange: (val) => console.log(val),
};

export const OptionalField = Template.bind({});

OptionalField.args = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
};

export const WithHelpMessage = Template.bind({});

WithHelpMessage.args = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  helpMessage: 'Question should be of minimum 10 characters',
};

export const WithTooltip = Template.bind({});

WithTooltip.args = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  tooltipProps: {
    text: 'this is a tooltip',
  },
};

export const Disabled = Template.bind({});

Disabled.args = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  disabled: true,
};

export const Select = Template.bind({});

Select.args = {
  id: 'select-field',
  name: 'filter',
  label: 'Market Filter',
  placeholder: 'Select one item',
  select: true,
  children: getMenuItem(),
};

export const WithEndIcon = Template.bind({});

WithEndIcon.args = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  InputProps: {
    endAdornment: (
      <InputAdornment position="start">
        <GiAlarmClock />
      </InputAdornment>
    ),
  },
};

export const WithStartIcon = Template.bind({});

WithStartIcon.args = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  InputProps: {
    startAdornment: (
      <InputAdornment position="end">
        <GiAlarmClock />
      </InputAdornment>
    ),
  },
};
