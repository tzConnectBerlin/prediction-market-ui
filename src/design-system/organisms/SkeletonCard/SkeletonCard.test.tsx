import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { SkeletonCard } from './SkeletonCard';

describe('Snapshot testing SkeletonCard Component', () => {
  it('renders correctly', () => {
    const Card = renderer.create(<SkeletonCard />).toJSON();
    expect(Card).toMatchSnapshot();
  });

  it('renders different labels', async () => {
    const { getByText } = render(<SkeletonCard labelList={['WEEKLY', 'VOLUME']} />);

    expect(getByText(/WEEKLY/i)).toBeInTheDocument();
    expect(getByText(/VOLUME/i)).toBeInTheDocument();
  });
});
