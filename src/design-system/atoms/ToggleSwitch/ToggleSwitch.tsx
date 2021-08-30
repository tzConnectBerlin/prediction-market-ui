import React from 'react';
import Switch from '@material-ui/core/Switch';
import styled from '@emotion/styled';
import { Grid, Theme, Typography, useTheme } from '@material-ui/core';
import { CustomTooltip } from '../CustomTooltip';

const StyledGrid = styled(Grid)<{ theme: Theme }>`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-left: 1rem;
  padding-right: 1.5rem;
`;

const StyledTypography = styled(Typography)<{ theme: Theme }>`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 0.75rem;
  font-weight: 700;
  font-family: Roboto Mono;
`;

const StyledCustomToolTip = styled(CustomTooltip)`
  &.MuiIconButton-root {
    padding: 0.5rem;
  }
`;

export interface ToggleProps {
  label: string;
}

export const ToggleSwitch: React.FC<ToggleProps> = ({ label }) => {
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
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
    >
      <Grid item>
        <StyledTypography theme={theme}>
          {label}
          <StyledCustomToolTip />
        </StyledTypography>
      </Grid>

      <Grid item>
        <Switch size="medium" checked={checked} onChange={toggleChecked} />
      </Grid>
    </StyledGrid>
  );
};
