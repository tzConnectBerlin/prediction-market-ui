import { Story, Meta } from '@storybook/react/types-6-0';
import { DropDownItems } from '../../../interfaces/market';
import { Toolbar, ToolbarProps } from './Toolbar';

export default {
  title: 'Organism/Toolbar',
  component: Toolbar,
} as Meta;

const items: DropDownItems[] = [
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

const Template: Story<ToolbarProps> = (args) => <Toolbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  sortItems: items,
  filterItems: items,
};

export const WithoutFilter = Template.bind({});
WithoutFilter.args = {
  sortItems: items,
};

export const WithoutSortBy = Template.bind({});
WithoutSortBy.args = {
  filterItems: items,
};
