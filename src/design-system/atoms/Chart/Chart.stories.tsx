import { Story, Meta } from '@storybook/react/types-6-0';
import { ChartOptions } from 'chart.js';
import { lightTheme as theme } from '../../../theme';
import { Chart, ChartProps } from './Chart';

export default {
  title: 'Atom/Chart',
  component: Chart,
} as Meta;

const chartData = {
  labels: ['3 MAR 2021', '4 MAR 2021', '5 MAR 2021', '6 MAR 2021', '7 MAR 2021'],
  datasets: [
    {
      label: 'Yes',
      data: [1, 2, 3, 2.5, 4],
      borderColor: theme.palette.success.main,
      backgroundColor: theme.palette.success.main,
      yAxisID: 'y',
    },
    {
      label: 'No',
      data: [20, 35, 25, 15, 17],
      borderColor: theme.palette.error.main,
      backgroundColor: theme.palette.error.main,
      yAxisID: 'y1',
    },
  ],
};

const chartOptions: ChartOptions = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    title: {
      display: true,
      text: 'Price History',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',

      // grid line settings
      grid: {
        drawOnChartArea: false, // only want the grid lines for one axis to show up
      },
    },
  },
};

const Template: Story<ChartProps> = (args) => <Chart {...args} />;

export const LineChart = Template.bind({});
LineChart.args = {
  data: chartData,
  options: chartOptions,
};

export const BarChart = Template.bind({});
BarChart.args = {
  chartType: 'BarChart',
  data: chartData,
  options: chartOptions,
};
