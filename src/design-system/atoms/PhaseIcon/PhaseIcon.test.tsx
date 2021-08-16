import renderer from 'react-test-renderer';
import { PhaseIcon } from './PhaseIcon';

describe('Snapshot Testing TwitterShare Component', () => {
  it('renders correctly with blue color', () => {
    const PreTrading = renderer.create(<PhaseIcon variant="primary" />).toJSON();
    expect(PreTrading).toMatchSnapshot();
  });

  it('renders correctly with grey color', () => {
    const Trading = renderer.create(<PhaseIcon variant="secondary" />).toJSON();
    expect(Trading).toMatchSnapshot();
  });

  it('renders correctly without title', () => {
    const Resolved = renderer.create(<PhaseIcon variant="tertiary" />).toJSON();
    expect(Resolved).toMatchSnapshot();
  });
});
