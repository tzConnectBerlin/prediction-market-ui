import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { ThemeProvider } from '@mui/material';
import { ButtonProps, CustomButton } from './Button';
import { lightTheme } from '../../../styles/theme';

const WrappedComponent: React.FC<ButtonProps> = (args) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CustomButton {...args} />
    </ThemeProvider>
  );
};

describe('Snapshot testing Button Component', () => {
  it('renders correctly with small size and primary color', () => {
    const Button = renderer.create(<WrappedComponent label="Button" />).toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with medium size and secondary background color', () => {
    const Button = renderer
      .create(<WrappedComponent label="Button" backgroundVariant="secondary" size="medium" />)
      .toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with large size and outline border', () => {
    const Button = renderer
      .create(<WrappedComponent label="Button" size="large" variant="outlined" />)
      .toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with icon in the right side', () => {
    const Button = renderer
      .create(<WrappedComponent label="Button" icon={<RiAccountCircleFill />} />)
      .toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with icon in the left side', () => {
    const Button = renderer
      .create(
        <WrappedComponent label="Button" icon={<RiAccountCircleFill />} iconPosition="left" />,
      )
      .toJSON();
    expect(Button).toMatchSnapshot();
  });
});

describe('Element testing Button Component', () => {
  it('render correctly with Sign In label and primary class', async () => {
    const { getByText } = render(<WrappedComponent label="Sign In" />);
    expect(getByText(/Sign In/i)).toBeInTheDocument();
  });
});
