import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ToggleSwitch, ToggleProps } from './ToggleSwitch';

export default {
  title: 'Atom/ToggleSwitch',
  component: ToggleSwitch,
} as Meta;

const Template: Story<ToggleProps> = (args) => <ToggleSwitch {...args} />;

export const ToggleSwitchWithoutTooltip = Template.bind({});
ToggleSwitchWithoutTooltip.args = {
  label: 'Advanced View',
};

export const ToggleSwitchWithTooltip = Template.bind({});
ToggleSwitchWithTooltip.args = {
  label: 'Advanced View',
  tooltip: true,
};
