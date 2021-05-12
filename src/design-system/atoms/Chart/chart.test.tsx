import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { Chart } from './Chart';
import { lightTheme as theme } from '../../../theme';

const defaultData = {
  labels: ['3 MAR 2021', '4 MAR 2021', '5 MAR 2021', '6 MAR 2021', '7 MAR 2021'],
  datasets: [
    {
      label: 'Yes',
      data: [1, 2, 3, 2.5, 4],
      borderColor: theme.palette.success.main,
      backgroundColor: theme.palette.success.main,
      yAxisID: 'y',
    },
  ],
};

describe('Snapshot testing Chart Component', () => {
  it('renders correctly Line chart', () => {
    const ChartEl = renderer.create(<Chart chartData={defaultData} />).toJSON();
    expect(ChartEl).toMatchSnapshot();
  });

  it('renders correctly Bar chart', () => {
    const ChartEl = renderer.create(<Chart chartData={defaultData} chartType="bar" />).toJSON();
    expect(ChartEl).toMatchSnapshot();
  });

  it('renders correctly title', () => {
    const ChartEl = renderer
      .create(<Chart chartData={defaultData} chartTitle="Test Title" />)
      .toJSON();
    expect(ChartEl).toMatchSnapshot();
  });
});
