import { ThemeProvider } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import * as Yup from 'yup';
import { FastField, Formik } from 'formik';
import { theme } from '../../../../theme';
import { FormikTextField } from '../FormikTextField';

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

const defaultArgs = {
  id: 'question-field',
  name: 'question',
  label: 'Enter a question',
  placeholder: 'Type here',
  required: true,
  handleChange: jest.fn(),
};

const WrappedComponent: React.FC<any> = (props) => (
  <ThemeProvider theme={theme}>
    <Formik {...formikProps}>
      <FastField component={FormikTextField} {...props} />
    </Formik>
  </ThemeProvider>
);

describe('Snapshot - render FormikTextField', () => {
  it('renders correctly with default props', () => {
    const inputLabel = renderer.create(<WrappedComponent {...defaultArgs} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });
});

describe('Element testing FormikTextField Component', () => {
  it('render correctly FormikTextField with default props', async () => {
    const { findByText } = render(<WrappedComponent {...defaultArgs} />);

    waitFor(() => {
      expect(findByText(/Enter a question/i)).toBeInTheDocument();
    });
  });

  it('render correctly FormikTextField with help message', async () => {
    const { findByText } = render(
      <WrappedComponent
        {...defaultArgs}
        helpMessage="Help message example"
        formLabelMarginTop="-5%"
      />,
    );

    waitFor(() => {
      expect(findByText(/Enter a question/i)).toBeInTheDocument();
    });
  });

  it('check handleChange gets called', async () => {
    const { findByPlaceholderText } = render(<WrappedComponent {...defaultArgs} />);
    waitFor(async () => {
      const component = await findByPlaceholderText(/Type here/i);
      fireEvent.change(component, { target: { value: 'a' } });
      expect(defaultArgs.handleChange).toBeCalled();
    });
  });

  it('triggers error', async () => {
    const { findByPlaceholderText, findByText } = render(<WrappedComponent {...defaultArgs} />);
    waitFor(async () => {
      const component = await findByPlaceholderText(/Type here/i);
      fireEvent.focus(component);
      fireEvent.focusOut(component);
      expect(findByText(/Required/i)).toBeInTheDocument();
    });
  });
});
