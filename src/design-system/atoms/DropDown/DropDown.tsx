import * as React from 'react';
import styled from '@emotion/styled';
import {
  FormControl,
  MenuItem,
  PopoverOrigin,
  Select,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DropDownItems } from '../../../interfaces/market';
import { CustomInputLabel } from '../../molecules/CustomInputLabel';

interface StyledSelectProps {
  backgroundcolor?: string;
  hoverbgcolor?: string;
}

const StyledSelect = styled(Select)<StyledSelectProps>`
  border-radius: 0.25rem;
  margin-top: 0;
  box-shadow: 0 0 0.4375rem 0 rgba(209, 209, 209, 0.5);
  &.MuiInput-root.MuiInputBase-formControl {
    background-color: ${({ backgroundcolor }) => backgroundcolor};
  }
  &.MuiInput-root.MuiInputBase-formControl:not(.Mui-disabled):hover {
    background-color: ${({ hoverbgcolor }) => hoverbgcolor};
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
  hoverbgcolor?: string;
  onSelect: (item: number) => void | Promise<void>;
  defaultValue?: string | number;
}

const defaultXAnchor = 'center';
const defaultYAnchor = 'bottom';
const defaultDivider = true;
const defaultDefaultValue = '';

export const DropDown: React.FC<DropDownProps> = ({
  label,
  required,
  disabled,
  items,
  anchorOriginX = defaultXAnchor,
  anchorOriginY = defaultYAnchor,
  bgColor,
  hoverbgcolor,
  divider = defaultDivider,
  onSelect,
  defaultValue = defaultDefaultValue,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = React.useState<string | number>(defaultValue);
  const menuItems = React.useMemo(
    () =>
      items.map(({ value: itemValue, label: itemLabel, startIcon }, index) =>
        isMobile ? (
          <option key={itemValue} value={itemValue}>
            {itemLabel}
          </option>
        ) : (
          <MenuItem
            key={itemValue}
            value={itemValue}
            divider={divider && index !== items.length - 1}
          >
            {startIcon}
            {itemLabel}
          </MenuItem>
        ),
      ),
    [items, divider, isMobile],
  );

  return (
    <FormControl>
      <CustomInputLabel label={label} required={required} disabled={disabled} />
      <StyledSelect
        variant="standard"
        native={isMobile}
        backgroundcolor={bgColor}
        hoverbgcolor={hoverbgcolor}
        onChange={(e: any) => {
          onSelect(Number(e.target.value));
          setValue(Number(e.target.value));
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
