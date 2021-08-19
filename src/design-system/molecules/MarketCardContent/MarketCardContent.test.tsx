import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { TokenType } from '../../../interfaces/market';
import { MarketCardContent, MarketCardContentProps } from './MarketCardContent';

const defaultProps: MarketCardContentProps = {
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
  statisticList: [
    {
      type: 'WEEKLY',
      value: '95',
      changes: 'up',
      tokenType: TokenType.yes,
    },
    {
      type: 'VOLUME',
      value: '5',
    },
  ],
};

describe('Snapshot testing MarketCardContent Component', () => {
  it('renders correctly without Props', () => {
    const cardContent = renderer.create(<MarketCardContent />).toJSON();
    expect(cardContent).toMatchSnapshot();
  });

  it('renders correctly only tokenList', () => {
    const cardContent = renderer
      .create(<MarketCardContent tokenList={defaultProps.tokenList} />)
      .toJSON();
    expect(cardContent).toMatchSnapshot();
  });

  it('renders correctly only statisticList', () => {
    const cardContent = renderer
      .create(<MarketCardContent statisticList={defaultProps.statisticList} />)
      .toJSON();
    expect(cardContent).toMatchSnapshot();
  });

  it('renders correctly with Props', () => {
    const cardContent = renderer
      .create(
        <MarketCardContent
          tokenList={defaultProps.tokenList}
          statisticList={defaultProps.statisticList}
        />,
      )
      .toJSON();
    expect(cardContent).toMatchSnapshot();
  });
});

describe('Element testing MarketCardContent Component', () => {
  it('render correctly statisticList', async () => {
    const { getByText } = render(<MarketCardContent statisticList={defaultProps.statisticList} />);

    expect(getByText(/WEEKLY/i)).toBeInTheDocument();
    expect(getByText(/VOLUME/i)).toBeInTheDocument();
  });

  it('render correctly tokenList', async () => {
    const { getByText } = render(<MarketCardContent tokenList={defaultProps.tokenList} />);

    expect(getByText(/YES/i)).toBeInTheDocument();
  });
});
