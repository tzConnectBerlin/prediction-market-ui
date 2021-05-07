import React from 'react';
import { ChartData, ChartOptions } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

export interface ChartProps {
  chartType?: 'BarChart' | 'LineChart';
  data: ChartData;
  options: ChartOptions;
}

export const Chart: React.FC<ChartProps> = ({ chartType = 'LineChart', data, options }) => {
  const PlotLineChart = () => {
    return <Line type="line" data={data} options={options} />;
  };
  const PlotBarChart = () => {
    return <Bar type="bar" data={data} options={options} />;
  };

  return <>{chartType === 'LineChart' ? PlotLineChart() : PlotBarChart()}</>;
};
