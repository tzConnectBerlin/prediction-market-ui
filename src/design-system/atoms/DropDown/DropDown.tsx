import React from 'react';
import styled from '@emotion/styled';
import {
  FormControl,
  MenuItem,
  PopoverOrigin,
  Select,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
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
          {option.label}
        </MenuItem>
      )),
    [items, divider],
  );
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        native={isMobile}
        {...props}
      >
        {menuItems}
      </StyledSelect>
    </FormControl>
  );
};
