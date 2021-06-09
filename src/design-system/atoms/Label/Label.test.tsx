import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { GiAlarmClock } from 'react-icons/gi';
import { lightTheme as theme } from '../../../theme';
import { Label } from './Label';

describe('Snapshot testing Label Component', () => {
  it('renders correctly with small size and primary color', () => {
    const label = renderer.create(<Label text="Label Text" />).toJSON();
    expect(label).toMatchSnapshot();
  });

  it('renders correctly with medium size and secondary background color', () => {
    const label = renderer
      .create(
        <Label
          text="Label Text"
          fontColor={theme.palette.text.primary}
          backgroundColor={theme.palette.secondary.main}
          size="medium"
        />,
      )
      .toJSON();
    expect(label).toMatchSnapshot();
  });

  it('renders correctly with large size', () => {
    const label = renderer.create(<Label text="Label Text" size="large" />).toJSON();
    expect(label).toMatchSnapshot();
  });

  it('renders correctly with icon', () => {
    const label = renderer.create(<Label text="Label Text" icon={<GiAlarmClock />} />).toJSON();
    expect(label).toMatchSnapshot();
  });
});

describe('Element testing Label Component', () => {
  it('render correctly with icon and label--icon class', () => {
    const { container } = render(<Label text="Label Text" icon={<GiAlarmClock />} />);
    expect(container.firstChild).toHaveClass('label--icon');
  });

  it('render correctly with Market text', () => {
    const { container } = render(<Label text="Market" />);
    expect(container.textContent).toBe('Market');
  });
});
