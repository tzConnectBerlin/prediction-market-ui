import { ThemeProvider } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { lightTheme as theme } from '../../../theme';
import { FormikCheckBox } from './FormikCheckBox';

const CheckboxSchema = Yup.object().shape({
  termsAndConditions: Yup.boolean().test({
    test: (v) => v === true,
    message: 'Required',
  }),
});

const WrappedComponent: React.FC<any> = (args) => (
  <ThemeProvider theme={theme}>
    <Formik
      initialValues={{ termsAndConditions: false }}
      onSubmit={() => {}}
      validationSchema={CheckboxSchema}
    >
      <Form name="checkbox">
        <FastField component={FormikCheckBox} {...args} name="termsAndConditions" />
      </Form>
    </Formik>
  </ThemeProvider>
);

describe('Snapshot - render FormikCheckBox', () => {
  it('renders correctly with default style', () => {
    const checkbox = renderer.create(<WrappedComponent label="Checkbox" required />).toJSON();
    expect(checkbox).toMatchSnapshot();
  });
});

describe('Element testing FormikCheckBox Component', () => {
  it('render correctly FormikCheckBox with default props', async () => {
    const { getByText } = render(<WrappedComponent label="Checkbox" />);

    expect(getByText(/Checkbox/i)).toBeInTheDocument();
  });

  it('check if component is selected', async () => {
    const { getByTestId, getByText } = render(<WrappedComponent label="Checkbox" />);
    expect(getByTestId(/CheckBoxOutlineBlankIcon/i)).toBeInTheDocument();
    const label = getByText(/Checkbox/i);
    fireEvent.click(label);
    expect(getByTestId(/CheckBoxIcon/i)).toBeInTheDocument();
  });
});
