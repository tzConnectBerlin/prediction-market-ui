import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PortfolioSummary, PortfolioSummaryProps } from './PortfolioSummary';

export default {
  title: 'Organism/PortfolioSummary',
  component: PortfolioSummary,
} as Meta;

const Template: Story<PortfolioSummaryProps> = (args) => <PortfolioSummary {...args} />;
const contentProps: PortfolioSummaryProps = {
  positions: [
    {
      type: 'trading',
      value: 95,
      weekly: 10,
    },
    {
      type: 'liquidity',
      value: 50,
      weekly: 10,
    },
  ],
  weekly: true,
};
export const DefaultCard = Template.bind({});
DefaultCard.args = contentProps;

export const WithoutWeeklyText = Template.bind({});
WithoutWeeklyText.args = {
  ...contentProps,
  weekly: false,
};
