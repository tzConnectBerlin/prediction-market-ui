import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { SearchBox } from './SearchBox';
import { DropDownItems } from '../../../interfaces/market';

const filterItems: DropDownItems[] = [
  {
    label: 'Open',
    value: 1,
  },
  {
    label: 'Closed',
    value: 2,
  },
  {
    label: 'Investment Phase',
    value: 3,
  },
];

const requiredProps = {
  onSelect: () => {},
  onChange: () => {},
};

describe('Snapshot testing SearchBox Component', () => {
  it('renders correctly with requiredProps', () => {
    const SearchBoxElement = renderer.create(<SearchBox {...requiredProps} />).toJSON();
    expect(SearchBoxElement).toMatchSnapshot();
  });

  it('renders correctly with filter dropdown', () => {
    const SearchBoxElement = renderer
      .create(<SearchBox {...requiredProps} filterItems={filterItems} />)
      .toJSON();
    expect(SearchBoxElement).toMatchSnapshot();
  });

  it('renders correctly with Searchbox placeholder', () => {
    const SearchBoxElement = renderer
      .create(<SearchBox {...requiredProps} searchPlaceHolder="type keywords" />)
      .toJSON();
    expect(SearchBoxElement).toMatchSnapshot();
  });
});

describe('Element testing SearchBox Component', () => {
  it('render correctly with filter dropdown', async () => {
    const { getByText, container } = render(
      <SearchBox {...requiredProps} filterItems={filterItems} />,
    );
    const inputs = container.querySelectorAll('input');
    expect(getByText(/Filter/i)).toBeInTheDocument();
    expect(inputs.length).toBe(2);
  });

  it('render correctly without filter dropdown', async () => {
    const { container } = render(
      <SearchBox {...requiredProps} searchPlaceHolder="type keywords" />,
    );
    const inputs = container.querySelectorAll('input');
    const customPlaceholder = container.querySelectorAll('[placeHolder="type keywords"]');
    expect(inputs.length).toBe(1);
    expect(customPlaceholder.length).toBe(1);
  });
});
