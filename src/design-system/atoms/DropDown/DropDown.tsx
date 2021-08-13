import React from 'react';
import styled from '@emotion/styled';
import { FormControl, MenuItem, PopoverOrigin, Select, useTheme } from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import { DropDownItems } from '../../../interfaces/market';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';

interface StyledSelectProps {
  backgroundcolor?: string;
  hoverBgColor?: string;
}

const StyledSelect = styled(Select)<StyledSelectProps>`
  border-radius: 0.25rem;
  margin-top: 0 !important;
  box-shadow: 0 0 0.4375rem 0 rgba(209, 209, 209, 0.5);
  background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor} !important;
  }
  &:not(.Mui-focused) {
    & svg {
      margin: 0 0.375rem -0.1875rem 0;
    }
  }
  &.Mui-focused {
    & svg {
      margin: 0 0.375rem -0.1875rem 0;
    }
  }
`;

const StyledPhaseIcon = styled(FiberManualRecord)`
  width: 0.9375rem;
  height: 0.9375rem;
  margin: 0.375rem 0.9375rem 0.375rem 0;
  border-radius: 2.75rem;
  padding: 0;
  min-width: 0;
  border: solid 1px rgba(29, 34, 39, 0.04);
  & circle {
    r: 12;
  }
`;

export interface DropDownProps {
  required?: boolean;
  disabled?: boolean;
  label?: string;
  items: DropDownItems[];
  anchorOriginX?: PopoverOrigin['horizontal'];
  anchorOriginY?: PopoverOrigin['vertical'];
  divider?: boolean;
  bgColor?: string;
  hoverBgColor?: string;
  onSelect: (item: number) => void | Promise<void>;
  defaultValue?: string | number;
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  required,
  disabled,
  items,
  anchorOriginX = 'center',
  anchorOriginY = 'bottom',
  bgColor,
  hoverBgColor,
  divider = true,
  onSelect,
  defaultValue = '',
  ...props
}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState<string | number>(defaultValue);
  const menuItems = React.useMemo(
    () =>
      items.map((option, index) => (
        <MenuItem
          key={option.value}
          value={option.value}
          divider={divider && index !== items.length - 1}
        >
          {index !== 0 &&
            (option.label === 'Trading' ? (
              <StyledPhaseIcon style={{ color: theme.palette.primary.main }} />
            ) : option.label === 'Pre-trading' ? (
              <StyledPhaseIcon style={{ color: theme.palette.primary.light }} />
            ) : (
              <StyledPhaseIcon style={{ color: theme.palette.grey[400] }} />
            ))}
          {option.label}
        </MenuItem>
      )),
    [items, divider],
  );

  return (
    <FormControl>
      <CustomInputLabel label={label} required={required} disabled={disabled} />

      <StyledSelect
        variant="standard"
        backgroundcolor={bgColor}
        hoverBgColor={hoverBgColor}
        onChange={(e: any) => {
          onSelect(e.target.value);
          setValue(e.target.value);
        }}
        disabled={disabled}
        required={required}
        MenuProps={{
          anchorOrigin: {
            vertical: anchorOriginY,
            horizontal: anchorOriginX,
          },
        }}
        value={value}
        {...props}
      >
        {menuItems}
      </StyledSelect>
    </FormControl>
  );
};
