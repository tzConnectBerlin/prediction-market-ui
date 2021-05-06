import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface Axis {
  value: string;
  y_position?: 'left' | 'right';
  x_position?: 'top' | 'bottom';
}

export interface ChartProps {
  chartType?: 'BarChart' | 'LineChart';
  data: any[];
  colors: string[];
  yAxis: Axis[];
  xAxis: Axis;
}

export const Chart: React.FC<ChartProps> = ({
  chartType = 'LineChart',
  data,
  colors,
  yAxis,
  xAxis,
}) => {
  const PlotLineChart = () => {
    const lines = Object.keys(data[0]).slice(1);
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="0" vertical={false} />
        <XAxis dataKey="name" axisLine={false} label={xAxis} />
        {yAxis.map((y) => (
          <YAxis
            key={y.value}
            yAxisId={y.y_position}
            axisLine={false}
            tickLine={false}
            orientation={y.y_position}
            label={{ ...y, angle: y.y_position === 'left' ? -90 : 90 }}
          />
        ))}
        <Tooltip />
        <Legend verticalAlign="top" align="left" height={50} />
        {lines.map((item, i) => (
          <Line
            type="monotone"
            yAxisId={yAxis[i].y_position}
            dataKey={item}
            stroke={colors[i]}
            key={i}
            dot={false}
          />
        ))}
      </LineChart>
    );
  };
  const PlotBarChart = () => {
    const lines = Object.keys(data[0]).slice(1);
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="0" vertical={false} />
        <XAxis dataKey="name" axisLine={false} label={xAxis} />
        {yAxis.map((y) => (
          <YAxis
            key={y.value}
            yAxisId={y.y_position}
            axisLine={false}
            tickLine={false}
            orientation={y.y_position}
            label={{ ...y, angle: y.y_position === 'left' ? -90 : 90 }}
          />
        ))}
        <Tooltip />
        <Legend verticalAlign="top" align="left" height={50} />
        {lines.map((item, i) => (
          <Bar
            type="monotone"
            yAxisId={yAxis[i].y_position}
            dataKey={item}
            fill={colors[i]}
            key={i}
          />
        ))}
      </BarChart>
    );
  };

  return (
    <>
      <div style={{ width: '90vm', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'LineChart' ? PlotLineChart() : PlotBarChart()}
        </ResponsiveContainer>
      </div>
    </>
  );
};
