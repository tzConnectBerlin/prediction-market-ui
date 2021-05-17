import renderer from 'react-test-renderer';
import { ExpandText } from './ExpandText';

const largeTextArgs = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'.repeat(20),
  expandActionText: 'Read more',
  shrinkActionText: 'Read less',
};

const smallTextArgs = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  expandActionText: 'Read more',
  shrinkActionText: 'Read less',
};

// TODO: add testing for toggle click

describe('Snapshot testing ExpandText Component', () => {
  it('renders correctly with Large text', () => {
    const component = renderer.create(<ExpandText {...largeTextArgs} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with small text', () => {
    const component = renderer.create(<ExpandText {...smallTextArgs} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
