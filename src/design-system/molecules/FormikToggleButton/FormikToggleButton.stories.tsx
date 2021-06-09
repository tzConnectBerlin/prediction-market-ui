import { Story, Meta } from '@storybook/react/types-6-0';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { FormikToggleButton, FormikToggleButtonProps } from './FormikToggleButton';

export default {
  title: 'Molecule/FormikToggleButton',
  component: FormikToggleButton,
} as Meta;

const OutComePrice = Yup.object().shape({
  outCome: Yup.string().required('Required'),
});

const items = [
  {
    value: 'Yes',
    label: '12$',
  },
  {
    value: 'No',
    label: '8$',
  },
];

const formikProps = {
  initialValues: {
    outCome: '',
  },
  validationSchema: OutComePrice,
  onSubmit: () => {},
};

const Template: Story<FormikToggleButtonProps> = (args) => (
  <Formik {...formikProps}>
    <Field component={FormikToggleButton} {...args} />
  </Formik>
);

export const Default = Template.bind({});
Default.args = {
  label: 'Outcome',
  required: true,
  onChange: (val: any) => console.log(val),
  toggleButtonItems: items,
  value: items[0].value,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Outcome',
  required: true,
  onChange: (val: any) => console.log(val),
  toggleButtonItems: items,
  value: items[0].value,
  disabled: true,
};
