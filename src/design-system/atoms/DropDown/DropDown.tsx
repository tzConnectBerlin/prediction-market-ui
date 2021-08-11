import React from 'react';
import styled from '@emotion/styled';
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  PopoverOrigin,
  Select,
  Radio,
  RadioProps,
  Theme,
  useTheme,
  RadioGroup,
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
interface StyledRadioProps {
  color?: string;
  theme: Theme;
  hoverBgColor?: string;
}
const StyledRadio = styled(Radio)<StyledRadioProps>`
  color: ${({ theme }) => theme.palette.grey[600]};
  &:checked: {
    background-color: ${({ theme }) => theme.palette.grey[900]};
  }
  width: 15px;
  height: 15px;
  margin: 6px 12px 6px 0px;
  border-radius: 44px;
  background-color: rgba(1, 102, 255, 0.12);
  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor};
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
  /**
   * Does it have a radio button?
   */
  hasRadio?: boolean;
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
  hasRadio = true,
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
          {hasRadio && index !== 0 && <StyledRadio theme={theme} disableRipple />}
          {option.label}
        </MenuItem>
      )),
    [items, divider, Radio],
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
