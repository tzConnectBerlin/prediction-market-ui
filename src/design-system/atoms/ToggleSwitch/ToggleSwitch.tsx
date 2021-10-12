import * as React from 'react';
import Switch from '@mui/material/Switch';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Grid, Theme, useTheme } from '@mui/material';
import { Typography } from '../Typography';
import { IconTooltip } from '../IconTooltip';
import { FontSize } from '../../../interfaces';

const StyledGrid = styled(Grid)<{ theme: Theme }>`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-left: 0.5rem;
  padding-right: 1.5rem;
`;

const StyledTypography = styled(Typography)<{ theme: Theme }>`
  color: ${({ theme, color }) =>
    color === 'primary' ? theme.palette.primary.main : theme.palette.text.secondary};
`;

export interface ToggleProps {
  label: string;
  onChange?: (val: boolean) => void | Promise<void>;
  tooltip?: boolean;
  state: boolean;
  size?: FontSize;
}

const defaultTooltip = false;
const defaultSize = 'subtitle1';
export const ToggleSwitch: React.FC<ToggleProps> = ({
  label,
  onChange,
  tooltip = defaultTooltip,
  state,
  size = defaultSize,
}) => {
  const [checked, setChecked] = React.useState(state);
  const { t } = useTranslation('common');
  const toggleChecked = () => {
    onChange && onChange(!checked);
    setChecked((prev) => !prev);
  };
  const theme = useTheme();

  return (
    <StyledGrid
      container
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      theme={theme}
      wrap="nowrap"
    >
      <Grid item container alignItems="center">
        <StyledTypography theme={theme} size={size}>
          {label}
        </StyledTypography>
        {tooltip && (
          <Typography>
            <IconTooltip description={t('advanced')} />
          </Typography>
        )}
      </Grid>

      <Grid item>
        <Switch size="medium" checked={checked} onChange={toggleChecked} />
      </Grid>
    </StyledGrid>
  );
};
