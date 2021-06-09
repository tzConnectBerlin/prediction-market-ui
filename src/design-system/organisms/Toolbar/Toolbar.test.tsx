import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Toolbar } from './Toolbar';
import { DropDownItems } from '../../../interfaces/market';

const items: DropDownItems[] = [
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
  onSortSelect: () => {},
  onSearchChange: () => {},
  onFilterSelect: () => {},
};

describe('Snapshot testing Toolbar Component', () => {
  it('renders correctly with requiredProps', () => {
    const ToolbarElement = renderer.create(<Toolbar {...requiredProps} />).toJSON();
    expect(ToolbarElement).toMatchSnapshot();
  });

  it('renders correctly with filter dropdown', () => {
    const ToolbarElement = renderer
      .create(<Toolbar {...requiredProps} filterItems={items} />)
      .toJSON();
    expect(ToolbarElement).toMatchSnapshot();
  });

  it('renders correctly with sort dropdown', () => {
    const ToolbarElement = renderer
      .create(<Toolbar {...requiredProps} sortItems={items} />)
      .toJSON();
    expect(ToolbarElement).toMatchSnapshot();
  });
});

describe('Element testing Toolbar Component', () => {
  it('render correctly with filter dropdown', async () => {
    const { getByText, container } = render(<Toolbar {...requiredProps} filterItems={items} />);
    const inputs = container.querySelectorAll('input');
    expect(getByText(/Filter/i)).toBeInTheDocument();
    expect(inputs.length).toBe(2);
  });

  it('render correctly with filter and sort dropdown', async () => {
    const { container, getByText } = render(
      <Toolbar {...requiredProps} filterItems={items} sortItems={items} />,
    );
    const inputs = container.querySelectorAll('input');
    expect(getByText(/Filter/i)).toBeInTheDocument();
    expect(getByText(/Sort By/i)).toBeInTheDocument();
    expect(inputs.length).toBe(3);
  });
});
