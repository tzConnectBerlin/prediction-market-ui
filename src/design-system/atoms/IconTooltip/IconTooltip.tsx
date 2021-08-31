import * as React from 'react';
import { IconButton, Paper, Popper, PopperPlacementType, Theme, useTheme } from '@material-ui/core';
import styled from '@emotion/styled';
import { IoMdClose, IoMdInformation } from 'react-icons/io';
import { Typography } from '../Typography';
import { CircleBackground } from '../CloseIcon';

interface StyledPaperProps {
  maxWidth: string;
  theme: Theme;
}

const StyledPaper = styled(Paper)<StyledPaperProps>`
  padding: ${({ theme }) => theme.spacing(3)};
  max-width: ${({ maxWidth }) => maxWidth};
`;

export interface IconTooltipProps {
  description: string | React.ReactNode;
  /**
   * the place of opener
   */
  placement?: PopperPlacementType;
  /**
   * Disable or Enable button
   */
  disabled?: boolean;
  /**
   * icon color
   */
  iconColor?: string;
  /**
   * maximum width of opener
   */
  maxWidth?: string;
}

export const IconTooltip: React.FC<IconTooltipProps> = ({
  disabled,
  description,
  placement = 'auto',
  iconColor,
  maxWidth,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [poperPlacement, setPlacement] = React.useState<PopperPlacementType>();
  const [open, setOpen] = React.useState(false);

  const handleClick =
    (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const id = open ? 'tooltip-popper' : undefined;
  const fillColor = iconColor ?? theme.palette.primary.main;

  return (
    <>
      <IconButton
        type="button"
        aria-label="tooltip"
        onClick={handleClick(placement)}
        disabled={disabled}
      >
        <CircleBackground>
          {open ? (
            <IoMdClose fill={fillColor} size="0.6em" />
          ) : (
            <IoMdInformation fill={fillColor} size="0.7em" />
          )}
        </CircleBackground>
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={poperPlacement}>
        <StyledPaper maxWidth={maxWidth ?? 'auto'} theme={theme}>
          <Typography size="body2">{description}</Typography>
        </StyledPaper>
      </Popper>
    </>
  );
};
