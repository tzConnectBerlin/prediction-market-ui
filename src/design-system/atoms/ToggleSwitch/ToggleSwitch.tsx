import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from '@emotion/styled';
import { Theme, useTheme } from '@material-ui/core';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';

const StyledFormGroup = styled(FormGroup)`
  &.MuiFormGroup-root {
    padding-right: 1rem;
  }
`;

const StyledLabel = styled(FormControlLabel)<{ theme: Theme }>`
  &.MuiFormControlLabel-root {
    color: ${({ theme }) => theme.palette.primary.main};
    justify-content: space-between;
  }

  & .MuiFormControlLabel-label {
    font-size: 0.75rem;
    font-weight: 700;
    font-family: Roboto Mono;
  }

  & .MuiSwitch-root {
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
    <StyledFormGroup>
      <StyledLabel
        control={<Switch size="medium" checked={checked} onChange={toggleChecked} />}
        label={label}
        labelPlacement="start"
        theme={theme}
      />
    </StyledFormGroup>
  );
};
