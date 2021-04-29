import styled from '@emotion/styled';
import { IconButton, useTheme } from '@material-ui/core';
import React from 'react';
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

const StyledIoMdInformation = styled(IoMdInformation)`
  padding-bottom: 1em;
`;

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ open = false, color, onClick }) => {
  const theme = useTheme();
  const colorToUse = color ?? theme.palette.primary.main;
  return (
    <StyledIconButton disableFocusRipple disableRipple disableTouchRipple onClick={onClick}>
      {open && <CloseIcon color={colorToUse} />}
      {!open && (
        <CircleBackground>
          <StyledIoMdInformation fill={colorToUse} size="0.7em" />
        </CircleBackground>
      )}
    </StyledIconButton>
  );
};
