import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { CloseOpenMarketCard, CloseOpenMarketProps } from './CloseOpenMarketCard';

export default {
  title: 'Organism/CloseOpenMarketCard',
  component: CloseOpenMarketCard,
} as Meta;

const outcomeItems = { adjudicator: 'tim', marketId: '1', marketPhase: 'auction' };

const Template: Story<CloseOpenMarketProps> = (args) => <CloseOpenMarketCard {...args} />;

export const Default = Template.bind({});
