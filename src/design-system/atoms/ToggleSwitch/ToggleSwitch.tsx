import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { Grid, Theme, useTheme } from '@material-ui/core';
import { Typography } from '../Typography';
import { IconTooltip } from '../IconTooltip';

const StyledGrid = styled(Grid)<{ theme: Theme }>`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-left: 1rem;
  padding-right: 1.5rem;
`;

const StyledTypography = styled(Typography)<{ theme: Theme }>`
  color: ${({ theme }) => theme.palette.primary.main};
`;

export interface ToggleProps {
  label: string;
  onChange?: (val: boolean) => void | Promise<void>;
  tooltip?: boolean;
  state: boolean;
}

const defaultTooltip = false;

export const ToggleSwitch: React.FC<ToggleProps> = ({
  label,
  onChange,
  tooltip = defaultTooltip,
}) => {
  const [checked, setChecked] = React.useState(false);
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
        <StyledTypography theme={theme} size="subtitle1">
          {label}
        </StyledTypography>
        {tooltip && (
          <Typography marginLeft="0.5rem">
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
