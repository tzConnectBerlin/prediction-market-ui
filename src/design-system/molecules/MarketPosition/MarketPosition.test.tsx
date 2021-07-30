import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { TokenType } from '../../../interfaces/market';
import { MarketPosition, MarketPositionProps } from './MarketPosition';

const defaultProps: MarketPositionProps = {
  tokenList: [
    {
      type: TokenType.yes,
      value: 14,
    },
    {
      type: TokenType.no,
      value: 5,
    },
  ],
};

describe('Snapshot testing MarketPosition Component', () => {
  it('renders correctly without Props', () => {
    const cardContent = renderer.create(<MarketPosition />).toJSON();
    expect(cardContent).toMatchSnapshot();
  });

  it('renders correctly only tokenList', () => {
    const cardContent = renderer
      .create(<MarketPosition tokenList={defaultProps.tokenList} />)
      .toJSON();
    expect(cardContent).toMatchSnapshot();
  });
});
