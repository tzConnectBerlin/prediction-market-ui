import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import renderer from 'react-test-renderer';
import { IconTooltip } from './IconTooltip';

const description = 'Sample tooltip description';
describe('Snapshot testing IconTooltip Component', () => {
  it('renders correctly with default size and color', () => {
    const tooltip = renderer.create(<IconTooltip description={description} />).toJSON();
    expect(tooltip).toMatchSnapshot();
  });

  it('renders correctly with Icon color', () => {
    const tooltip = renderer
      .create(<IconTooltip description={description} iconColor="white" />)
      .toJSON();
    expect(tooltip).toMatchSnapshot();
  });

  it('renders correctly with HtmlElement description', () => {
    const Description = () => (
      <div>
        Sale price is discounted by <b>5%</b>. This fee goes to the market creator and liquidity
        providers.
      </div>
    );
    const tooltip = renderer
      .create(<IconTooltip description={<Description />} iconColor="white" />)
      .toJSON();
    expect(tooltip).toMatchSnapshot();
  });
});

describe('Element testing IconTooltip Component', () => {
  const setTooltipIsOpen = jest.fn();
  const useStateMock: any = (tooltipIsOpen: any) => [tooltipIsOpen, setTooltipIsOpen];

  it.skip('render correctly has been opened', async () => {
    const Description = () => (
      <div>
        Sale price is discounted by <b>5%</b>. This fee goes to the market creator and liquidity
        providers.
      </div>
    );
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { rerender, container, getByLabelText } = render(
      <IconTooltip description={<Description />} />,
    );
    rerender(<IconTooltip description={<Description />} />);
    await waitFor(() => {
      const buttonElement = getByLabelText(/tooltip/);
      // console.log(buttonElement);
      fireEvent.click(buttonElement);
    });
    expect(setTooltipIsOpen).toHaveBeenCalled();
    expect(container.querySelectorAll('b').length).toEqual(1);
  });
});
