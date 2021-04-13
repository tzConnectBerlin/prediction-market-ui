import { ThemeProvider } from '@material-ui/core';
import { Story, Meta } from '@storybook/react/types-6-0';
import * as Yup from 'yup';
import { FastField, Formik } from 'formik';
import { theme } from '../../../theme';
import { FormikTextField, FormikTextFieldProps } from './FormikTextField';

export default {
  title: 'Molecules/FormikTextField',
  component: FormikTextField,
} as Meta;

const CreateQuestionSchema = Yup.object().shape({
  question: Yup.string().min(10, 'must be at least 10 characters').required('Required'),
});

const formikProps = {
  initialValues: {
    question: '',
  },
  validationSchema: CreateQuestionSchema,
  onSubmit: () => {},
};

const Template: Story<FormikTextFieldProps> = (args) => (
  <ThemeProvider theme={theme}>
    <Formik {...formikProps}>
      <FastField component={FormikTextField} {...args} />
    </Formik>
  </ThemeProvider>
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
  formLabelMarginTop: '-5%',
};