import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { RiRefreshLine } from 'react-icons/ri';
import { CustomChip } from './CustomChip';

describe('Snapshot testing Chip Component', () => {
  it('renders correctly with small size and secondary color', () => {
    const Chip = renderer.create(<CustomChip label="Chip" />).toJSON();
    expect(Chip).toMatchSnapshot();
  });

  it('renders correctly with icon', () => {
    const Chip = renderer.create(<CustomChip label="Chip" icon={<RiRefreshLine />} />).toJSON();
    expect(Chip).toMatchSnapshot();
  });

  it('renders correctly with outline border', () => {
    const Chip = renderer
      .create(<CustomChip label="Chip" color="primary" variant="outlined" />)
      .toJSON();
    expect(Chip).toMatchSnapshot();
  });

  it('renders correctly disbled mode', () => {
    const Chip = renderer.create(<CustomChip label="Chip" disabled />).toJSON();
    expect(Chip).toMatchSnapshot();
  });
});

describe('Element testing Chip Component', () => {
  it('render correctly with Custom label', async () => {
    const { getByText } = render(<CustomChip label="Custom chip" />);
    expect(getByText(/Custom chip/i)).toBeInTheDocument();
  });
});
