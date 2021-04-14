import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@material-ui/core';
import { CustomInputLabelProps, CustomInputLabel } from './CustomInputLabel';
import { theme } from '../../../theme';

const onlyRequiredProps: CustomInputLabelProps = {
  label: 'Create a question',
};

const defaultProps: CustomInputLabelProps = {
  ...onlyRequiredProps,
  marginTop: '1%',
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

  it('renders correctly when theme not provided', () => {
    const inputLabel = renderer.create(<WrappedComponent {...onlyRequiredProps} />).toJSON();
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

  it('render with empty theme object', async () => {
    const { getByText } = render(
      <ThemeProvider theme={{}}>
        <CustomInputLabel {...defaultProps} />
      </ThemeProvider>,
    );
    expect(getByText(/Create a question/i)).toBeInTheDocument();
  });
});
