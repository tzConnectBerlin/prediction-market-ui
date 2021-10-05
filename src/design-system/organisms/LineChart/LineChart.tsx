import { ResponsiveLine, Serie } from '@nivo/line';
import styled from '@emotion/styled';
import { Grid, Paper, useTheme, Chip, Stack, useMediaQuery, Theme, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { Typography } from '../../atoms/Typography';

const ChartWrapper = styled(Paper)<{ theme: Theme }>`
  padding: 2rem;
  ${({ theme }) => `${theme.breakpoints.down('sm')} {
   padding: 2rem 0;
  }`}
`;

const StyledChip = styled(Chip)`
  margin-left: 0.5rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  @media (max-width: 600px) {
    margin-bottom: 1rem;
  }
`;

const StyledTextField = styled(TextField)<{ theme: Theme }>`
  label {
    font-family: Roboto Mono;
    font-size: 0.75rem;
  }
  margin: 1.5rem;
  & .MuiFilledInput-root {
    background-color: ${({ theme }) => theme.palette.grey[300]};
    border: none;
    border-radius: 4px;
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
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');

  const handleRangeSelection = React.useCallback(
    (newRange: string | number) => {
      onChange(newRange);
      setRange(newRange);
    },
    [onChange],
  );

  return isMobile ? (
    <StyledTextField
      theme={theme}
      variant="filled"
      select
      id="range-select"
      label={t('dateRange')}
      value={range}
      onChange={(e) => handleRangeSelection(e.target.value)}
      InputProps={{ disableUnderline: true }}
      SelectProps={{ native: true }}
    >
      {values.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledTextField>
  ) : (
    <Stack direction="row" spacing={1} aria-label="range-selector">
      {values.map(({ label, value }, index) => (
        <StyledChip
          label={<Typography size="h6">{label}</Typography>}
          color={value === range ? 'primary' : 'secondary'}
          key={`${index}-${value}`}
          onClick={() => handleRangeSelection(value)}
          size="small"
        />
      ))}
    </Stack>
  );
};

export const LineChart: React.FC<LineChartProps> = ({ data = [], rangeSelector }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');
  return (
    <ChartWrapper theme={theme}>
      <Grid container direction="column">
        <Typography size="h2" marginLeft="1.5rem">
          {t('predictedProbability')}
        </Typography>

        {rangeSelector && (
          <Grid
            item
            container
            direction="row-reverse"
            justifyContent={isMobile ? 'center' : undefined}
          >
            <RangeSelector {...rangeSelector} />
          </Grid>
        )}
        <Grid item height={isMobile ? '25rem' : '30rem'}>
          <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 40, bottom: 65, left: 60 }}
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
              tickRotation: 65,
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
                anchor: isMobile ? 'top' : 'top-left',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: -54,
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
