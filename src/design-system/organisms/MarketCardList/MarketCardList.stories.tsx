import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketCardList } from './MarketCardList';

export default {
  title: 'Organism/MarketCardList',
  component: MarketCardList,
} as Meta;

const Template: Story = (args) => <MarketCardList {...args} />;

export const Default = Template.bind({});
Default.args = {};
