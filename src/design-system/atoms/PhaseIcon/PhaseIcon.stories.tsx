import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PhaseIcon, PhaseIconProps } from './PhaseIcon';

export default {
  title: 'Atom/PhaseIcon',
  component: PhaseIcon,
} as Meta;

const Template: Story<PhaseIconProps> = (args) => <PhaseIcon {...args} />;

export const PreTrading = Template.bind({});

export const Trading = Template.bind({});
Trading.args = {
  variant: 'secondary',
};

export const Resolved = Template.bind({});
Resolved.args = {
  variant: 'tertiary',
};
