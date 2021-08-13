import renderer from 'react-test-renderer';
import { PreTradingIcon, TradingIcon, ResolvedIcon } from './PhaseIcon';

describe('Snapshot Testing TwitterShare Component', () => {
  it('renders correctly with blue color', () => {
    const PreTrading = renderer.create(<PreTradingIcon />).toJSON();
    expect(PreTrading).toMatchSnapshot();
  });

  it('renders correctly with grey color', () => {
    const Trading = renderer.create(<TradingIcon />).toJSON();
    expect(Trading).toMatchSnapshot();
  });

  it('renders correctly without title', () => {
    const Resolved = renderer.create(<ResolvedIcon />).toJSON();
    expect(Resolved).toMatchSnapshot();
  });
});
