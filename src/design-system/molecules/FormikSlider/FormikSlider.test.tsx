import { ThemeProvider } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { render, waitFor, fireEvent } from '@testing-library/react';
import * as Yup from 'yup';
import { FastField, Form, Formik } from 'formik';
import { theme } from '../../../theme';
import { FormikSlider, FormikSliderProps } from './FormikSlider';

const WrappedComponent: React.FC<any> = (args) => (
  <ThemeProvider theme={theme}>
    <Formik initialValues={{ rate: 0.02 }} onSubmit={() => {}}>
      <Form name="slider">
        <FastField component={FormikSlider} {...args} name="rate" />
      </Form>
    </Formik>
  </ThemeProvider>
);

describe('Snapshot - render FormikSlider', () => {
  it('renders correctly with default style', () => {
    const slider = renderer.create(<WrappedComponent value={1} label="Rate" required />).toJSON();
    expect(slider).toMatchSnapshot();
  });
});

describe('Tests - FormikSlider', () => {
  it('renders FormikSlider', async () => {
    const { getByText } = render(<WrappedComponent value={1} label="Rate" />);
    expect(getByText(/Rate/i)).toBeInTheDocument();
  });

  it('renders FormikSlider without TextField', async () => {
    const { getByText } = render(<WrappedComponent value={1} label="Rate" noTextField />);
    expect(getByText(/Rate/i)).toBeInTheDocument();
  });

  it('renders FormikSlider with only value in label', async () => {
    const { getByText } = render(<WrappedComponent value={1} showValueInLabel />);
    waitFor(() => {
      expect(getByText(/1/i)).toBeInTheDocument();
    });
  });

  it('renders FormikSlider with value in label', async () => {
    const { getByText } = render(<WrappedComponent value={1} label="Rate" showValueInLabel />);
    waitFor(() => {
      expect(getByText(/Rate : 1/i)).toBeInTheDocument();
    });
  });

  it('should update the value on change', async () => {
    const { getByTestId, getByText } = render(
      <WrappedComponent value={1} label="Rate" data-testid="slider" showValueInLabel />,
    );
    waitFor(() => {
      const slider = getByTestId('slider');
      fireEvent.change(slider, 25);
      expect(getByText(/Rate : 25/i)).toBeInTheDocument();
    });
  });
});
