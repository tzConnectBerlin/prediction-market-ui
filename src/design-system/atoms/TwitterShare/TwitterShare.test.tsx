import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { TwitterShare } from './TwitterShare';

describe('Snapshot Testing TwitterShare Component', () => {
  it('renders correctly with blue color', () => {
    const ShareBlue = renderer.create(<TwitterShare color="blue" />).toJSON();
    expect(TwitterShare).toMatchSnapshot();
  });

  it('renders correctly with grey color', () => {
    const ShareGrey = renderer.create(<TwitterShare color="grey" />).toJSON();
    expect(TwitterShare).toMatchSnapshot();
  });
});
