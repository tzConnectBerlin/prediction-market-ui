import { render, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { theme } from '../../../../theme';
import { MarketCardContent, MarketCardContentProps } from '../MarketCardContent';

const defaultProps: MarketCardContentProps = {
  tokenList: [
    {
      label: 'YES',
      value: '95$',
      valueColor: theme.palette.success.main,
    },
    {
      label: 'NO',
      value: '5$',
      valueColor: theme.palette.error.main,
    },
  ],
  statisticList: [
    {
      label: 'WEEKLY',
      value: 'YES 95$',
      valueColor: theme.palette.success.main,
      changes: 'up',
    },
    {
      label: 'VOLUME',
      value: '5$',
      valueColor: theme.palette.text.primary,
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
  it('render correctly statisticList', () => {
    const { findByText } = render(<MarketCardContent statisticList={defaultProps.statisticList} />);

    waitFor(() => {
      expect(findByText(/WEEKLY/i)).toBeInTheDocument();
      expect(findByText(/VOLUME/i)).toBeInTheDocument();
      expect(findByText(/hasIcon/i)).toBeInTheDocument();
      expect(findByText(/MuiGrid-item/i)).toBe(2);
    });
  });

  it('render correctly tokenList', () => {
    const { findByText } = render(<MarketCardContent tokenList={defaultProps.tokenList} />);

    waitFor(() => {
      expect(findByText(/YES/i)).toBeInTheDocument();
      expect(findByText(/MuiGrid-item/i)).toBe(2);
      expect(findByText(/hasIcon/i)).not.toBeInTheDocument();
    });
  });
});
