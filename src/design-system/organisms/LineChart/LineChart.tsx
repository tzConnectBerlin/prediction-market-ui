import { ResponsiveLine, Serie } from '@nivo/line';
import styled from '@emotion/styled';
import { Paper, useTheme } from '@material-ui/core';

const ChartWrapper = styled(Paper)`
  padding: 2rem;
  height: 30rem;
`;

export interface LineChartProps {
  data?: Serie[];
}

export const LineChart: React.FC<LineChartProps> = ({ data = [] }) => {
  const theme = useTheme();

  return (
    <ChartWrapper>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 32, bottom: 65, left: 60 }}
        xScale={{ type: 'point' }}
        colors={[theme.palette.success.main, theme.palette.error.main]}
        yScale={{
          type: 'linear',
          min: 0,
          max: 100,
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legendOffset: 15,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Yes/No %',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        pointSize={3}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={4}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh
        enableGridX={false}
        legends={[
          {
            anchor: 'top',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: -40,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </ChartWrapper>
  );
};
