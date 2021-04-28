import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { DropDown } from './DropDown';
import { DropDownItems } from '../../../interfaces/market';

const dropdownitems: DropDownItems[] = [
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
  items: dropdownitems,
  onSelect: () => {},
};

describe('Snapshot testing DropDown Component', () => {
  it('renders correctly with requiredProps', () => {
    const DropDownElement = renderer.create(<DropDown {...requiredProps} />).toJSON();
    expect(DropDownElement).toMatchSnapshot();
  });

  it('renders correctly with label', () => {
    const DropDownElement = renderer
      .create(<DropDown {...requiredProps} label="Filter" />)
      .toJSON();
    expect(DropDownElement).toMatchSnapshot();
  });

  it('renders correctly required', () => {
    const DropDownElement = renderer
      .create(<DropDown {...requiredProps} label="Filter" required />)
      .toJSON();
    expect(DropDownElement).toMatchSnapshot();
  });

  it('renders correctly disabled', () => {
    const DropDownElement = renderer
      .create(<DropDown {...requiredProps} label="Filter" disabled />)
      .toJSON();
    expect(DropDownElement).toMatchSnapshot();
  });

  it('renders correctly with cutom background color', () => {
    const DropDownElement = renderer
      .create(<DropDown {...requiredProps} label="Button" bgColor="red" />)
      .toJSON();
    expect(DropDownElement).toMatchSnapshot();
  });

  it('renders correctly without divider', () => {
    const DropDownElement = renderer
      .create(<DropDown {...requiredProps} divider={false} />)
      .toJSON();
    expect(DropDownElement).toMatchSnapshot();
  });
});

describe('Element testing DropDown Component', () => {
  it('render correctly with label', async () => {
    const { getByText } = render(<DropDown {...requiredProps} label="Filter" />);
    expect(getByText(/Filter/i)).toBeInTheDocument();
  });
});
