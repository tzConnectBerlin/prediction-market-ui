import * as React from 'react';
import { InputAdornment, MenuItem, ThemeProvider } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { render, fireEvent, act } from '@testing-library/react';
import { GiAlarmClock } from 'react-icons/gi';
import userEvent from '@testing-library/user-event';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import { lightTheme as theme } from '../../../theme';
import { FormikTextField } from './FormikTextField';

const CreateQuestionSchema = Yup.object().shape({
  question: Yup.string().min(10, 'must be at least 10 characters').required('Required'),
  amount: Yup.number().optional(),
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

const baseArgs = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  required: true,
};

const defaultArgs = {
  ...baseArgs,
  handleChange: jest.fn(),
};

const dropdownArgs = {
  ...baseArgs,
  handleChange: jest.fn(),
  select: true,
  children: getMenuItem(),
};

const iconArgs = {
  ...baseArgs,
  handleChange: jest.fn(),
  InputProps: {
    startAdornment: (
      <InputAdornment position="end">
        <GiAlarmClock />
      </InputAdornment>
    ),
  },
};

const WrappedComponent: React.FC<any> = (props) => (
  <ThemeProvider theme={theme}>
    <Formik {...formikProps}>
      <Form>
        <FastField component={FormikTextField} {...props} />
        <FastField
          component={FormikTextField}
          name="amount"
          id="amount"
          label="Amount"
          placeholder="Enter Amount"
        />
      </Form>
    </Formik>
  </ThemeProvider>
);

describe('Snapshot - render FormikTextField', () => {
  it('renders correctly with default props', () => {
    const inputLabel = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });

  it('renders correctly in dropdown mode', () => {
    const inputLabel = renderer.create(<WrappedComponent {...dropdownArgs} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });

  it('renders correctly with icon', () => {
    const inputLabel = renderer.create(<WrappedComponent {...iconArgs} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });
});

describe('Element testing FormikTextField Component', () => {
  it('render correctly FormikTextField with default props', async () => {
    const { getByText } = render(<WrappedComponent {...defaultArgs} />);

    expect(getByText(/Enter a question/i)).toBeInTheDocument();
  });

  it('render correctly FormikTextField with help message', async () => {
    const { getByText } = render(
      <WrappedComponent {...defaultArgs} helpMessage="Help message example" />,
    );

    expect(getByText(/Enter a question/i)).toBeInTheDocument();
  });

  it('check handleChange gets called', async () => {
    const { findByPlaceholderText } = render(<WrappedComponent {...defaultArgs} />);
    const component = await findByPlaceholderText(/Type here/i);
    act(() => {
      fireEvent.change(component, { target: { value: 'a' } });
    });
    expect(defaultArgs.handleChange).toBeCalled();
  });

  it('check handleChange is not called when not passed', async () => {
    const { findByPlaceholderText } = render(<WrappedComponent {...baseArgs} />);
    const component = await findByPlaceholderText(/Type here/i);
    act(() => {
      fireEvent.change(component, { target: { value: 'a' } });
    });
    expect(defaultArgs.handleChange).toBeCalledTimes(0);
  });

  it('triggers error for required field', async () => {
    const { getByPlaceholderText, findByText } = render(<WrappedComponent {...defaultArgs} />);
    const component = getByPlaceholderText(/Type here/i);
    userEvent.type(component, 'aa');
    fireEvent.focusOut(component);
    const error = await findByText(/must be at least 10 characters/i);
    expect(error).toBeInTheDocument();
  });

  it('does not triggers error for optional field', async () => {
    const { findByPlaceholderText, queryByText } = render(<WrappedComponent {...defaultArgs} />);
    const component = await findByPlaceholderText(/Enter Amount/i);
    fireEvent.focus(component);
    fireEvent.focusOut(component);
    expect(queryByText(/Required/i)).toBeNull();
  });

  it('dropdown mode', () => {
    const { getByTestId } = render(<WrappedComponent {...dropdownArgs} />);
    expect(getByTestId(/ArrowDropDownIcon/i)).toBeInTheDocument();
  });
});
