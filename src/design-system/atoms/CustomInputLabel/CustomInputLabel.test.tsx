import renderer from 'react-test-renderer';
import { render, waitFor } from '@testing-library/react';
import { theme } from '../../../theme';
import { CustomInputLabelProps, CustomInputLabel } from './CustomInputLabel';

const onlyRequiredProps: CustomInputLabelProps = {
  label: 'Create a question',
};

const defaultProps: CustomInputLabelProps = {
  ...onlyRequiredProps,
  marginTop: '1%',
  theme,
};

describe('Snapshot testing CustomInputLabel Component', () => {
  it('renders correctly with default props', () => {
    const inputLabel = renderer.create(<CustomInputLabel {...defaultProps} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });

  it('renders correctly when theme not provided', () => {
    const inputLabel = renderer.create(<CustomInputLabel {...onlyRequiredProps} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });
});

describe('Element testing CustomInputLabel Component', () => {
  it('render correctly CustomInputLabel with default props', async () => {
    const { findByText } = render(<CustomInputLabel {...defaultProps} />);

    waitFor(() => {
      expect(findByText(/Create a question/i)).toBeInTheDocument();
    });
  });

  it('render correctly CustomInputLabel with only required props', async () => {
    const { findByText } = render(<CustomInputLabel {...defaultProps} />);

    waitFor(() => {
      expect(findByText(/Create a question/i)).toBeInTheDocument();
    });
  });
});
