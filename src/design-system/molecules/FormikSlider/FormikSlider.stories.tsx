import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Field, Form, Formik } from 'formik';
import { ThemeProvider } from '@material-ui/core';
import { FormikSlider } from './FormikSlider';
import { theme } from '../../../theme';

export default {
  title: 'Molecules/FormikSlider',
  component: FormikSlider,
} as Meta;

const Template: Story = (args) => (
  <ThemeProvider theme={theme}>
    <Formik initialValues={{ rate: 0.02 }} onSubmit={() => {}}>
      <Form name="slider">
        <Field component={FormikSlider} {...args} name="rate" />
      </Form>
    </Formik>
  </ThemeProvider>
);

export const Default = Template.bind({});
Default.args = {
  value: 1,
};

export const Custom = Template.bind({});
Custom.args = {
  color: '#139ba9',
  step: 0.01,
  backgroundColor: '#1dcdde',
  tooltip: 'auto',
  min: 0.0,
  max: 1.0,
  value: 0.02,
};

export const WithMarks = Template.bind({});
WithMarks.args = {
  color: '#139ba9',
  step: 0.01,
  backgroundColor: '#1dcdde',
  tooltip: 'auto',
  min: 0.0,
  max: 1.0,
  marks: [
    {
      value: 0.01,
      label: 'No',
    },
    {
      value: 1.0,
      label: 'Yes',
    },
  ],
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  step: 0.01,
  min: 0.0,
  max: 1.0,
  marks: [
    {
      value: 0.01,
      label: 'No',
    },
    {
      value: 1.0,
      label: 'Yes',
    },
  ],
  label: 'Rate',
  required: true,
};

export const WithoutTextField = Template.bind({});
WithoutTextField.args = {
  step: 0.01,
  min: 0.0,
  max: 1.0,
  marks: [
    {
      value: 0.01,
      label: 'No',
    },
    {
      value: 1.0,
      label: 'Yes',
    },
  ],
  label: 'Rate',
  required: true,
  noTextField: true,
};

export const WithNoLabelForMarks = Template.bind({});
WithLabel.args = {
  step: 0.01,
  min: 0.0,
  max: 1.0,
  marks: [
    {
      value: 0.01,
    },
    {
      value: 1.0,
    },
  ],
  label: 'Rate',
  required: true,
};

export const WithLabelAndValue = Template.bind({});
WithLabelAndValue.args = {
  color: '#139ba9',
  step: 0.01,
  backgroundColor: '#1dcdde',
  tooltip: 'auto',
  min: 0.0,
  max: 1.0,
  showValueInLabel: true,
  marks: [
    {
      value: 0.01,
      label: 'No',
    },
    {
      value: 1.0,
      label: 'Yes',
    },
  ],
  label: 'Rate',
};

export const OnlyValueInLabel = Template.bind({});
OnlyValueInLabel.args = {
  color: '#139ba9',
  step: 0.01,
  backgroundColor: '#1dcdde',
  tooltip: 'auto',
  min: 0.0,
  max: 1.0,
  showValueInLabel: true,
  marks: [
    {
      value: 0.01,
      label: 'No',
    },
    {
      value: 1.0,
      label: 'Yes',
    },
  ],
};
