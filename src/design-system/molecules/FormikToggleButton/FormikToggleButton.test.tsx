import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import { FormikToggleButton } from './FormikToggleButton';

const OutComePrice = Yup.object().shape({
  outCome: Yup.string().required('Required'),
});

const items = [
  {
    value: '12$',
    label: 'Yes',
  },
  {
    value: '8$',
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
  label: 'Outcome',
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
    const ToggleButton = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(ToggleButton).toMatchSnapshot();
  });

  it('renders correctly in disabled mode', () => {
    const ToggleButton = renderer.create(<WrappedComponent {...defaultArgs} disabled />).toJSON();
    expect(ToggleButton).toMatchSnapshot();
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
    const component = await findByRole('group');
    // const component = await findByRole('button', { pressed: true });
    act(() => {
      fireEvent.click(component.children[0], { target: { value: 'yes' } });
    });
    expect(defaultArgs.onChange).toBeCalled();
  });
});
