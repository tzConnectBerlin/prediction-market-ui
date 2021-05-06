import { Story, Meta } from '@storybook/react/types-6-0';
import { lightTheme as theme } from '../../../../theme';
import { Chart, ChartProps } from './Chart';

export default {
  title: 'Atom/VictoryChart',
  component: Chart,
} as Meta;

const datalist = [
  [
    {
      x: '3 MAR 2021',
      y: 1,
    },
    {
      x: '4 MAR 2021',
      y: 3,
    },
    {
      x: '5 MAR 2021',
      y: 4,
    },
    {
      x: '6 MAR 2021',
      y: 2.5,
    },
    {
      x: '7 MAR 2021',
      y: 3.5,
    },
    {
      x: '8 MAR 2021',
      y: 5,
    },
  ],
  [
    {
      x: '3 MAR 2021',
      y: 25,
    },
    {
      x: '4 MAR 2021',
      y: 27,
    },
    {
      x: '5 MAR 2021',
      y: 15,
    },
    {
      x: '6 MAR 2021',
      y: 30,
    },
    {
      x: '7 MAR 2021',
      y: 35,
    },
    {
      x: '8 MAR 2021',
      y: 25,
    },
  ],
];

const Template: Story<ChartProps> = (args) => <Chart {...args} />;

export const LineChart = Template.bind({});
LineChart.args = {
  data: datalist,
  colors: [[theme.palette.success.main], [theme.palette.primary.main]],
};

export const BarChart = Template.bind({});
BarChart.args = {
  chartType: 'BarChart',
  data: datalist,
  colors: [[theme.palette.success.main], [theme.palette.primary.main]],
};
