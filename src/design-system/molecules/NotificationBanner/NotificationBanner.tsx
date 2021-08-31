import * as React from 'react';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import styled from '@emotion/styled';
import { Theme, useTheme } from '@material-ui/core';

export interface NotificationBannerProps {
  open: boolean;
}

const StyledBox = styled(Box)`
  width: 100%;
`;

const StyledAlert = styled(Alert)<{ theme: Theme }>`
  margin-bottom: 1rem;

  &.MuiAlert-standardSuccess {
    color: ${({ theme }) => theme.palette.success.main};
    background-color: ${({ theme }) => theme.palette.success.dark};
  }
`;

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ open, children }) => {
  const [isOpen, setOpen] = React.useState(open);
  const theme = useTheme();

  return (
    <StyledBox>
      <Collapse in={isOpen}>
        <StyledAlert
          theme={theme}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {children}
        </StyledAlert>
      </Collapse>
    </StyledBox>
  );
};
