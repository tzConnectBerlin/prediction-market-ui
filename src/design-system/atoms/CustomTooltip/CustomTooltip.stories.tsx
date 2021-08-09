import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CustomTooltip, CustomTooltipProps } from './CustomTooltip';

export default {
  title: 'Atom/CustomTooltip',
  component: CustomTooltip,
} as Meta;

const Template: Story<CustomTooltipProps> = (args) => <CustomTooltip {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const OpenTooltip = Template.bind({});
OpenTooltip.args = {
  open: true,
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: 'red',
};
