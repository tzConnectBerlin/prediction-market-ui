import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { lightTheme as theme } from '../../../styles/theme';
import { DropDownItems } from '../../../interfaces/market';
import { DropDown, DropDownProps } from './DropDown';

export default {
  title: 'Atom/DropDown',
  component: DropDown,
} as Meta;

const dropdownitems: DropDownItems[] = [
  {
    label: 'Open',
    value: 1,
  },
  {
    label: 'Closed',
    value: 2,
  },
  {
    label: 'Investment Phase',
    value: 3,
  },
];

const Template: Story<DropDownProps> = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: dropdownitems,
  onSelect: () => {},
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  items: dropdownitems,
  label: 'Filter',
  onSelect: () => {},
};

export const CustomeBackgroundColor = Template.bind({});
CustomeBackgroundColor.args = {
  items: dropdownitems,
  bgColor: theme.palette.secondary.main,
  hoverBgColor: theme.palette.secondary.dark,
  onSelect: () => {},
};

export const Required = Template.bind({});
Required.args = {
  items: dropdownitems,
  label: 'Filter',
  required: true,
  onSelect: () => {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  items: dropdownitems,
  label: 'Filter',
  disabled: true,
  onSelect: () => {},
};
