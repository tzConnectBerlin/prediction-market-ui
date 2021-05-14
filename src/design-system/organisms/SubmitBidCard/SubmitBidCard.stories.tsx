import { Story, Meta } from '@storybook/react/types-6-0';
import { SubmitBidCard, SubmitBidCardProps } from './SubmitBidCard';

export default {
  title: 'Organism/SubmitBidCard',
  component: SubmitBidCard,
} as Meta;

const Template: Story<SubmitBidCardProps> = (args) => <SubmitBidCard {...args} />;

export const Disconnected = Template.bind({});
Disconnected.args = {
  tokenName: 'USDtz',
  handleSubmit: (values) => console.log(values),
};

export const Connected = Template.bind({});
Connected.args = {
  tokenName: 'USDtz',
  handleSubmit: (values) => console.log(values),
  connected: true,
};

export const WithCurrentPosition = Template.bind({});
WithCurrentPosition.args = {
  tokenName: 'USDtz',
  handleSubmit: (values) => console.log(values),
  connected: true,
  currentPosition: {
    contribution: 50,
    probability: 50,
  },
};

export const WithInitialValues = Template.bind({});
WithInitialValues.args = {
  tokenName: 'USDtz',
  handleSubmit: (values) => console.log(values),
  connected: true,
  currentPosition: {
    contribution: 50,
    probability: 50,
  },
  initialValues: {
    contribution: 100,
    probability: 50,
  },
};
