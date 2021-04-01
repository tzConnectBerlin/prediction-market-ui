import renderer from 'react-test-renderer';
import { render, waitFor } from '@testing-library/react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { CustomButton } from '../Button';

describe('Snapshot testing Button Component', () => {
  it('renders correctly with small size and primary color', () => {
    const Button = renderer.create(<CustomButton label="Button" />).toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with medium size and secondary background color', () => {
    const Button = renderer
      .create(<CustomButton label="Button" backgroundVariant="secondary" size="medium" />)
      .toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with large size and outline border', () => {
    const Button = renderer
      .create(<CustomButton label="Button" size="large" variant="outlined" />)
      .toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with icon in the right side', () => {
    const Button = renderer
      .create(<CustomButton label="Button" icon={<RiAccountCircleFill />} />)
      .toJSON();
    expect(Button).toMatchSnapshot();
  });

  it('renders correctly with icon in the left side', () => {
    const Button = renderer
      .create(<CustomButton label="Button" icon={<RiAccountCircleFill />} iconPosition="left" />)
      .toJSON();
    expect(Button).toMatchSnapshot();
  });
});

describe('Element testing Button Component', () => {
  it('render correctly with Sign In label and primary class', async () => {
    const { findByText } = await render(<CustomButton label="Sign In" />);

    waitFor(() => {
      expect(findByText(/MuiButton-containedPrimary/i)).toBeInTheDocument();
      expect(findByText(/Sign In/i)).toBeInTheDocument();
    });
  });
});
