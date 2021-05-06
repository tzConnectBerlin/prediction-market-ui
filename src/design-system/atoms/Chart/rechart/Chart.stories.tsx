import { Story, Meta } from '@storybook/react/types-6-0';
import { lightTheme as theme } from '../../../../theme';
import { Chart, ChartProps, Axis } from './Chart';

export default {
  title: 'Atom/ReChart',
  component: Chart,
} as Meta;

const datalist = [
  {
    name: '3 MAR 2021',
    yes: 1,
    no: 25,
  },
  {
    name: '4 MAR 2021',
    yes: 3,
    no: 27,
  },
  {
    name: '5 MAR 2021',
    yes: 4,
    no: 15,
  },
  {
    name: '6 MAR 2021',
    yes: 2.5,
    no: 30,
  },
  {
    name: '7 MAR 2021',
    yes: 3.5,
    no: 35,
  },
  {
    name: '8 MAR 2021',
    yes: 5,
    no: 25,
  },
];

const yAxisList: Axis[] = [
  {
    value: 'Yes',
    y_position: 'left',
  },
  {
    value: 'No',
    y_position: 'right',
  },
];

const Template: Story<ChartProps> = (args) => <Chart {...args} />;

export const LineChart = Template.bind({});
LineChart.args = {
  data: datalist,
  colors: [theme.palette.success.main, theme.palette.error.main],
  yAxis: yAxisList,
  xAxis: { value: 'Date', x_position: 'bottom' },
};

export const BarChart = Template.bind({});
BarChart.args = {
  chartType: 'BarChart',
  data: datalist,
  colors: [theme.palette.success.main, theme.palette.primary.main],
  yAxis: yAxisList,
  xAxis: { value: 'Date', x_position: 'bottom' },
};
