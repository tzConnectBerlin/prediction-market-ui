import renderer from 'react-test-renderer';
import { ToggleSwitch } from './ToggleSwitch';

describe('Snapshot testing ToggleSwitch Component', () => {
  it('renders correctly with tooltip', () => {
    const tooltip = renderer.create(<ToggleSwitch label="Advanced View" tooltip />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });

  it('renders correctly without tooltip', () => {
    const tooltip = renderer.create(<ToggleSwitch label="Advanced View" />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });
});
