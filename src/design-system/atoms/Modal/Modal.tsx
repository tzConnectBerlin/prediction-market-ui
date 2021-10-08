import * as React from 'react';
import { Box, Grid, Modal as MuiModal } from '@mui/material';
import { Close } from '@mui/icons-material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pb: 4,
  pl: 4,
  pr: 1,
  pt: 1,
};

export interface ModalProps {
  open?: boolean;
  onClose?: () => void | Promise<void>;
}

export const Modal: React.FC<ModalProps> = ({ open = false, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>
        <Grid container item direction="row-reverse">
          <Grid item>
            <Close onClick={onClose} color="disabled" />
          </Grid>
        </Grid>
        {children}
      </Box>
    </MuiModal>
  );
};
