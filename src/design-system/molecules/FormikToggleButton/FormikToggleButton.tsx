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
} from '@mui/material';
import { FieldProps } from 'formik';
import { CustomInputChipProps, CustomInputLabel } from '../CustomInputLabel';

type PaletteOptionsType = keyof PaletteOptions;

interface StyledToggleButtonProps {
  theme: Theme;
  color: PaletteOptionsType;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)<{ theme: Theme }>`
  margin-top: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  button.MuiToggleButton-root {
    border-color: transparent;
    border-radius: 0;
    background-color: ${({ theme }) => theme.palette.grey[300]};
    padding: ${({ theme }) => theme.spacing(1 / 3)};
    &.Mui-disabled,
    &[disabled] {
      opacity: 0.8;
    }
  }
`;

const StyledToggleButton = styled(ToggleButton)<StyledToggleButtonProps>`
  text-transform: capitalize;
  &.Mui-selected {
    color: ${({ theme, color }) => theme.palette[color].main};
    font-weight: bold;

    &.MuiToggleButtonGroup-grouped:first-of-type {
      background-color: ${({ theme, color }) => theme.palette[color].dark};
      border-left-color: ${({ theme, color }) => theme.palette[color].main};
    }
    &.MuiToggleButtonGroup-grouped:last-of-type {
      border-right-color: ${({ theme, color }) => theme.palette[color].main};
      background-color: ${({ theme, color }) => theme.palette[color].dark};
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

const defaultChip = false;
const defaultDisabled = false;

export const FormikToggleButton: React.FC<FormikToggleButtonProps> = ({
  toggleButtonItems,
  field: { name, value },
  form: { setFieldValue },
  label,
  required,
  helpMessage,
  tooltip,
  tooltipText,
  chip = defaultChip,
  chipText,
  chipIcon,
  chipOnClick,
  disabled = defaultDisabled,
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
      <StyledToggleButtonGroup
        {...rest}
        exclusive
        fullWidth
        value={value}
        onChange={handleAlignment}
        id={name}
        theme={theme}
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
      </StyledToggleButtonGroup>
    </FormControl>
  );
};
