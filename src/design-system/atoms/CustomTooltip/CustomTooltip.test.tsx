import renderer from 'react-test-renderer';
import { CustomTooltip } from './CustomTooltip';

describe('Snapshot testing CustomTooltip Component', () => {
  it('renders correctly with default size', () => {
    const tooltip = renderer.create(<CustomTooltip />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });

  it('renders correctly with custom size', () => {
    const tooltip = renderer.create(<CustomTooltip size="1em" />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });
});
