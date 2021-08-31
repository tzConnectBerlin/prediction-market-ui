import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Grid from '@material-ui/core/Grid';
import { Modal, ModalProps } from './Modal';
import { CustomButton } from '../Button';
import { Typography } from '../Typography';

export default {
  title: 'Atom/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => (
  <Modal {...args}>
    <Grid
      container
      direction="column"
      p={4}
      justifyContent="center"
      justifyItems="center"
      spacing={3}
    >
      <Grid item>
        <Typography size="h2">Welcome to the Formula 1 Prediction Market Demo</Typography>
      </Grid>
      <Grid item>
        <CustomButton label="Learn How It Works" />
      </Grid>
      <Grid item>
        <CustomButton label="Get tez or PMM" />
      </Grid>
    </Grid>
  </Modal>
);

export const Primary = Template.bind({});
Primary.args = {
  open: true,
};
