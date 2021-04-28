import React from 'react';
import { FormControl, MenuItem, TextField } from '@material-ui/core';
import { DropDownItems } from '../../../interfaces/market';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';

export interface DropDownProps {
  required?: boolean;
  disabled?: boolean;
  label?: string;
  items: DropDownItems[];
  anchorOriginX?: 'left' | 'right';
  anchorOriginY?: 'bottom' | 'top';
  divider?: boolean;
  bgColor?: string;
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
  divider = true,
  onSelect,
}) => {
  const getMenuItem = () =>
    items.map((option) => (
      <MenuItem key={option.value} value={option.value} divider={divider}>
        {option.label}
      </MenuItem>
    ));
  return (
    <FormControl className="selectMode">
      <CustomInputLabel label={label} required={required} disabled={disabled} />
      <TextField
        variant="standard"
        sx={{ backgroundColor: bgColor }}
        onSelect={(val: any) => {
          onSelect;
          console.log(val);
        }}
        disabled={disabled}
        required={required}
        select
        SelectProps={{
          MenuProps: {
            anchorOrigin: {
              vertical: anchorOriginY,
              horizontal: anchorOriginX,
            },
          },
        }}
      >
        {getMenuItem()}
      </TextField>
    </FormControl>
  );
};
