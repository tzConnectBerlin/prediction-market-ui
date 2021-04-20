import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { GiAlarmClock } from 'react-icons/gi';
import { Label, LabelProps } from './Label';

export default {
  title: 'Atom/Label',
  component: Label,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<LabelProps> = (args) => <Label {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Market',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: 'Closed',
  backgroundVariant: 'grey',
  backgroundColor: '500',
  icon: <GiAlarmClock style={{ marginRight: '0.2em' }} />,
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  text: 'Label',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  text: 'Label',
  backgroundVariant: 'warning',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  text: 'Label',
};
