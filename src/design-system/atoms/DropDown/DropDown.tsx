import React from 'react';
import styled from '@emotion/styled';
import { FormControl, MenuItem, PopoverOrigin, Select } from '@material-ui/core';
import { DropDownItems } from '../../../interfaces/market';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';

interface StyledSelectProps {
  backgroundcolor?: string;
  hoverBgColor?: string;
}

const CustomStyles = { marginTop: '0' };

const StyledSelect = styled(Select)<StyledSelectProps>`
  border-radius: 0.25rem;
  box-shadow: 0 0 0.4375rem 0 rgba(209, 209, 209, 0.5);
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor};
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
  const [value, setValue] = React.useState<string | number>(defaultValue);
  const menuItems = React.useMemo(
    () =>
      items.map(({ value: itemValue, label: itemLabel, startIcon }, index) => (
        <MenuItem key={itemValue} value={itemValue} divider={divider && index !== items.length - 1}>
          {startIcon && startIcon}
          {itemLabel}
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
        sx={CustomStyles}
        value={value}
        {...props}
      >
        {menuItems}
      </StyledSelect>
    </FormControl>
  );
};
