import { ThemeProvider } from '@material-ui/core';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { FastField, Form, Formik } from 'formik';
import React from 'react';
import { theme } from '../../../theme';
import { FormikSlider } from './FormikSlider';

const WrappedComponent: React.FC<any> = (args) => (
  <ThemeProvider theme={theme}>
    <Formik initialValues={{ rate: args.value }} onSubmit={() => {}}>
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
    render(<WrappedComponent value={1} label="Rate" />);
    expect(await screen.findByText(/Rate/i)).toBeInTheDocument();
  });

  it('renders FormikSlider without TextField', async () => {
    const { getByText } = render(<WrappedComponent value={1} label="Rate" noTextField />);
    let item;
    act(() => {
      item = getByText(/Rate/i);
    });
    expect(item).toBeInTheDocument();
  });

  it('renders FormikSlider with only value in label', async () => {
    const { getByText } = render(<WrappedComponent value={1} showValueInLabel />);
    let item;
    act(() => {
      item = getByText(/1/i);
    });
    expect(item).toBeInTheDocument();
  });

  it('renders FormikSlider with value in label', async () => {
    const { getByText } = render(<WrappedComponent value={1} label="Rate" showValueInLabel />);
    let item;
    act(() => {
      item = getByText(/Rate : 1/i);
    });
    expect(item).toBeInTheDocument();
  });

  it('should update the value on change or blur', async () => {
    const myInitialState = 1;
    const setValueMock = jest.fn();
    React.useState = jest.fn().mockReturnValue([myInitialState, setValueMock]);
    const { getByTestId } = render(
      <WrappedComponent
        value={myInitialState}
        label="Rate"
        data-testid="slider"
        showValueInLabel
        role="slider"
      />,
    );
    const slider = getByTestId('slider');
    const textField = slider.nextSibling as HTMLElement;
    const sliderInput = slider.querySelector('input');
    if (sliderInput) {
      fireEvent.change(sliderInput, { target: { value: 25 } });
      sliderInput.focus();
      fireEvent.focusOut(sliderInput);
    }
    if (textField) {
      const input = textField.querySelector('input');
      if (input) {
        fireEvent.change(input, { target: { value: 25 } });
      }
    }
    expect(setValueMock).toHaveBeenCalledWith('25');
    expect(setValueMock).toHaveBeenCalledTimes(3);
  });
});
