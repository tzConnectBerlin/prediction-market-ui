import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Currency, TokenType } from '../../../interfaces/market';
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
      currency: Currency.USD,
      tokenType: TokenType.yes,
    },
    {
      type: 'VOLUME',
      value: '5',
      currency: Currency.USD,
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
    const { getByText, container } = render(
      <MarketCardContent statisticList={defaultProps.statisticList} />,
    );

    expect(getByText(/WEEKLY/i)).toBeInTheDocument();
    expect(getByText(/VOLUME/i)).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('render correctly tokenList', async () => {
    const { getByText, container } = render(
      <MarketCardContent tokenList={defaultProps.tokenList} />,
    );

    expect(getByText(/YES/i)).toBeInTheDocument();
    expect(container.querySelector('svg')).not.toBeInTheDocument();
  });
});
