import renderer from 'react-test-renderer';
import { Identicon, IdenticonProps } from '../Identicon';

const defaultProps: IdenticonProps = {
  type: 'tzKtCat',
  seed: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
  url: 'https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg',
};
describe('Snapshot testing Identicon Component', () => {
  it('renders correctly without props', () => {
    const icon = renderer.create(<Identicon />).toJSON();
    expect(icon).toMatchSnapshot();
  });

  it('renders correctly with Url', () => {
    const icon = renderer.create(<Identicon url={defaultProps.url} />).toJSON();
    expect(icon).toMatchSnapshot();
  });

  it('renders correctly with seed', () => {
    const icon = renderer.create(<Identicon seed={defaultProps.seed} />).toJSON();
    expect(icon).toMatchSnapshot();
  });

  it('renders correctly with tzKtCat type with Background', () => {
    const icon = renderer
      .create(<Identicon seed={defaultProps.seed} type={defaultProps.type} />)
      .toJSON();
    expect(icon).toMatchSnapshot();
  });

  it('renders correctly with tzKtCat type without Background', () => {
    const icon = renderer
      .create(<Identicon seed={defaultProps.seed} type={defaultProps.type} hasBackground={false} />)
      .toJSON();
    expect(icon).toMatchSnapshot();
  });
});
