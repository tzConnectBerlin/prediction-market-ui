import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SearchBox, SearchBoxProps, FilterItems } from './SearchBox';

export default {
  title: 'Organism/SearchBox',
  component: SearchBox,
} as Meta;

const items: FilterItems[] = [
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

const Template: Story<SearchBoxProps> = (args) => <SearchBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  filterItems: items,
};

export const WithoutFilterSelect = Template.bind({});
WithoutFilterSelect.args = {};
