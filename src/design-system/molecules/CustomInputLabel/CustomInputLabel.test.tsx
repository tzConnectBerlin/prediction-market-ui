import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { CustomInputLabelProps, CustomInputLabel } from './CustomInputLabel';
import { lightTheme as theme } from '../../../styles/theme';

const onlyRequiredProps: CustomInputLabelProps = {
  label: 'Create a question',
};

const defaultProps: CustomInputLabelProps = {
  ...onlyRequiredProps,
};

const WrappedComponent: React.FC = (args: any) => (
  <ThemeProvider theme={theme}>
    <CustomInputLabel {...args} />
  </ThemeProvider>
);

describe('Snapshot testing CustomInputLabel Component', () => {
  it('renders correctly with default props', () => {
    const inputLabel = renderer.create(<WrappedComponent {...defaultProps} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });

  it('renders correctly with only required props', () => {
    const inputLabel = renderer.create(<WrappedComponent {...onlyRequiredProps} />).toJSON();
    expect(inputLabel).toMatchSnapshot();
  });

  it('renders correctly with tooltip', () => {
    const inputLabel = renderer
      .create(<WrappedComponent tooltip tooltipText="tooltip" {...defaultProps} />)
      .toJSON();
    expect(inputLabel).toMatchSnapshot();
  });
});

describe('Element testing CustomInputLabel Component', () => {
  it('render correctly CustomInputLabel with default props', async () => {
    const { getByText } = render(<WrappedComponent {...defaultProps} />);
    expect(getByText(/Create a question/i)).toBeInTheDocument();
  });

  it('render correctly CustomInputLabel with only required props', async () => {
    const { getByText } = render(<WrappedComponent {...defaultProps} />);
    expect(getByText(/Create a question/i)).toBeInTheDocument();
  });

  it('render without theme provider', async () => {
    const { getByText } = render(<CustomInputLabel {...defaultProps} />);
    expect(getByText(/Create a question/i)).toBeInTheDocument();
  });
});
