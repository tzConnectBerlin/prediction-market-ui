import React from 'react';
import * as Yup from 'yup';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Field, Form, Formik } from 'formik';
import { FormikCheckBox, FormikCheckboxProps } from './FormikCheckBox';

export default {
  title: 'Molecule/FormikCheckBox',
  component: FormikCheckBox,
} as Meta;

const CheckboxSchema = Yup.object().shape({
  termsAndConditions: Yup.boolean().test({
    test: (v) => v === true,
    message: 'Required',
  }),
});

const Template: Story<FormikCheckboxProps> = (args) => (
  <Formik
    initialValues={{ termsAndConditions: false }}
    onSubmit={() => {}}
    validationSchema={CheckboxSchema}
  >
    <Form name="checkbox">
      <Field component={FormikCheckBox} {...args} name="termsAndConditions" />
    </Form>
  </Formik>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox label',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Checkbox label',
  disabled: true,
};

export const LabelPlacement = Template.bind({});
LabelPlacement.args = {
  label: 'Checkbox label',
  required: true,
  labelPlacement: 'bottom',
};
