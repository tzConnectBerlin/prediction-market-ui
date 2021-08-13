import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PreTradingIcon, TradingIcon, ResolvedIcon } from './PhaseIcon';

export default {
  title: 'Atom/PhaseIcon',
  component: PreTradingIcon,
} as Meta;

const Template: Story = () => <PreTradingIcon />;
export const PreTrading = Template.bind({});

const TradingTemplate: Story = () => <TradingIcon />;
export const Trading = TradingTemplate.bind({});

const ResolvedTemplate: Story = () => <ResolvedIcon />;
export const Resolved = ResolvedTemplate.bind({});
