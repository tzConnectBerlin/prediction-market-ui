import * as React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketDetailCard, MarketDetailCardProps } from './MarketDetailCard';

export default {
  title: 'Molecule/MarketDetailCard',
  component: MarketDetailCard,
  argTypes: {},
} as Meta;

const descriptionArgs = {
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'.repeat(20),
  expandActionText: 'Read more',
  shrinkActionText: 'Read less',
};

const Template: Story<MarketDetailCardProps> = (args) => <MarketDetailCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'About Market',
  items: [
    {
      title: 'Description',
      item: descriptionArgs,
    },
    {
      title: 'Ticker',
      item: '$TZBDN',
    },
  ],
};
