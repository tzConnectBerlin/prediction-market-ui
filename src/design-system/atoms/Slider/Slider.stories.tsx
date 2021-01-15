import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Field, Form, Formik } from 'formik';
import { Slider } from './Slider';

export default {
  title: 'Atom/Slider',
  component: Slider,
} as Meta;

const Template: Story = (args) => (
  <Formik initialValues={{ rate: 0.02 }} onSubmit={() => {}}>
    <Form name="slider">
      <Field component={Slider} {...args} name="rate" />
    </Form>
  </Formik>
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
  label: 'Rate',
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
