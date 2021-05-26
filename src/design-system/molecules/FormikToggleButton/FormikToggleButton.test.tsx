import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import { lightTheme as theme } from '../../../theme';
import { FormikToggleButton } from './FormikToggleButton';

const OutComePrice = Yup.object().shape({
  outCome: Yup.string().required('Required'),
});

const items = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
  },
];

const formikProps = {
  initialValues: {
    outCome: '',
  },
  validationSchema: OutComePrice,
  onSubmit: () => {},
};

const baseArgs = {
  label: 'OutCome',
  required: true,
  toggleButtonItems: items,
  value: items[0].value,
};

const defaultArgs = {
  ...baseArgs,
  onChange: jest.fn(),
};

const WrappedComponent: React.FC<any> = (props) => (
  <Formik {...formikProps}>
    <Form>
      <FastField component={FormikToggleButton} {...props} />
    </Form>
  </Formik>
);

describe('Snapshot - render FormikToggleButton', () => {
  it('renders correctly with default props', () => {
    const inputLabel = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });

  it('renders correctly in disabled mode', () => {
    const inputLabel = renderer.create(<WrappedComponent {...defaultArgs} disabled />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });
});

describe('Element testing FormikToggleButton Component', () => {
  it('render correctly FormikToggleButton with default props', async () => {
    const { getByText } = render(<WrappedComponent {...defaultArgs} />);

    expect(getByText(/Yes/i)).toBeInTheDocument();
    expect(getByText(/No/i)).toBeInTheDocument();
  });

  it('check onChange gets called', async () => {
    const { findByRole } = render(<WrappedComponent {...defaultArgs} />);
    const component = await findByRole('button', { pressed: true });
    act(() => {
      fireEvent.click(component, { target: { value: 'yes' } });
    });
    expect(defaultArgs.onChange).toBeCalled();
  });
});
