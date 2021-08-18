import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CustomButton } from '../../atoms/Button';
import { ResolveMarketModal, ResolveMarketModalProps } from './ResolveMarketModal';

export default {
  title: 'Organism/ResolveMarketModal',
  component: ResolveMarketModal,
} as Meta;

const Template: Story<ResolveMarketModalProps> = (args) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <CustomButton label="Open Modal" onClick={() => setOpen(true)} />
      <ResolveMarketModal open={open} handleClose={() => setOpen(false)} {...args} />
    </>
  );
};

export const OpenWithButton = Template.bind({});
OpenWithButton.args = {
  handleSubmit: (values) => console.log(values),
};

export const OpenModal = Template.bind({});
OpenModal.args = {
  handleSubmit: (values) => console.log(values),
  open: true,
};
