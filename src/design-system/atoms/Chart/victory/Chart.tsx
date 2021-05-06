import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryGroup,
  VictoryLegend,
} from 'victory';

export interface Axis {
  value: string;
  y_position?: 'left' | 'right';
  x_position?: 'top' | 'bottom';
}

export interface ChartProps {
  chartType?: 'BarChart' | 'LineChart';
  data: any[];
  colors: string[][];
  yAxis?: Axis[];
  xAxis?: Axis;
}

export const Chart: React.FC<ChartProps> = ({
  chartType = 'BarChart',
  data,
  colors,
  yAxis,
  xAxis,
}) => {
  const PlotLineChart = () => {
    const lines = Object.keys(data[0]).slice(1);
    return (
      <VictoryChart>
        <VictoryBar data={data} x="name" y="yes" />
        <VictoryBar data={data} x="name" y="no" />
      </VictoryChart>
    );
  };
  const PlotBarChart = () => {
    const lines = Object.keys(data[0]).slice(1);
    return (
      <VictoryChart>
        <VictoryLegend
          x={125}
          y={50}
          orientation="horizontal"
          gutter={20}
          style={{ title: { fontSize: 20 } }}
          data={[
            { name: 'Yes', symbol: { fill: colors[0][0] } },
            { name: 'No', symbol: { fill: colors[1][0] } },
          ]}
        />
        <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
          {data.map((d, i) => {
            return (
              <VictoryStack colorScale={colors[i]} key={i}>
                <VictoryBar data={d} />
              </VictoryStack>
            );
          })}
        </VictoryGroup>
      </VictoryChart>
    );
  };

  return (
    <>
      <div>{chartType === 'LineChart' ? PlotLineChart() : PlotBarChart()}</div>
    </>
  );
};
