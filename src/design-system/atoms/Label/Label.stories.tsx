import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { GiAlarmClock } from 'react-icons/gi';
import { Label, LabelProps } from './Label';
import { lightTheme as theme } from '../../../styles/theme';

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
  backgroundColor: theme.palette.grey[500],
  fontColor: theme.palette.text.primary,
  icon: <GiAlarmClock />,
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
  backgroundColor: theme.palette.warning.main,
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  text: 'Label',
};
