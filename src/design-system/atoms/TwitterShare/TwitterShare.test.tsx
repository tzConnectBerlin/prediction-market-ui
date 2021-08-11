import renderer from 'react-test-renderer';
import { TwitterShare, TwitterShareProps } from './TwitterShare';

const defaultProps: TwitterShareProps = {
  color: 'blue',
  title: 'Share Now',
  text: 'Look at my prediction market here: https://tzconnect.com/prediction-market/10/is-this-a-bear',
};

describe('Snapshot Testing TwitterShare Component', () => {
  it('renders correctly with blue color', () => {
    const ShareBlue = renderer.create(<TwitterShare {...defaultProps} />).toJSON();
    expect(ShareBlue).toMatchSnapshot();
  });

  it('renders correctly with grey color', () => {
    const ShareGrey = renderer.create(<TwitterShare {...defaultProps} color="grey" />).toJSON();
    expect(ShareGrey).toMatchSnapshot();
  });

  it('renders correctly without title', () => {
    const ShareGrey = renderer.create(<TwitterShare text="without title" color="grey" />).toJSON();
    expect(ShareGrey).toMatchSnapshot();
  });
});
