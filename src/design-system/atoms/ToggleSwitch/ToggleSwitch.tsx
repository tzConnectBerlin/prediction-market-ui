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

export interface ToggleProps {
  label: string;
  onClick?: () => void | Promise<void>;
}

export const ToggleSwitch: React.FC<ToggleProps> = ({ label, onClick }) => {
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
      wrap="nowrap"
    >
      <Grid item container alignItems="center">
        <StyledTypography theme={theme}>{label}</StyledTypography>
        <Typography marginLeft="0.5rem">
          <CustomTooltip />
        </Typography>
      </Grid>

      <Grid item>
        <Switch size="medium" checked={checked} onChange={toggleChecked} />
      </Grid>
    </StyledGrid>
  );
};
