import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SettingDialog } from './SettingDialog';

export default {
  title: 'Molecule/SettingDialog',
  component: SettingDialog,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story = (args) => <SettingDialog {...args} />;

export const Default = Template.bind({});
