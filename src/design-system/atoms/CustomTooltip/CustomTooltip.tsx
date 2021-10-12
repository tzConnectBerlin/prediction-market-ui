import styled from '@emotion/styled';
import { IconButton, useTheme } from '@mui/material';
import * as React from 'react';
import { IoMdInformation } from 'react-icons/io';
import { CloseIcon, CircleBackground } from '../CloseIcon';

export interface CustomTooltipProps {
  open?: boolean;
  color?: string;
  onClick?: () => void | Promise<void>;
}

const StyledIconButton = styled(IconButton)`
  padding: 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const defaultOpen = false;

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  open = defaultOpen,
  color,
  onClick,
}) => {
  const theme = useTheme();
  const colorToUse = color ?? theme.palette.primary.main;
  return (
    <StyledIconButton disableFocusRipple disableRipple disableTouchRipple onClick={onClick}>
      {open && <CloseIcon color={colorToUse} />}
      {!open && (
        <CircleBackground>
          <IoMdInformation fill={colorToUse} size="0.7em" />
        </CircleBackground>
      )}
    </StyledIconButton>
  );
};
