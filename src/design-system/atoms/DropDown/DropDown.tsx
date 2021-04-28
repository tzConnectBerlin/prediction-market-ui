import React from 'react';
import styled from '@emotion/styled';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { DropDownItems } from '../../../interfaces/market';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';

interface StyledSelectProps {
  backgroundcolor?: string;
  hoverBgColor?: string;
}

const StyledSelect = styled(Select)<StyledSelectProps>`
  background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor} !important;
  }
`;

export interface DropDownProps {
  required?: boolean;
  disabled?: boolean;
  label?: string;
  items: DropDownItems[];
  anchorOriginX?: 'left' | 'right';
  anchorOriginY?: 'bottom' | 'top';
  divider?: boolean;
  bgColor?: string;
  hoverBgColor?: string;
  onSelect: () => void | Promise<void>;
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  required,
  disabled,
  items,
  anchorOriginX = 'left',
  anchorOriginY = 'bottom',
  bgColor,
  hoverBgColor,
  divider = true,
  onSelect,
  ...props
}) => {
  const getMenuItem = () =>
    items.map((option) => (
      <MenuItem key={option.value} value={option.value} divider={divider}>
        {option.label}
      </MenuItem>
    ));
  return (
    <FormControl>
      <CustomInputLabel label={label} required={required} disabled={disabled} />
      <StyledSelect
        variant="standard"
        backgroundcolor={bgColor}
        hoverBgColor={hoverBgColor}
        onChange={onSelect}
        disabled={disabled}
        required={required}
        MenuProps={{
          anchorOrigin: {
            vertical: anchorOriginY,
            horizontal: anchorOriginX,
          },
        }}
        {...props}
      >
        {getMenuItem()}
      </StyledSelect>
    </FormControl>
  );
};
