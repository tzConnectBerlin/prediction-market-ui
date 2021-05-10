import { Story, Meta } from '@storybook/react/types-6-0';
import { SubmitBidCard } from './SubmitBidCard';

export default {
  title: 'Organism/SubmitBidCard',
  component: SubmitBidCard,
} as Meta;

const Template: Story = (args) => <SubmitBidCard {...args} />;

export const Default = Template.bind({});
Default.args = {};
