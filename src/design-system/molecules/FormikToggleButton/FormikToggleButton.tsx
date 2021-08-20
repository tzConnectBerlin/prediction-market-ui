import * as React from 'react';
import styled from '@emotion/styled';
import {
  FormControl,
  PaletteOptions,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  useTheme,
} from '@material-ui/core';
import { FieldProps } from 'formik';
import { CustomInputChipProps, CustomInputLabel } from '../CustomInputLabel';

type PaletteOptionsType = keyof PaletteOptions;

interface StyledToggleButtonProps {
  theme: Theme;
  color: PaletteOptionsType;
}

const StyledToggleButton = styled(ToggleButton)<StyledToggleButtonProps>`
  &.Mui-selected {
    color: ${({ theme, color }) => theme.palette[color].main};
    background-color: ${({ theme, color }) => theme.palette[color].dark} !important;

    &.MuiToggleButtonGroup-grouped:first-of-type {
      border-left-color: ${({ theme, color }) => theme.palette[color].main};
    }
    &.MuiToggleButtonGroup-grouped:last-of-type {
      border-right-color: ${({ theme, color }) => theme.palette[color].main};
    }
  }
`;

interface InternalToggleButtonProps extends FieldProps {
  toggleButtonItems: ToggleButtonItems[];
  tooltip?: boolean;
  tooltipText?: string;
  helpMessage?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface ToggleButtonItems {
  value: string;
  label: string;
  selectedColor?: PaletteOptionsType | any;
}

export type FormikToggleButtonProps = InternalToggleButtonProps &
  ToggleButtonGroupProps &
  CustomInputChipProps;

export const FormikToggleButton: React.FC<FormikToggleButtonProps> = ({
  toggleButtonItems,
  field: { name, value },
  form: { setFieldValue },
  label,
  required,
  helpMessage,
  tooltip,
  tooltipText,
  chip = false,
  chipText,
  chipIcon,
  chipOnClick,
  disabled = false,
  children,
  onChange,
  ...rest
}) => {
  const theme = useTheme();
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      onChange && onChange(event, newAlignment);
      setFieldValue(name, newAlignment);
    }
  };

  return (
    <FormControl>
      <CustomInputLabel
        shrink
        htmlFor={name}
        label={label}
        required={required}
        disabled={disabled}
        helpMessage={helpMessage}
        tooltipText={tooltipText}
        tooltip={tooltip}
        chip={chip}
        chipText={chipText}
        chipIcon={chipIcon}
        chipOnClick={chipOnClick}
      />
      <ToggleButtonGroup
        {...rest}
        exclusive
        fullWidth
        value={value}
        onChange={handleAlignment}
        id={name}
      >
        {toggleButtonItems.map((item: ToggleButtonItems, index) => (
          <StyledToggleButton
            value={item.label}
            key={`${item.value}-${index}`}
            disabled={disabled}
            color={item?.selectedColor ?? 'success'}
            theme={theme}
          >
            {item.label} ({item.value})
          </StyledToggleButton>
        ))}
      </ToggleButtonGroup>
    </FormControl>
  );
};
