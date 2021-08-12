import * as React from 'react';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/core/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

export interface NotificationBannerProps {
  open: boolean;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({ open, children }) => {
  const [isOpen, setOpen] = React.useState(open);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={isOpen}>
        <Alert
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
          sx={{ mb: 2 }}
        >
          {children}
        </Alert>
      </Collapse>
    </Box>
  );
};
