import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { TokenType } from '../../../interfaces/market';
import { PositionSummary, PositionProps } from './PositionSummary';

const defaultProps: PositionProps = {
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

describe('Snapshot testing PositionSummary Component', () => {
  it('renders correctly without Props', () => {
    const cardContent = renderer.create(<PositionSummary />).toJSON();
    expect(cardContent).toMatchSnapshot();
  });

  it('renders correctly only tokenList', () => {
    const cardContent = renderer
      .create(<PositionSummary tokenList={defaultProps.tokenList} />)
      .toJSON();
    expect(cardContent).toMatchSnapshot();
  });
});

// describe('Element testing PositionSummary Component', () => {
//   it('render correctly statisticList', async () => {
//     const { getByText, container } = render(
//       <PositionSummary statisticList={defaultProps.statisticList} />,
//     );

//     expect(getByText(/WEEKLY/i)).toBeInTheDocument();
//     expect(getByText(/VOLUME/i)).toBeInTheDocument();
//     expect(container.querySelector('svg')).toBeInTheDocument();
//   });

//   it('render correctly tokenList', async () => {
//     const { getByText, container } = render(<PositionSummary tokenList={defaultProps.tokenList} />);

//     expect(getByText(/YES/i)).toBeInTheDocument();
//     expect(container.querySelector('svg')).not.toBeInTheDocument();
//   });
// });
