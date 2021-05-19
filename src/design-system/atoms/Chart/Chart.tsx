import React from 'react';
import { ChartData } from 'chart.js';
import 'chartjs-plugin-zoom';
import { ZoomPluginOptions } from 'chartjs-plugin-zoom/types/options';
import { Bar, Line } from 'react-chartjs-2';

export interface ChartProps {
  chartType?: 'bar' | 'line';
  chartData: ChartData;
  options?: any;
  chartTitle?: string;
  chartTitlePosition?: 'top' | 'left' | 'bottom' | 'right';
  enableZoom?: boolean;
}

export const Chart: React.FC<ChartProps> = ({
  chartType = 'line',
  chartData,
  options,
  chartTitle,
  chartTitlePosition = 'bottom',
  enableZoom = false,
}) => {
  let chartTitleOptions = {};
  let chartZoomOptions: ZoomPluginOptions = {};
  if (chartTitle) {
    chartTitleOptions = {
      display: true,
      text: chartTitle,
      position: chartTitlePosition,
    };
  }
  if (enableZoom) {
    chartZoomOptions = {
      pan: {
        enabled: true,
        mode: 'xy',
      },
      zoom: {
        drag: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        wheel: {
          enabled: true,
        },
        mode: 'xy',
      },
    };
  }

  const chartOptions = {
    ...options,
    plugins: { title: chartTitleOptions, zoom: chartZoomOptions },
  };
  const Component = chartType === 'line' ? Line : Bar;
  return <Component type={chartType} data={chartData} options={chartOptions} />;
};
