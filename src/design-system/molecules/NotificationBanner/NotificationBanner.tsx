import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { Theme, useTheme } from '@mui/material';

export interface NotificationBannerProps {
  open: boolean;
  severity?: 'success' | 'error' | 'warning';
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

  &.MuiAlert-standardError {
    color: ${({ theme }) => theme.palette.error.main};
    background-color: ${({ theme }) => theme.palette.error.dark};
  }

  &.MuiAlert-standardWarning {
    color: ${({ theme }) => theme.palette.warning.main};
    background-color: ${({ theme }) => theme.palette.warning.dark};
  }
`;

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  open,
  severity = 'success',
  children,
}) => {
  const [isOpen, setOpen] = React.useState(open);
  const theme = useTheme();

  return (
    <StyledBox>
      <Collapse in={isOpen}>
        <StyledAlert
          theme={theme}
          severity={severity}
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
