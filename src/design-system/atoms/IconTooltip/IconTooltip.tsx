import * as React from 'react';
import {
  IconButton,
  Paper,
  Popper,
  PopperPlacementType,
  PopperProps,
  useTheme,
} from '@material-ui/core';
import styled from '@emotion/styled';
import { IoMdClose, IoMdInformation } from 'react-icons/io';
import { Typography } from '../Typography';
import { CircleBackground } from '../CloseIcon';

const StyledPaper = styled(Paper)<{ maxWidth: string }>`
  padding: 0.5rem;
  max-width: ${({ maxWidth }) => maxWidth};
`;

export interface IconTooltipProps extends PopperProps {
  description: string | React.ReactNode;
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
      <IconButton type="button" onClick={handleClick(placement)} disabled={disabled}>
        <CircleBackground>
          {open ? (
            <IoMdClose fill={fillColor} size="0.7em" />
          ) : (
            <IoMdInformation fill={fillColor} size="0.7em" />
          )}
        </CircleBackground>
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl} placement={poperPlacement}>
        <StyledPaper maxWidth={maxWidth ?? 'auto'}>
          <Typography size="body2">{description}</Typography>
        </StyledPaper>
      </Popper>
    </>
  );
};
