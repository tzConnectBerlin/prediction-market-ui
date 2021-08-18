import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SettingDialog, SettingDialogProps } from './SettingDialog';

export default {
  title: 'Molecule/SettingDialog',
  component: SettingDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<SettingDialogProps> = (args) => <SettingDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialSettingValues: {
    deadline: 10,
    maxSlippage: 30,
  },
};
