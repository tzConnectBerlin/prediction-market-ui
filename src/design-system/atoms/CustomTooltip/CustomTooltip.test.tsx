import renderer from 'react-test-renderer';
import { CustomTooltip } from './CustomTooltip';

describe('Snapshot testing CustomTooltip Component', () => {
  it('renders correctly with default size and color', () => {
    const tooltip = renderer.create(<CustomTooltip />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });

  it('renders correctly with custom color', () => {
    const tooltip = renderer.create(<CustomTooltip color="red" />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });

  it('renders correctly open tooltip', () => {
    const tooltip = renderer.create(<CustomTooltip open />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });
});
