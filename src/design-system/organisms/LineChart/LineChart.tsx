import { ResponsiveLine, Serie } from '@nivo/line';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import styled from '@emotion/styled';
import { Grid, Paper, Theme, useTheme } from '@material-ui/core';
import React from 'react';
import { Typography } from '../../atoms/Typography';

const ChartWrapper = styled(Paper)`
  padding: 2rem;
`;

/**
 * TODO: Find a way to not use !important
 */
const StyledToggleButton = styled(ToggleButton)<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.palette.secondary.main} !important;
  &.Mui-selected {
    color: ${({ theme }) => theme.palette.buttonText.primary} !important;
    background-color: ${({ theme }) => theme.palette.primary.main} !important;
  }
`;

interface RangeSelectorProps {
  defaultValue: string | number;
  values: {
    label: string;
    value: string | number;
  }[];
  onChange: (value: string | number) => Promise<void> | void;
}

export interface LineChartProps {
  data?: Serie[];
  rangeSelector?: RangeSelectorProps;
}

const RangeSelector: React.FC<RangeSelectorProps> = ({ defaultValue, values, onChange }) => {
  const [range, setRange] = React.useState(defaultValue);
  const theme = useTheme();

  const handleRangeSelection = (_: unknown, newRange: string | number | null) => {
    const updatedRange = newRange === null || typeof newRange === 'undefined' ? range : newRange;
    onChange(updatedRange);
    setRange(updatedRange);
  };

  return (
    <ToggleButtonGroup
      value={range}
      exclusive
      onChange={handleRangeSelection}
      aria-label="range-selector"
    >
      {values.map(({ label, value }, index) => (
        <StyledToggleButton
          value={value}
          aria-label={label}
          key={`${index}-${value}-${label}`}
          sx={{ marginX: '0.5rem' }}
          theme={theme}
        >
          <Typography>{label}</Typography>
        </StyledToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export const LineChart: React.FC<LineChartProps> = ({ data = [], rangeSelector }) => {
  const theme = useTheme();

  return (
    <ChartWrapper>
      <Grid container direction="column">
        {rangeSelector && (
          <Grid item container direction="row-reverse">
            <RangeSelector {...rangeSelector} />
          </Grid>
        )}
        <Grid item height="30rem">
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 50, bottom: 65, left: 60 }}
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
        </Grid>
      </Grid>
    </ChartWrapper>
  );
};
