import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CloseIcon, CloseIconProps } from './CloseIcon';

export default {
  title: 'Atom/CloseIcon',
  component: CloseIcon,
} as Meta;

const Template: Story<CloseIconProps> = (args) => <CloseIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithDifferentColor = Template.bind({});
WithDifferentColor.args = {
  color: 'red',
};
