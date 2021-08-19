import * as React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { MarketCardContent, MarketCardContentProps } from './MarketCardContent';
import { TokenType } from '../../../interfaces/market';

export default {
  title: 'Molecule/MarketCardContent',
  component: MarketCardContent,
} as Meta;

const Template: Story<MarketCardContentProps> = (args) => <MarketCardContent {...args} />;

export const TokenAndStatisticList = Template.bind({});
TokenAndStatisticList.args = {
  tokenList: [
    {
      type: TokenType.yes,
      value: 14,
    },
    {
      type: TokenType.no,
      value: 5,
    },
  ],
  statisticList: [
    {
      type: 'WEEKLY',
      value: '95',
      changes: 'up',
      tokenType: TokenType.yes,
    },
    {
      type: 'VOLUME',
      value: '5',
    },
  ],
};
